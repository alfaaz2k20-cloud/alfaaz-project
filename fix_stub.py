import re

with open('backend/app/services/feature_extractor.py', 'r', encoding='utf-8') as f:
    code = f.read()

# Replace _generic_stub(session_id, "X", events, "feature_name") with _generic_stub(session_id, "X", "feature_name", events)
# Regex to match: _generic_stub(session_id, "([^"]+)", events, "([^"]+)")
code = re.sub(
    r'_generic_stub\(session_id,\s*"([^"]+)",\s*events,\s*"([^"]+)"\)',
    r'_generic_stub(session_id, "\1", "\2", events)',
    code
)

with open('backend/app/services/feature_extractor.py', 'w', encoding='utf-8') as f:
    f.write(code)
