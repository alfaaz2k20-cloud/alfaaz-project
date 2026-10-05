import os
import re

FRONTEND_GAMES_DIR = "frontend/src/recruit_games"

def rewrite_js_files():
    for filename in os.listdir(FRONTEND_GAMES_DIR):
        if not filename.endswith('.js'):
            continue
        filepath = os.path.join(FRONTEND_GAMES_DIR, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # 1. Skip tutorial
        content = content.replace('let inTutorial = true;', 'let inTutorial = false;')
        content = content.replace('let inIntro = true;', 'let inIntro = false;')
        
        # 2. Plain English instructions & titles:
        # Just simple replacements for "Courtyard Setup", etc. 
        # But wait, there are too many specific things to replace safely with just regex.
        # Let's remove the gray `opt.note` that reveals the construct.
        content = re.sub(
            r'<span class="text-\[10px\] text-\[var\(--text-secondary\)\] uppercase font-medium">\$\{opt\.note\}</span>',
            '',
            content
        )
        content = re.sub(
            r'<span class="text-\[10px\] font-sans uppercase tracking-wider text-\[var\(--text-secondary\)\]">\$\{r\.context_note\}</span>',
            '',
            content
        )
        
        # 3. Text size increases
        content = content.replace('text-[10px]', 'text-sm')
        content = content.replace('text-xs', 'text-base')
        
        # 4. Remove hover/active animations
        content = re.sub(r'hover:bg-[^\s"\']+', '', content)
        content = re.sub(r'duration-\d+', '', content)
        content = content.replace('transition-colors', '')
        content = content.replace('transition-all', '')
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

rewrite_js_files()
