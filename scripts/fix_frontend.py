import os
import re

FRONTEND_GAMES_DIR = "frontend/src/recruit_games"
CSS_FILE = "frontend/src/recruit-utilities.css"

def replace_in_file(filepath, pattern, replacement, count=0):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    new_content, n = re.subn(pattern, replacement, content, count=count)
    if n > 0:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
    return n

def main():
    # 1. Update index.js for text sizes and colors
    index_path = os.path.join(FRONTEND_GAMES_DIR, "index.js")
    
    replace_in_file(
        index_path, 
        r'<p class="text-xs text-\[var\(--text-secondary\)\] mt-0\.5 leading-relaxed">', 
        r'<p class="text-base text-black mt-1 leading-relaxed font-medium">'
    )
    
    replace_in_file(
        index_path,
        r'<div class="text-\[10px\] uppercase tracking-wider font-sans text-\[var\(--accent-gold\)\] font-semibold mb-1">',
        r'<div class="text-sm uppercase tracking-wider font-sans text-[var(--accent-gold)] font-bold mb-1">'
    )
    
    replace_in_file(
        index_path,
        r'<div class="text-xs text-\[var\(--text-primary\)\] leading-relaxed">',
        r'<div class="text-base text-black leading-relaxed font-medium">'
    )
    
    replace_in_file(
        index_path,
        r'text-xs uppercase tracking-widest hover:bg-\[var\(--accent-gold\)\] disabled:opacity-40',
        r'text-sm font-bold uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40'
    )
    
    replace_in_file(
        index_path,
        r'<div class="text-right text-\[11px\] text-\[var\(--text-secondary\)\] font-sans pt-1">',
        r'<div class="text-right text-sm text-[var(--text-secondary)] font-sans pt-1">'
    )
    
    print("Done updating index.js")

    # 2. Update recruit-utilities.css to drop animations
    with open(CSS_FILE, 'r', encoding='utf-8') as f:
        css = f.read()
    
    css = css.replace("transition: all 0.2s ease-in-out;", "")
    css = css.replace(".interactive-option:hover {", ".interactive-option-hover-disabled {")
    css = css.replace(".interactive-option:active {", ".interactive-option-active-disabled {")
    css = css.replace("transform: scale(0.98);", "")
    
    with open(CSS_FILE, 'w', encoding='utf-8') as f:
        f.write(css)
    
    print("Done updating CSS")

if __name__ == "__main__":
    main()
