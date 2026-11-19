#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$PROJECT_DIR"
: "${CAPTURE_URL:?Set CAPTURE_URL to the exact preview URL}"
: "${CAPTURE_DIR:?Set CAPTURE_DIR to an evidence directory}"

run_timed() {
  /usr/bin/time -p "$@"
}

run_timed mkdir -p "$CAPTURE_DIR"
CAPTURE_STRICT="${CAPTURE_STRICT:-1}"
export CAPTURE_STRICT
run_timed node "${RUNTIME_DIR:?}/scripts/default-capture.mjs"
