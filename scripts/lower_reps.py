import json
import os
import re

CONFIG_FILE = "backend/config/task_definitions.json"
SCORING_FILE = "backend/app/services/game_scoring_engine.py"
FRONTEND_DIR = "frontend/src/recruit_games"
TEST_FILE = "backend/tests/test_game_sjt_architecture.py"

def main():
    # 1. Update task_definitions.json
    with open(CONFIG_FILE, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    reduced_counts = {}
    for gid, gdata in data['games'].items():
        list_keys = ['trials', 'decisions', 'stages', 'episodes']
        for lk in list_keys:
            if lk in gdata and isinstance(gdata[lk], list) and len(gdata[lk]) > 2:
                # Remove last item
                removed = gdata[lk].pop()
                # Update total
                for tk in ['total_trials', 'total_required_decisions', 'total_stages', 'total_episodes', 'mandatory_trials']:
                    if tk in gdata:
                        gdata[tk] -= 1
                        reduced_counts[gid] = gdata[tk]
                break
    
    with open(CONFIG_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2)

    # 2. Update GAME_BOUNDS in game_scoring_engine.py
    with open(SCORING_FILE, 'r', encoding='utf-8') as f:
        scoring_code = f.read()
    
    for gid, new_total in reduced_counts.items():
        # Match "GID": {"min": X, "max": Y, "min_obs": Z}
        pattern = r'("' + gid + r'":\s*\{"min":\s*[0-9.]+(?:,\s*"max":\s*)([0-9.]+)(?:,\s*"min_obs":\s*)([0-9]+)\})'
        def repl(m):
            full_match = m.group(1)
            old_max = m.group(2)
            old_min_obs = m.group(3)
            
            # Reduce max by 1 unless it's a float like 1.0 (for A2)
            new_max = str(int(old_max) - 1) if '.' not in old_max else old_max
            new_min_obs = str(max(1, int(old_min_obs) - 1))
            
            # Just do a naive replace of max and min_obs
            # Actually, to be safe, let's reconstruct the string
            res = full_match.replace(f'"max": {old_max}', f'"max": {new_max}')
            res = res.replace(f'"min_obs": {old_min_obs}', f'"min_obs": {new_min_obs}')
            return res
        
        scoring_code = re.sub(pattern, repl, scoring_code)

    with open(SCORING_FILE, 'w', encoding='utf-8') as f:
        f.write(scoring_code)

    print("Updated backend task_definitions and GAME_BOUNDS.")

if __name__ == "__main__":
    main()
