#!/usr/bin/env python3
"""Check or explicitly synchronize the duplicated Recruit configuration files."""

from __future__ import annotations

import argparse
import shutil
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
FILES = ("sjt_items.json", "parameters.json")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--write",
        action="store_true",
        help="copy the root config files to backend/config after reviewing the change",
    )
    args = parser.parse_args()

    backend_config = ROOT / "backend" / "config"
    mismatches = []
    for filename in FILES:
        source = ROOT / "config" / filename
        target = backend_config / filename
        if source.read_bytes() != target.read_bytes():
            mismatches.append(filename)
            if args.write:
                shutil.copyfile(source, target)
                print(f"synchronized {filename}")

    if mismatches and not args.write:
        print("Recruit config copies differ: " + ", ".join(mismatches), file=sys.stderr)
        return 1

    if not mismatches:
        print("Recruit config copies are byte-identical.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
