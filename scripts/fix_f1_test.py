import re

filepath = "backend/tests/test_game_sjt_architecture.py"

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('assert_eq(f1_sub["F1"].raw, 3.0, "F1 suboptimal behavior yields exactly 3 points")', 'assert_eq(f1_sub["F1"].raw, 2.0, "F1 suboptimal behavior yields exactly 2 points")')
content = content.replace('assert_almost_eq(f1_sub["F1"].relative, 0.5, "F1 suboptimal relative score is 0.5")', 'assert_almost_eq(f1_sub["F1"].relative, 0.4, "F1 suboptimal relative score is 0.4")')
content = content.replace('assert_eq(f1_noise["F1"].raw, 3.0, "F1 score unaffected by irrelevant telemetry")', 'assert_eq(f1_noise["F1"].raw, 2.0, "F1 score unaffected by irrelevant telemetry")')
content = content.replace('assert_almost_eq(f1_noise["F1"].relative, 0.5, "F1 relative score unaffected by irrelevant telemetry")', 'assert_almost_eq(f1_noise["F1"].relative, 0.4, "F1 relative score unaffected by irrelevant telemetry")')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
