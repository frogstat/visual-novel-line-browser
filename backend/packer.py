import os.path
from pathlib import Path
import bisect
import mimetypes
import struct
from sys import argv

MAGIC = b"PAK2"
VERSION = 1

# magic        4
# version      4
# file_count   8
# index_offset 8
# index_size   8
HEADER_FORMAT = "<4sIQQQ"
HEADER_SIZE = struct.calcsize(HEADER_FORMAT)

# path_length  2
# path         variable UTF-8
# offset       8
# size         8
# mime_type    1
ENTRY_FIXED_SIZE = 2 + 8 + 8 + 1


class PakWriter:
    def __init__(self, source, output):
        self.source = Path(source)
        self.output = Path(output)

    def _get_files(self):
        files = []

        for path in self.source.rglob("*"):
            if path.is_file():
                relative = path.relative_to(self.source).as_posix()
                files.append((relative, path))

        files.sort(key=lambda x: x[0])

        return files

    def _mime_type(self, path):
        mime, _ = mimetypes.guess_type(path)

        if mime is None:
            mime = "application/octet-stream"

        return mime

    def build(self):
        files = self._get_files()

        print(f"Found {len(files):,} files")

        entries = []

        with self.output.open("wb") as out:
            # Reserve space for the header.
            out.write(b"\0" * HEADER_SIZE)

            for i, (name, path) in enumerate(files, 1):
                offset = out.tell()
                size = path.stat().st_size

                with path.open("rb") as source:
                    while chunk := source.read(1024 * 1024):
                        out.write(chunk)

                entries.append((
                    name,
                    offset,
                    size,
                    self._mime_type(name),
                ))

                if i % 1000 == 0:
                    print(f"Packed {i:,}/{len(files):,}")

            # Index starts here.
            index_offset = out.tell()

            for name, offset, size, mime in entries:
                path_bytes = name.encode("utf-8")
                mime_bytes = mime.encode("ascii")

                if len(path_bytes) > 65535:
                    raise ValueError(
                        f"Path too long: {name}"
                    )

                if len(mime_bytes) > 255:
                    raise ValueError(
                        f"MIME type too long: {mime}"
                    )

                out.write(
                    struct.pack(
                        "<H",
                        len(path_bytes),
                    )
                )

                out.write(path_bytes)

                out.write(
                    struct.pack(
                        "<QQB",
                        offset,
                        size,
                        len(mime_bytes),
                    )
                )

                out.write(mime_bytes)

            index_size = out.tell() - index_offset

            # Write header.
            out.seek(0)

            out.write(
                struct.pack(
                    HEADER_FORMAT,
                    MAGIC,
                    VERSION,
                    len(entries),
                    index_offset,
                    index_size,
                )
            )

        print()
        print(f"Created: {self.output}")
        print(
            f"Size: "
            f"{self.output.stat().st_size / 1024 / 1024:.2f} MB"
        )


if __name__ == "__main__":
    print(argv)
    if len(argv) < 2 or len(argv) > 3:
        print("USAGE: python packer.py <input> [output]")
        exit(1)

    source = argv[1]
    if not os.path.isdir(source):
        print(f"{source} is not a directory")
        exit(1)

    output = f"{source.removesuffix("/")}.pak" if len(argv) != 3 else argv[2]

    if not output.lower().endswith(".pak"):
        output += ".pak"

    PakWriter(
        source,
        output,
    ).build()