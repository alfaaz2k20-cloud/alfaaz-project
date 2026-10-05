import re

filepath = "backend/tests/test_game_sjt_architecture.py"

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('scored_f1_sub.raw, 3.0', 'scored_f1_sub.raw, 2.0')
content = content.replace('scored_f1_sub.relative, 0.5', 'scored_f1_sub.relative, 0.4')
content = content.replace('scored_f1_noise.raw, 3.0', 'scored_f1_noise.raw, 2.0')
content = content.replace('scored_f1_noise.relative, 0.5', 'scored_f1_noise.relative, 0.4')

content = content.replace('F1 suboptimal behavior yields exactly 3 points', 'F1 suboptimal behavior yields exactly 2 points')
content = content.replace('F1 suboptimal relative score is 0.5', 'F1 suboptimal relative score is 0.4')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
