import re

with open('frontend/src/research.js', 'r', encoding='utf-8') as f:
    js = f.read()

js = js.replace(
'''  if (resp.status === 401 || resp.status === 403) {
   alert('Admin clearance required.');
   window.location.href = 'login.html';
   return;
   }
  
   const sessions = await resp.json();''',
'''  if (resp.status === 401 || resp.status === 403) {
   alert('Admin clearance required.');
   window.location.href = 'login.html';
   return;
   }
   
   if (!resp.ok) {
     throw new Error(`Server returned ${resp.status}`);
   }
  
   const sessions = await resp.json();
   
   if (!Array.isArray(sessions)) {
     throw new Error("Invalid response format from server.");
   }'''
)

with open('frontend/src/research.js', 'w', encoding='utf-8') as f:
    f.write(js)
