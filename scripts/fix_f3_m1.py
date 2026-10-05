import json
import re

CONFIG_FILE = "backend/config/task_definitions.json"
SCORING_FILE = "backend/app/services/game_scoring_engine.py"

with open(CONFIG_FILE, 'r', encoding='utf-8') as f:
    data = json.load(f)

# F3
data['games']['F3']['transitions'].pop()
data['games']['F3']['total_transitions'] -= 1

# M1 - doesn't have an array of trials in the JSON? Let's check M1 keys
# 'mandatory_units', 'optional_units'
data['games']['M1']['mandatory_units'] -= 1
data['games']['M2']['mandatory_units'] -= 1
data['games']['M3']['mandatory_units'] -= 1

with open(CONFIG_FILE, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2)

with open(SCORING_FILE, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix bounds for F3, M1, M2, M3
content = content.replace('"F3": {"min": 0, "max": 3, "min_obs": 2}', '"F3": {"min": 0, "max": 2, "min_obs": 1}')
content = content.replace('"M1": {"min": 0, "max": 3, "min_obs": 2}', '"M1": {"min": 0, "max": 2, "min_obs": 1}')
content = content.replace('"M2": {"min": 0, "max": 3, "min_obs": 3}', '"M2": {"min": 0, "max": 2, "min_obs": 2}')
content = content.replace('"M3": {"min": 0, "max": 3, "min_obs": 3}', '"M3": {"min": 0, "max": 2, "min_obs": 2}')

with open(SCORING_FILE, 'w', encoding='utf-8') as f:
    f.write(content)
