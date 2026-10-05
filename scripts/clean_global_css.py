import re

CSS_FILES = [
    "frontend/global.css",
    "frontend/src/recruit-utilities.css"
]

def clean_css_files():
    for fpath in CSS_FILES:
        try:
            with open(fpath, 'r', encoding='utf-8') as f:
                content = f.read()

            # Remove transition lines
            content = re.sub(r'transition:\s*[^;]+;', '', content)
            
            # Remove transform lines
            content = re.sub(r'transform:\s*[^;]+;', '', content)
            
            # Remove animation lines
            content = re.sub(r'animation:\s*[^;]+;', '', content)
            
            # Remove :hover and :active scale/translate properties
            # This is partly covered by removing `transform:` above.
            
            # Remove specific active/hover blocks that just have transform
            # Just let CSS be static
            
            with open(fpath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Cleaned {fpath}")
        except FileNotFoundError:
            print(f"Not found: {fpath}")

if __name__ == "__main__":
    clean_css_files()
