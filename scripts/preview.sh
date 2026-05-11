#!/usr/bin/env bash
set -euo pipefail

if [ ! -d "dist" ]; then
  echo "dist directory not found. Commit or restore dist/ before previewing."
  exit 1
fi

cd dist
python3 -m http.server 4173