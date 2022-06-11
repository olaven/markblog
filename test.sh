#!/usr/bin/env bash
set -euo pipefail

deno test --allow-read --allow-write --unstable
