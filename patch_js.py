import os

ROOT = "c:/Users/saqrt/OneDrive/Desktop/alliswell/alfaaz-project"
admin_js_path = os.path.join(ROOT, "frontend/src/admin.js")

if os.path.exists(admin_js_path):
    with open(admin_js_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    start_tag = "window.loadRecruitment = async function() {"
    
    if start_tag in content:
        start_idx = content.find(start_tag)
        # Look for the end of the viewCandidateDossier block, or just the end of the file before `window.switchTab`
        end_tag = "window.switchTab('events');"
        end_idx = content.find(end_tag, start_idx)
        if end_idx != -1:
            content = content[:start_idx] + content[end_idx:]
            
    with open(admin_js_path, "w", encoding="utf-8") as f:
        f.write(content)
        
print("JS patch complete.")
