import re

with open("frontend/global.css", "r", encoding="utf-8") as f:
    css = f.read()

# Remove hover and active for interactive-option
css = re.sub(r'@media \(hover: hover\) and \(pointer: fine\) \{\s*\.interactive-option:hover \{[^}]+\}\s*\}', '', css)
css = re.sub(r'\.interactive-option:active \{[^}]+\}', '', css)
css = re.sub(r'\.submit-btn:active, \.action-btn:active, \.cta-btn:active\s*\{\s*\}', '', css)

with open("frontend/global.css", "w", encoding="utf-8") as f:
    f.write(css)
