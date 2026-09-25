import os.path
from pathlib import Path
from sys import argv

from reader import PakReader


class PakUnpacker:
    def __init__(self, source, output=None):
        self.source = Path(source)

        if output is None:
            # Default: a folder named after the .pak file,
            # placed in the same directory as the .pak file.
            output = self.source.with_suffix("")

        self.output = Path(output)

    def extract(self):
        with PakReader(self.source) as pak:
            print(f"Found {pak.file_count:,} files")

            self.output.mkdir(parents=True, exist_ok=True)

            for i, name in enumerate(pak.names, 1):
                data = pak.read(name)

                dest = self.output / name
                dest.parent.mkdir(parents=True, exist_ok=True)

                with dest.open("wb") as f:
                    f.write(data)

                if i % 1000 == 0:
                    print(f"Extracted {i:,}/{pak.file_count:,}")

        print()
        print(f"Extracted to: {self.output}")


if __name__ == "__main__":
    if len(argv) < 2 or len(argv) > 3:
        print("USAGE: python unpacker.py <input.pak> [output_dir]")
        exit(1)

    source = argv[1]
    if not os.path.isfile(source):
        print(f"{source} is not a file")
        exit(1)

    output = argv[2] if len(argv) == 3 else None

    PakUnpacker(source, output).extract()
