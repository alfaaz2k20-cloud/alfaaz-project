import codecs
import re

with codecs.open('frontend/recruit.html', 'r', 'utf-8', errors='ignore') as f:
    text = f.read()

text = text.replace('â€”', '—')

text = re.sub(r"document\.getElementById\('sjt-phase-title'\)\.textContent = CYCLE II - SCENARIO .*?;", 
              "document.getElementById('sjt-phase-title').textContent = 'CYCLE II - SCENARIO ' + (currentSjtIndex + 1) + '/' + SJT_SCENARIOS.length;", text)

new_text = []
for c in text:
    if ord(c) >= 32 or c in '\n\r\t' or c in '—♥':
        new_text.append(c)

with codecs.open('frontend/recruit.html', 'w', 'utf-8') as f:
    f.write(''.join(new_text))
print("Fixed encoding")
