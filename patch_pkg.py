import os
import json

ROOT = "c:/Users/saqrt/OneDrive/Desktop/alliswell/alfaaz-project"
pkg_path = os.path.join(ROOT, "frontend/package.json")

with open(pkg_path, "r", encoding="utf-8") as f:
    pkg = json.load(f)

pkg["scripts"]["dev"] = "vite"
pkg["scripts"]["build"] = "vite build"

with open(pkg_path, "w", encoding="utf-8") as f:
    json.dump(pkg, f, indent=2)

# Also remove the scripts
os.remove(os.path.join(ROOT, "frontend/scripts/generate-recruit-tailwind.mjs"))
os.remove(os.path.join(ROOT, "frontend/scripts/check-recruit-build-config.mjs"))

print("package.json updated")
