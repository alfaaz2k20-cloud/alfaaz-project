import re

filepath = "backend/app/services/descriptive_task_record.py"

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# For A2
content = content.replace('opp_count < 3:', 'opp_count < 2:')
content = content.replace('exceptions < 3 -> INSUFFICIENT', 'exceptions < 2 -> INSUFFICIENT')

# Check for other games with < 3 or < 4 thresholds
# e.g., M2:
content = content.replace('if opp_count < 3:', 'if opp_count < 2:')

# I'll just change all `< 3:` to `< 2:` in descriptive_task_record.py for these hardcoded gates!
# Actually let's just do a blanket regex for "opp_count < [0-9]+" if it's there.
content = re.sub(r'opp_count < 3', r'opp_count < 2', content)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
