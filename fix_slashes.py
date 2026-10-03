import sys

with open('frontend/src/recruit.js', 'r', encoding='utf-8') as f:
    code = f.read()

code = code.replace(r'app.innerHTML = \', 'app.innerHTML = ')
code = code.replace(r'  \;', '  ;')
code = code.replace(r'fetch(\/recruit/session,', 'fetch(${apiBase}/recruit/session,')
code = code.replace(r'Error(Network error: \);', 'Error(Network error: );')

# Also handle the case where fetch has backslashes
code = code.replace(r'fetch(\${apiBase}/recruit/session\,', 'fetch(${apiBase}/recruit/session,')
code = code.replace(r'Error(\Network error: \\);', 'Error(Network error: );')

with open('frontend/src/recruit.js', 'w', encoding='utf-8') as f:
    f.write(code)
