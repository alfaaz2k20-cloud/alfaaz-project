import os
import json
import sys

def check_launch_blockers(is_production: bool = False):
    blockers = []
    warnings = []

    print("Running Launch Blocker Audits...")

    # 1. Check brand.json
    brand_path = os.path.join("config", "brand.json")
    if os.path.exists(brand_path):
        with open(brand_path, "r", encoding="utf-8") as f:
            brand_data = json.load(f)
        for k, v in brand_data.items():
            if v == "__MISSING__":
                msg = f"Missing brand config: '{k}' is __MISSING__ in config/brand.json"
                if is_production:
                    blockers.append(msg)
                else:
                    warnings.append(msg)

    # 2. Check config/copy/
    copy_dir = os.path.join("config", "copy")
    if os.path.exists(copy_dir):
        for f in os.listdir(copy_dir):
            if f.endswith(".json"):
                with open(os.path.join(copy_dir, f), "r", encoding="utf-8") as fp:
                    copy_data = json.load(fp)
                for k, v in copy_data.items():
                    if v == "__MISSING__":
                        msg = f"Missing copy text: '{k}' is __MISSING__ in config/copy/{f}"
                        if is_production:
                            blockers.append(msg)
                        else:
                            warnings.append(msg)

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
