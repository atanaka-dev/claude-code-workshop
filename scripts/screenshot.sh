#!/usr/bin/env bash
set -euo pipefail

mkdir -p screenshots

if ! command -v npx >/dev/null 2>&1; then
  echo "ERROR: npx not found"
  exit 1
fi

if [ ! -d "dist" ]; then
  echo "dist directory not found. Commit or restore dist/ before taking screenshots."
  exit 1
fi

echo "Start preview server in another terminal:"
echo "npm run preview"
echo ""
echo "Then run:"
echo "npx playwright screenshot http://localhost:4173/index.html screenshots/index.png --viewport-size=1366,768"
echo "npx playwright screenshot http://localhost:4173/notes.html screenshots/notes.png --full-page --viewport-size=1366,768"