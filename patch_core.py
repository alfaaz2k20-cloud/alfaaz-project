import os
import re

ROOT = "c:/Users/saqrt/OneDrive/Desktop/alliswell/alfaaz-project"

# 1. Patch backend/app/main.py
main_path = os.path.join(ROOT, "backend/app/main.py")
if os.path.exists(main_path):
    with open(main_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Remove imports
    content = re.sub(r'from\s+\.routers\s+import\s+.*', 'from .routers import auth, admin, profiles, events, exhibition, user, club, blogs', content)
    # Remove router includes
    content = re.sub(r'app\.include_router\(recruit\.router\)\n?', '', content)
    content = re.sub(r'app\.include_router\(research_view\.router\)\n?', '', content)
    
    with open(main_path, "w", encoding="utf-8") as f:
        f.write(content)

# 2. Patch frontend/vite.config.js
vite_path = os.path.join(ROOT, "frontend/vite.config.js")
if os.path.exists(vite_path):
    with open(vite_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    content = re.sub(r'\s*recruit:\s*resolve\(__dirname,\s*\'recruit\.html\'\),', '', content)
    content = re.sub(r'\s*research:\s*resolve\(__dirname,\s*\'research\.html\'\),', '', content)
    
    with open(vite_path, "w", encoding="utf-8") as f:
        f.write(content)

# 3. Patch frontend/admin.html
admin_html_path = os.path.join(ROOT, "frontend/admin.html")
if os.path.exists(admin_html_path):
    with open(admin_html_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    # Remove the recruitment tab button
    content = re.sub(r'<button class="tab-btn" onclick="switchTab\(\'recruitment\'\)">Recruitment</button>\n?', '', content)
    # Remove the recruitment section container
    content = re.sub(r'<div id="recruitment-section".*?<!-- FOOTER -->', '<!-- FOOTER -->', content, flags=re.DOTALL)
    
    with open(admin_html_path, "w", encoding="utf-8") as f:
        f.write(content)

print("Patch complete.")
