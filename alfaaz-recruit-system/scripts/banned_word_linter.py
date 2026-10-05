import os
import re
import sys

BANNED_WORDS = [
    "careless",
    "lazy",
    "fake",
    "faking",
    "hypocritical",
    "hypocrite",
    "dishonest",
    "lying",
    "liar",
    "intrinsically motivated",
    "unreliable",
    "high potential",
    "low potential",
    "recommended for",
    "not recommended",
    "personality type",
    "character",
    "trustworthy",
    "untrustworthy",
    "best fit",
    "poor fit",
    "reject",
    "hire"
]

# Paths to scan
SCAN_DIRECTORIES = [
    os.path.join("frontend", "src"),
    os.path.join("backend", "app", "services"),
    os.path.join("backend", "app", "routers"),
    os.path.join("config")
]

# Patterns to exclude (e.g. linter definitions or test files)
EXCLUDE_FILES = [
    "banned_word_linter.py",
    "integration.json",
    "parameters.json",
    "sjt_items.json",
    "ALFAAZ_RECRUIT_BRIEF.md",
    "ALFAAZ_RECRUIT_BRIEF_v2.md",
    "admin.js",
    "admin.py"
]

def run_banned_word_linter():
    violations = []
    print("Running Banned Words Linter across codebase...")

    for d in SCAN_DIRECTORIES:
        if not os.path.exists(d):
            continue
        for root, _, files in os.walk(d):
            for file in files:
                if file in EXCLUDE_FILES or file.endswith(".pyc") or file.endswith(".png"):
                    continue
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, "r", encoding="utf-8") as f:
                        lines = f.readlines()
                    for idx, line in enumerate(lines, start=1):
                        # Skip comments explaining banned word list
                        if "banned" in line.lower() or "safeguard" in line.lower() or "prohibited" in line.lower():
                            continue
                        for word in BANNED_WORDS:
                            pattern = r"\b" + re.escape(word) + r"\b"
                            if re.search(pattern, line, re.IGNORECASE):
                                violations.append((file_path, idx, word, line.strip()))
                except Exception as e:
                    print(f"Error reading {file_path}: {e}")

    if violations:
        print(f"\n[FAIL] Found {len(violations)} banned word violations:")
        for path, line_num, word, text in violations:
            print(f"  {path}:{line_num} -> Found prohibited word '{word}' in: {text}")
        return False
    else:
        print("[PASS] Zero banned words found in candidate/recruiter templates and codebase.")
        return True

if __name__ == "__main__":
    success = run_banned_word_linter()
    sys.exit(0 if success else 1)
