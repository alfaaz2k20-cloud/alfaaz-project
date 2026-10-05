import re

filepath = "backend/app/services/game_scoring_engine.py"

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace < 3 thresholds with < 2
content = content.replace('genuine_evaluated < 3', 'genuine_evaluated < 2')
content = content.replace('mand_count < 3', 'mand_count < 2')
content = content.replace('genuine_evaluated if genuine_evaluated < 3 else', 'genuine_evaluated if genuine_evaluated < 2 else')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
