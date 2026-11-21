#!/usr/bin/env python3
"""Serve Einsatz C1 and optionally proxy OpenAI-compatible chat."""

from __future__ import annotations

import json
import os
import urllib.error
import urllib.request
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parent
CHAT_URL = os.environ.get("OPENAI_BASE", "https://api.openai.com/v1/chat/completions")
CHAT_MODEL = os.environ.get("OPENAI_MODEL", "gpt-4o-mini")


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def do_POST(self):
        if self.path != "/api/chat":
            self.send_error(404)
            return
        length = int(self.headers.get("Content-Length", "0"))
        raw = self.rfile.read(length)
        try:
            body = json.loads(raw.decode("utf-8"))
        except json.JSONDecodeError:
            return self._json(400, {"error": "invalid json"})
        key = body.get("apiKey") or os.environ.get("OPENAI_API_KEY", "")
        if not key:
            return self._json(
                501,
                {"error": "Kein API-Key. Unter Setup eintragen oder OPENAI_API_KEY setzen."},
            )
        payload = json.dumps(
            {
                "model": body.get("model") or CHAT_MODEL,
                "messages": body.get("messages") or [],
                "temperature": 0.8,
            }
        ).encode("utf-8")
        req = urllib.request.Request(
            CHAT_URL,
            data=payload,
            headers={
                "Authorization": f"Bearer {key}",
                "Content-Type": "application/json",
            },
            method="POST",
        )
        try:
            with urllib.request.urlopen(req, timeout=60) as resp:
                data = json.loads(resp.read().decode("utf-8"))
        except urllib.error.HTTPError as exc:
            detail = exc.read().decode("utf-8", errors="replace")[:400]
            return self._json(exc.code, {"error": detail})
        except urllib.error.URLError as exc:
            return self._json(502, {"error": str(exc.reason)})
        reply = (
            data.get("choices", [{}])[0]
            .get("message", {})
            .get("content", "")
            .strip()
        )
        self._json(200, {"reply": reply})

    def _json(self, code: int, obj: dict) -> None:
        blob = json.dumps(obj).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(blob)))
        self.end_headers()
        self.wfile.write(blob)

    def log_message(self, fmt: str, *args) -> None:
        print("[%s] " % self.log_date_time_string() + fmt % args)


def main() -> None:
    port = int(os.environ.get("PORT", "8765"))
    httpd = ThreadingHTTPServer(("127.0.0.1", port), Handler)
    print(f"Einsatz C1: http://127.0.0.1:{port}", flush=True)
    httpd.serve_forever()


if __name__ == "__main__":
    main()
