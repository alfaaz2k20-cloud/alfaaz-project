import os
import re

FRONTEND_DIRS = ["frontend/src", "frontend/src/recruit_games"]
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

# Unify font classes
# We want headings to be font-serif and body to be font-sans. But let's just make sure we aren't using weird bespoke colors.
COLOR_CLASSES_TO_REPLACE = [
    (r'\btext-gray-\d+\b', 'text-stone-400'),
    (r'\btext-slate-\d+\b', 'text-stone-400'),
    (r'\btext-emerald-\d+\b', 'text-[var(--text-primary)]'),
    (r'\btext-\[var\(--accent-gold\)\]\b', 'text-[var(--text-primary)]'),
    (r'\btext-amber-\d+\b', 'text-[var(--text-primary)]')
]

def clean_files():
    for d in FRONTEND_DIRS:
        for fname in os.listdir(d):
            if not fname.endswith('.js'):
                continue
            path = os.path.join(d, fname)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()

            original_content = content
            
            # Remove animation classes
            for anim in ANIMATION_CLASSES:
                content = re.sub(anim, '', content)
            
            # The CSS class lists might now have multiple spaces, let's clean that up
            content = re.sub(r' +', ' ', content)
            content = content.replace(' class=" "', '')
            content = content.replace('class=" ', 'class="')
            
            # Fix some weird color issues where user said "differrent game is having different color text and fonts"
            # I will ensure all .interactive-option and .bin-btn buttons don't have random fonts/colors.
            
            # Wait, in the Shifting Grid (E1), the tiles have Gold Circle/Sage Square text. The user might want those colors kept if they are game mechanics? 
            # The user said: "make this constant across games and sjt".
            # The problem might be the `font-serif` vs `font-sans` in different games.
            # I will just write a specific script.
            
            if content != original_content:
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(content)

if __name__ == "__main__":
    clean_files()
