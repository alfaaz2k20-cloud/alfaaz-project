import os
import shutil

DEST = "upload_ready"
EXCLUDE_FILE = ".aiexclude"

# Read exclusions
with open(EXCLUDE_FILE) as f:
    excludes = [l.strip() for l in f if l.strip() and not l.startswith("#")]

def should_exclude(path):
    for pattern in excludes:
        if pattern in path:
            return True
    return False

# Clean and recreate destination
if os.path.exists(DEST):
    shutil.rmtree(DEST)
os.makedirs(DEST)

# Copy files
for root, dirs, files in os.walk("."):
    # Skip excluded dirs
    dirs[:] = [d for d in dirs if not should_exclude(os.path.join(root, d))]
    
    if should_exclude(root):
        continue

    for file in files:
        src = os.path.join(root, file)
        if should_exclude(src) or file == "clean_export.py":
            continue

        dest = os.path.join(DEST, src[2:])  # strip leading ./
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        shutil.copy2(src, dest)

print("✅ Done! Upload the 'upload_ready' folder.")
print("🚫 Excluded:", excludes)