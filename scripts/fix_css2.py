import re

with open("frontend/global.css", "r", encoding="utf-8") as f:
    css = f.read()

css = re.sub(r'text-\s*\n\s*color:', 'text-transform: uppercase;\n  color:', css)
# If there are any other text- dangling at the end of the line:
css = re.sub(r'text-\s*\n', 'text-transform: uppercase;\n', css)

with open("frontend/global.css", "w", encoding="utf-8") as f:
    f.write(css)
