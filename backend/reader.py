import bisect
import struct
from pathlib import Path

from packer import HEADER_SIZE, HEADER_FORMAT

MAGIC = b"PAK2"
VERSION = 1

class PakReader:
    def __init__(self, path):
        self.path = Path(path)
        self.file = self.path.open("rb")

        self._read_header()
        self._read_index()

    def _read_header(self):
        data = self.file.read(HEADER_SIZE)

        if len(data) != HEADER_SIZE:
            raise ValueError("Invalid PAK header")

        (
            magic,
            version,
            self.file_count,
            self.index_offset,
            self.index_size,
        ) = struct.unpack(
            HEADER_FORMAT,
            data,
        )

        if magic != MAGIC:
            raise ValueError("Invalid PAK magic")

        if version != VERSION:
            raise ValueError(
                f"Unsupported PAK version: {version}"
            )

    def _read_index(self):
        self.file.seek(self.index_offset)

        index_data = self.file.read(self.index_size)

        if len(index_data) != self.index_size:
            raise ValueError("Truncated PAK index")

        self.entries = []
        self.names = []

        pos = 0

        for _ in range(self.file_count):
            if pos + 2 > len(index_data):
                raise ValueError("Corrupt PAK index")

            path_length = struct.unpack_from(
                "<H",
                index_data,
                pos,
            )[0]

            pos += 2

            if pos + path_length > len(index_data):
                raise ValueError("Corrupt PAK index")

            name = index_data[
                pos:pos + path_length
            ].decode("utf-8")

            pos += path_length

            if pos + 17 > len(index_data):
                raise ValueError("Corrupt PAK index")

            offset, size, mime_length = struct.unpack_from(
                "<QQB",
                index_data,
                pos,
            )

            pos += 17

            if pos + mime_length > len(index_data):
                raise ValueError("Corrupt PAK index")

            mime = index_data[
                pos:pos + mime_length
            ].decode("ascii")

            pos += mime_length

            self.names.append(name)

            self.entries.append({
                "offset": offset,
                "size": size,
                "mime": mime,
            })

        if pos != len(index_data):
            raise ValueError("Unexpected data at end of index")

    def _find(self, name):
        index = bisect.bisect_left(
            self.names,
            name,
        )

        if (
            index >= len(self.names)
            or self.names[index] != name
        ):
            return None

        return self.entries[index]

    def exists(self, name):
        return self._find(name) is not None

    def get_info(self, name):
        entry = self._find(name)

        if entry is None:
            return None

        return {
            "path": name,
            **entry,
        }

    def read(self, name):
        entry = self._find(name)

        if entry is None:
            raise FileNotFoundError(name)

        self.file.seek(entry["offset"])

        data = self.file.read(entry["size"])

        if len(data) != entry["size"]:
            raise IOError("Truncated PAK data")

        return data

    def read_range(self, name, start, end=None):
        entry = self._find(name)

        if entry is None:
            raise FileNotFoundError(name)

        size = entry["size"]

        if start < 0 or start >= size:
            raise ValueError("Invalid start")

        if end is None:
            end = size - 1

        end = min(end, size - 1)

        if end < start:
            raise ValueError("Invalid range")

        length = end - start + 1

        self.file.seek(
            entry["offset"] + start
        )

        data = self.file.read(length)

        if len(data) != length:
            raise IOError("Truncated PAK data")

        return data

    def close(self):
        self.file.close()

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc, traceback):
        self.close()
