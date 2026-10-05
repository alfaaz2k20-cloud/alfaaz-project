import re

# Fix global.css
try:
    with open("frontend/global.css", "r", encoding="utf-8") as f:
        css = f.read()

    css = css.replace("text- color: var(--text-primary);", "text-transform: uppercase; color: var(--text-primary);")
    css = css.replace("text- letter-spacing: 0.15em;", "text-transform: uppercase; letter-spacing: 0.15em;")

    with open("frontend/global.css", "w", encoding="utf-8") as f:
        f.write(css)
    print("Fixed global.css")
except Exception as e:
    print(e)

# Fix recruit-utilities.css
try:
    with open("frontend/src/recruit-utilities.css", "r", encoding="utf-8") as f:
        css2 = f.read()

    css2 = re.sub(r'\.uppercase\s*\{\s*text-\s*\}', '.uppercase {\n  text-transform: uppercase;\n}', css2)

    with open("frontend/src/recruit-utilities.css", "w", encoding="utf-8") as f:
        f.write(css2)
    print("Fixed recruit-utilities.css")
except Exception as e:
    print(e)
