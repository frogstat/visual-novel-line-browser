import os.path
from http.server import BaseHTTPRequestHandler, HTTPServer
from pathlib import Path, PurePosixPath
from urllib.parse import unquote, urlparse, parse_qs
import mimetypes

from reader import PakReader


BASE_DIR = Path(__file__).resolve().parent
PUBLIC_DIR = BASE_DIR / "public"

readers = {}


def get_reader(game, category):
    key = (game, category)

    if key in readers:
        return readers[key]

    pak_path = PUBLIC_DIR / game / f"{category}.pak"

    if not pak_path.is_file():
        return None

    reader = PakReader(pak_path)
    readers[key] = reader

    return reader


def safe_path(parts):
    return all(
        part not in ("", ".", "..")
        for part in parts
    )


class AudioHandler(BaseHTTPRequestHandler):

    def do_GET(self):
        parsed = urlparse(self.path)
        url_path = unquote(parsed.path)
        download = "download" in parse_qs(parsed.query)

        # Remove leading slash.
        path = url_path.lstrip("/")

        if path.endswith("cover"):
            for extension in ["png", "jpg", "jpeg", "PNG", "JPG", "JPEG"]:
                if os.path.isfile(f"public/{path}.{extension}"):
                    path = f"{path}.{extension}"
                    break

        if not path:
            self.send_error(404)
            return

        parts = path.split("/")

        if not safe_path(parts):
            self.send_error(400, "Invalid path")
            return

        # ------------------------------------------------------------
        # music.pak / voice.pak
        #
        # /Clannad/music/test.opus
        # -> public/Clannad/music.pak
        #
        # /Clannad/voice/character/hello.ogg
        # -> public/Clannad/voice.pak
        # ------------------------------------------------------------

        if len(parts) >= 3:
            game = parts[0]
            category = parts[1]

            if category in ("music", "voice"):
                archive_path = "/".join(parts[2:])

                reader = get_reader(game, category)

                if reader is not None:
                    try:
                        info = reader.get_info(archive_path)
                    except KeyError:
                        self.send_error(404, "File not found")
                        return

                    self.serve_pak_file(
                        reader,
                        archive_path,
                        info,
                        download_name=Path(archive_path).name if download else None
                    )
                    return

        # ------------------------------------------------------------
        # Everything else is a normal file under public/
        #
        # /picture.png
        # -> public/picture.png
        #
        # /Clannad/game.js
        # -> public/Clannad/game.js
        # ------------------------------------------------------------

        physical_path = PUBLIC_DIR.joinpath(*parts)

        try:
            physical_path = physical_path.resolve()
            public_root = PUBLIC_DIR.resolve()

            physical_path.relative_to(public_root)

        except ValueError:
            self.send_error(403, "Forbidden")
            return

        if not physical_path.is_file():
            self.send_error(404, "File not found")
            return

        self.serve_file(physical_path)

    # ------------------------------------------------------------
    # .pak files
    # ------------------------------------------------------------

    def serve_pak_file(self, reader, path, info, download_name=None):
        total_size = info["size"]

        if total_size == 0:
            self.send_error(404)
            return

        start = 0
        end = total_size - 1

        range_header = self.headers.get("Range")

        if range_header:
            try:
                value = range_header.removeprefix("bytes=")

                if "," in value:
                    self.send_error(416)
                    return

                start_str, end_str = value.split("-", 1)

                if start_str:
                    start = int(start_str)

                    if end_str:
                        end = int(end_str)
                else:
                    length = int(end_str)

                    if length <= 0:
                        self.send_error(416)
                        return

                    start = max(0, total_size - length)

                if start < 0 or start >= total_size:
                    self.send_error(416)
                    return

                end = min(end, total_size - 1)

                if start > end:
                    self.send_error(416)
                    return

            except (ValueError, IndexError):
                self.send_error(416)
                return

        length = end - start + 1

        try:
            data = reader.read_range(
                path,
                start,
                end + 1
            )
        except Exception:
            self.send_error(500, "Failed to read archive")
            return

        partial = range_header is not None

        self.send_response(206 if partial else 200)
        self.send_header("Content-Type", info["mime"] or "application/octet-stream")
        self.send_header("Content-Length", str(length))
        self.send_header("Accept-Ranges","bytes")
        self.send_header("Access-Control-Allow-Origin","*")

        if download_name:
            self.send_header("Content-Disposition", f'attachment; filename="{download_name}"')

        if partial:
            self.send_header(
                "Content-Range",
                f"bytes {start}-{end}/{total_size}"
            )

        self.end_headers()

        self.wfile.write(data)

    # ------------------------------------------------------------
    # Normal filesystem files
    # ------------------------------------------------------------

    def serve_file(self, path):
        size = path.stat().st_size

        mime = mimetypes.guess_type(path.name)[0]

        if mime is None:
            mime = "application/octet-stream"

        range_header = self.headers.get("Range")

        start = 0
        end = size - 1

        if range_header:
            try:
                value = range_header.removeprefix("bytes=")

                if "," in value:
                    self.send_error(416)
                    return

                start_str, end_str = value.split("-", 1)

                if start_str:
                    start = int(start_str)

                    if end_str:
                        end = int(end_str)
                else:
                    length = int(end_str)

                    if length <= 0:
                        self.send_error(416)
                        return

                    start = max(0, size - length)

                if start < 0 or start >= size:
                    self.send_error(416)
                    return

                end = min(end, size - 1)

                if start > end:
                    self.send_error(416)
                    return

            except (ValueError, IndexError):
                self.send_error(416)
                return

        length = end - start + 1

        with open(path, "rb") as f:
            f.seek(start)
            data = f.read(length)

        partial = range_header is not None

        self.send_response(206 if partial else 200)

        self.send_header(
            "Content-Type",
            mime
        )

        self.send_header(
            "Content-Length",
            str(len(data))
        )

        self.send_header(
            "Accept-Ranges",
            "bytes"
        )

        self.send_header(
            "Access-Control-Allow-Origin",
            "*"
        )

        if partial:
            self.send_header(
                "Content-Range",
                f"bytes {start}-{end}/{size}"
            )

        self.end_headers()

        self.wfile.write(data)

    def log_message(self, format, *args):
        print(
            f"{self.client_address[0]} - {unquote(format % args)}"
        )


if __name__ == "__main__":
    print(f"Public directory: {PUBLIC_DIR}")
    print("Audio server: http://localhost:8000")

    server = HTTPServer(
        ("0.0.0.0", 8000),
        AudioHandler
    )

    try:
        server.serve_forever()

    except KeyboardInterrupt:
        print("\nStopping server...")

    finally:
        for reader in readers.values():
            reader.close()

        server.server_close()
