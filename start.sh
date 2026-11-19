#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$PROJECT_DIR"
PORT="${PORT:-3000}"
export PORT
BUILD_DIR="$PROJECT_DIR/dist"
METADATA_DIR="${OPENCODE_WEB_DIR:-/home/runner/work/_temp/omgithub-web}"

run_timed() {
  /usr/bin/time -p "$@"
}

run_timed test -f package.json
if [[ -f package-lock.json ]]; then
  run_timed npm ci --no-audit --no-fund
else
  run_timed npm install --no-audit --no-fund
fi
run_timed npm run build
run_timed test -f "$BUILD_DIR/index.html"
run_timed mkdir -p "$METADATA_DIR"
run_timed node -e 'const fs=require("node:fs"); const path=require("node:path"); const value={project:process.argv[1],directory:process.argv[2]}; fs.writeFileSync(path.join(process.argv[3],"deployment-output.json"), JSON.stringify(value));' "$PROJECT_DIR" "$BUILD_DIR" "$METADATA_DIR"

# Keep the preview server attached to this process so the controller can manage it.
run_timed npm run preview -- --host 0.0.0.0 --port "$PORT" --strictPort
