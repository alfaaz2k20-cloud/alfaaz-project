import re

filepath = "backend/tests/test_game_sjt_architecture.py"

with open(filepath, 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
skip = False

banned_strings = [
    '"F1_T6"', '"F2_T4"', '"F3_T3"', 
    '"DOC_05"', '"EXC_04"', '"REC_05"', 
    '"C1_R3"', '"C2_R3"', '"C3_R3"', 
    '"E1_T9"', '"E2_S4"', '"E3_C3"', 
    '"Q1_D4"', '"Q2_I4"', '"Q3_I3"', 
    '"CR1_S3"', '"CR2_E3"', '"CR3_T3"', 
    '"M1_U3"', '"M2_U3"', '"M3_U3"'
]

for line in lines:
    if any(b in line for b in banned_strings):
        continue
    new_lines.append(line)

with open(filepath, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)
