import os
import re

FRONTEND_DIRS = ["frontend/src", "frontend/src/recruit_games"]
CSS_FILE = "frontend/src/recruit-utilities.css"

ANIMATION_CLASSES = [
    r'\btransition-colors\b',
    r'\btransition-all\b',
    r'\btransition\b',
    r'\bduration-\d+\b',
    r'\banimate-[a-zA-Z0-9-]+\b',
    r'\bhover:scale-\d+\b',
    r'\bactive:scale-\d+\b',
    r'\btransform\b'
]

COLORS_TO_NORMALIZE = [
    # Replace bespoke colors with primary text or gold
    (r'text-\[\#bd6f5d\]', 'text-[var(--text-primary)]'),
    (r'bg-\[\#bd6f5d\]', 'bg-[var(--text-primary)]'),
    (r'border-\[\#bd6f5d\]', 'border-[var(--text-primary)]'),
    (r'text-emerald-\d+', 'text-[var(--text-primary)]'),
    (r'bg-emerald-\d+', 'bg-[var(--text-primary)]'),
    (r'text-amber-\d+', 'text-[var(--text-primary)]'),
    # Also fix secondary text in interactive buttons to be primary, unless it's explicitly a small tip.
    # Actually, simpler: replace text-[var(--text-secondary)] inside interactive buttons?
    # We can just replace all text-[var(--text-secondary)] with text-[var(--text-primary)] globally except in small tooltips,
    # but it's easier to just replace text-[var(--text-secondary)] with text-black or primary in JS files generally.
    (r'text-\[var\(--text-secondary\)\]', 'text-black'),
    (r'text-stone-400', 'text-black'),
    (r'text-gray-500', 'text-black'),
    (r'text-gray-400', 'text-black'),
]

def clean_css():
    if os.path.exists(CSS_FILE):
        with open(CSS_FILE, 'r', encoding='utf-8') as f:
            css = f.read()
        
        # Remove active:scale-95 rule entirely
        css = re.sub(r'\.active\\:scale-95:active\s*\{[^}]*\}', '', css)
        # Remove transition rules
        css = re.sub(r'\.transition(?:-[a-zA-Z]+)?\s*\{[^}]*\}', '', css)
        css = re.sub(r'\.duration-\d+\s*\{[^}]*\}', '', css)
        css = re.sub(r'\.animate-[a-zA-Z0-9-]+\s*\{[^}]*\}', '', css)
        
        with open(CSS_FILE, 'w', encoding='utf-8') as f:
            f.write(css)


def clean_js_files():
    for d in FRONTEND_DIRS:
        for fname in os.listdir(d):
            if not fname.endswith('.js'):
                continue
            path = os.path.join(d, fname)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()

            for anim in ANIMATION_CLASSES:
                content = re.sub(anim, '', content)
                
            for old, new in COLORS_TO_NORMALIZE:
                content = re.sub(old, new, content)

            # Strip font-serif and font-sans from inner elements so they inherit cleanly
            # But keep them in the main shell headers
            if fname != 'index.js':
                content = re.sub(r'\bfont-serif\b', '', content)
                content = re.sub(r'\bfont-sans\b', '', content)
            else:
                # In recruit_games/index.js, ensure instruction text is black
                content = content.replace('text-[var(--text-secondary)]', 'text-black')

            content = re.sub(r' +', ' ', content)
            content = content.replace(' class=" "', '')
            content = content.replace('class=" ', 'class="')
            content = content.replace('  "', ' "')

            with open(path, 'w', encoding='utf-8') as f:
                f.write(content)

if __name__ == "__main__":
    clean_css()
    clean_js_files()
