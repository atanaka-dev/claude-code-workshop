#!/usr/bin/env bash
set -euo pipefail

echo "Direct dist workflow: build does not regenerate HTML."

test -f dist/index.html
test -f dist/notes.html
test -d dist/assets

echo "OK: dist/index.html, dist/notes.html, and dist/assets exist."
