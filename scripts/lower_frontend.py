import os
import re

FRONTEND_GAMES_DIR = "frontend/src/recruit_games"

def rewrite_js_arrays():
    for filename in os.listdir(FRONTEND_GAMES_DIR):
        if not filename.endswith('.js'):
            continue
        filepath = os.path.join(FRONTEND_GAMES_DIR, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Insert a slice right after array definitions
        # Example: const trials = [ ... ]; -> const trials = [ ... ]; trials.pop();
        # We need to be careful. We can just do trials.length = trials.length - 1 if length > 2
        
        # Let's just insert a trim statement for common array names:
        arrays = ['trials', 'sequences', 'rounds', 'scenarios', 'episodes', 'stages']
        
        for arr in arrays:
            pattern = r'(const\s+' + arr + r'\s*=\s*\[.*?\n\s*\];)'
            # We want to match the whole array block. Since they are multi-line, re.DOTALL is needed.
            # But the arrays might have nested brackets.
            
            # A safer way: Just find `const trials = [` and add `if (trials.length > 2) trials.pop();`
            # at the very end of the function? No, we need it right after declaration.
            
            # Actually, `pop()` works perfectly right after declaration!
            def repl(m):
                return m.group(1) + f"\n  if ({arr}.length > 2) {arr}.pop();\n"
            
            content = re.sub(r'(const\s+' + arr + r'\s*=\s*\[(?:[^\[\]]*?|\[.*?\])*?\];)', repl, content, flags=re.DOTALL)
            
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

rewrite_js_arrays()
