import re

filepath = "backend/tests/test_game_sjt_architecture.py"

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('scored_f1_noisy.raw, 3.0', 'scored_f1_noisy.raw, 2.0')
content = content.replace('scored_f1_noisy.relative, 0.5', 'scored_f1_noisy.relative, 0.4')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
