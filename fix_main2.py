import os

ROOT = "c:/Users/saqrt/OneDrive/Desktop/alliswell/alfaaz-project"
main_path = os.path.join(ROOT, "backend/app/main.py")

with open(main_path, "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace("import app.models.recruit\n", "")

with open(main_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Fixed main.py import recruit model")
