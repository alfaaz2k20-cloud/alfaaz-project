import os
import json
import sys

def find_copy_blockers(value, path):
    blockers = []
    if value == "__MISSING__":
        blockers.append(f"Unresolved placeholder: {path}")
    elif isinstance(value, dict):
        if value.get("interim") is True:
            blockers.append(f"Interim copy is not approved for production: {path}")
        for key, child in value.items():
            blockers.extend(find_copy_blockers(child, f"{path}.{key}"))
    elif isinstance(value, list):
        for index, child in enumerate(value):
            blockers.extend(find_copy_blockers(child, f"{path}[{index}]"))
    return blockers

def check_launch_blockers(is_production: bool = False):
    blockers = []
    warnings = []

    print("Running Launch Blocker Audits...")

    # 1. Check brand.json
    brand_path = os.path.join("config", "brand.json")
    if os.path.exists(brand_path):
        with open(brand_path, "r", encoding="utf-8") as f:
            brand_data = json.load(f)
        blockers.extend(find_copy_blockers(brand_data, "config/brand.json"))
        if "data_retention_days" in brand_data:
            blockers.append("config/brand.json must NOT define data_retention_days (retention is permanent).")

    # 2. Check config/copy/
    copy_dir = os.path.join("config", "copy")
    if os.path.exists(copy_dir):
        for f in os.listdir(copy_dir):
            if f.endswith(".json"):
                with open(os.path.join(copy_dir, f), "r", encoding="utf-8") as fp:
                    copy_data = json.load(fp)
                file_blockers = find_copy_blockers(copy_data, f"config/copy/{f}")
                if is_production:
                    blockers.extend(file_blockers)
                else:
                    warnings.extend(file_blockers)

    root_consent = os.path.join("config", "copy", "consent.json")
    backend_consent = os.path.join("backend", "config", "copy", "consent.json")
    if os.path.exists(root_consent) and os.path.exists(backend_consent):
        with open(root_consent, "rb") as root_file, open(backend_consent, "rb") as backend_file:
            if root_file.read() != backend_file.read():
                blockers.append("config/copy/consent.json and backend/config/copy/consent.json must be byte-identical.")

    # 3. Check calibration claiming in feature_bands.json
    bands_path = os.path.join("config", "feature_bands.json")
    if os.path.exists(bands_path):
        with open(bands_path, "r", encoding="utf-8") as f:
            bands_data = json.load(f)
        if bands_data.get("calibration_status") != "UNCALIBRATED" and not bands_data.get("calibration_source"):
            blockers.append("Invalid calibration claim: feature_bands.json claims calibration without a recorded calibration_source.")

    if warnings:
        print(f"[DEV WARNING] Found {len(warnings)} unpopulated placeholders (expected in development):")
        for w in warnings:
            print(f"  - {w}")

    if blockers:
        print(f"\n[LAUNCH BLOCKER ERROR] Production build halted on {len(blockers)} unresolved blockers:")
        for b in blockers:
            print(f"  - {b}")
        return False

    print("[PASS] Launch blocker validation passed.")
    return True

if __name__ == "__main__":
    is_prod = "--prod" in sys.argv or os.environ.get("ENV") == "production"
    success = check_launch_blockers(is_production=is_prod)
    sys.exit(0 if success else 1)
