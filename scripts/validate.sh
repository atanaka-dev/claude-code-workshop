#!/usr/bin/env bash
set -euo pipefail

if [ ! -f "dist/index.html" ]; then
  echo "ERROR: dist/index.html not found"
  exit 1
fi

if [ ! -f "dist/notes.html" ]; then
  echo "ERROR: dist/notes.html not found"
  exit 1
fi

if grep -R 'href="/' dist/*.html dist/assets 2>/dev/null; then
  echo "ERROR: root absolute href found"
  exit 1
fi

if grep -R 'src="/' dist/*.html dist/assets 2>/dev/null; then
  echo "ERROR: root absolute src found"
  exit 1
fi

# Exclude obvious placeholder / example values in code blocks
if grep -R -E 'API_KEY|SECRET|TOKEN|PASSWORD|PRIVATE_KEY' dist 2>/dev/null \
    | grep -v -E 'your-key-here|your-secret|your-token|placeholder|example|REDACTED|xxx' \
    | grep -q .; then
  echo "ERROR: possible secret detected"
  exit 1
fi

if grep -R -E 'localhost|127\.0\.0\.1' dist 2>/dev/null; then
  echo "WARNING: localhost reference found"
fi

echo "Validation passed"