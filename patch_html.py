import os
import re

ROOT = "c:/Users/saqrt/OneDrive/Desktop/alliswell/alfaaz-project"

admin_html_path = os.path.join(ROOT, "frontend/admin.html")
if os.path.exists(admin_html_path):
    with open(admin_html_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    # Remove the recruitment tab button
    content = re.sub(r'<button class="tab-btn" onclick="switchTab\(\'recruitment\'\)">Volunteer Recruitment</button>\n?', '', content)
    # Remove the recruitment section container
    content = re.sub(r'<div id="tab-recruitment".*?</div>\s*</div>\s*</div>\s*</div>', '</div>', content, flags=re.DOTALL)
    # Actually wait, regex on HTML is brittle. Let's just do a string slice.
    
    start_tag = '<div id="tab-recruitment"'
    end_tag = '</div>\n  \n    </div>\n  </main>'
    
    if start_tag in content:
        start_idx = content.find(start_tag)
        end_idx = content.find('</div>\n  \n    </div>\n  </main>', start_idx)
        if end_idx != -1:
            content = content[:start_idx] + content[end_idx:]
    
    with open(admin_html_path, "w", encoding="utf-8") as f:
        f.write(content)
        
print("HTML patch complete.")
