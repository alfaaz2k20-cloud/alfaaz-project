import sys
import os
import itertools

BACKEND_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if BACKEND_DIR not in sys.path:
    sys.path.insert(0, BACKEND_DIR)
sys.path.insert(0, os.path.join(BACKEND_DIR, "backend"))

from app.services.sjt_engine import verify_and_load_configs

params_data, sjt_data, _, ranges = verify_and_load_configs()
params = list(params_data.keys())

scenarios = sjt_data["scenarios"]
opt_lists = [[opt["keys"] for opt in s["options"]] for s in scenarios]

all_min = {p: float("inf") for p in params}
all_max = {p: float("-inf") for p in params}

count = 0
for combo in itertools.product(*opt_lists):
    count += 1
    for p in params:
        tot = sum(opt[p] for opt in combo)
        if tot < all_min[p]:
            all_min[p] = tot
        if tot > all_max[p]:
            all_max[p] = tot

print(f"Total combinations checked: {count}")
all_match = True
for p in params:
    expected_min = ranges[p]["min"]
    expected_max = ranges[p]["max"]
    span = expected_max - expected_min
    match_min = (all_min[p] == expected_min)
    match_max = (all_max[p] == expected_max)
    if not (match_min and match_max):
        all_match = False
    print(f"  {p}: min={all_min[p]} (exp {expected_min}), max={all_max[p]} (exp {expected_max}), span={span}, reached_both={match_min and match_max}")

print(f"All 16,384 combinations match theoretical min/max exactly: {all_match}")
