import os
import shutil

ROOT = "c:/Users/saqrt/OneDrive/Desktop/alliswell/alfaaz-project"
RECRUIT_ROOT = os.path.join(ROOT, "alfaaz-recruit-system")

# Create structure
os.makedirs(os.path.join(RECRUIT_ROOT, "backend/app/routers"), exist_ok=True)
os.makedirs(os.path.join(RECRUIT_ROOT, "backend/app/models"), exist_ok=True)
os.makedirs(os.path.join(RECRUIT_ROOT, "backend/app/services"), exist_ok=True)
os.makedirs(os.path.join(RECRUIT_ROOT, "backend/app/jobs"), exist_ok=True)
os.makedirs(os.path.join(RECRUIT_ROOT, "backend/config"), exist_ok=True)
os.makedirs(os.path.join(RECRUIT_ROOT, "backend/tests"), exist_ok=True)
os.makedirs(os.path.join(RECRUIT_ROOT, "frontend/src/recruit_games"), exist_ok=True)
os.makedirs(os.path.join(RECRUIT_ROOT, "docs"), exist_ok=True)

# Files to move exactly
FILES_TO_MOVE = [
    ("backend/app/routers/recruit.py", "backend/app/routers/recruit.py"),
    ("backend/app/routers/research_view.py", "backend/app/routers/research_view.py"),
    ("backend/app/models/recruit.py", "backend/app/models/recruit.py"),
    ("backend/app/services/game_scoring_engine.py", "backend/app/services/game_scoring_engine.py"),
    ("backend/app/services/descriptive_task_record.py", "backend/app/services/descriptive_task_record.py"),
    ("backend/app/services/telemetry_engine.py", "backend/app/services/telemetry_engine.py"),
    ("backend/app/services/feature_extractor.py", "backend/app/services/feature_extractor.py"),
    ("backend/app/services/task_definitions.py", "backend/app/services/task_definitions.py"),
    ("backend/config/task_definitions.json", "backend/config/task_definitions.json"),
    ("backend/app/jobs/calibration_preflight.py", "backend/app/jobs/calibration_preflight.py"),
    ("backend/tests/test_candidate_battery_v2.py", "backend/tests/test_candidate_battery_v2.py"),
    ("backend/tests/test_game_sjt_architecture.py", "backend/tests/test_game_sjt_architecture.py"),
    ("backend/tests/test_final_architecture.py", "backend/tests/test_final_architecture.py"),
    ("backend/tests/test_playtest_hardening.py", "backend/tests/test_playtest_hardening.py"),
    
    ("frontend/recruit.html", "frontend/recruit.html"),
    ("frontend/research.html", "frontend/research.html"),
    ("frontend/src/recruit.js", "frontend/src/recruit.js"),
    ("frontend/src/research.js", "frontend/src/research.js"),
    ("frontend/src/recruit-utilities.css", "frontend/src/recruit-utilities.css"),
    
    ("RECRUITMENT_INTEGRATION.md", "docs/RECRUITMENT_INTEGRATION.md")
]

# Folders to move exactly
DIRS_TO_MOVE = [
    ("frontend/src/recruit_games", "frontend/src/recruit_games")
]

for src_rel, dst_rel in FILES_TO_MOVE:
    src = os.path.join(ROOT, src_rel)
    dst = os.path.join(RECRUIT_ROOT, dst_rel)
    if os.path.exists(src):
        shutil.move(src, dst)
        print(f"Moved {src_rel}")

for src_rel, dst_rel in DIRS_TO_MOVE:
    src = os.path.join(ROOT, src_rel)
    dst = os.path.join(RECRUIT_ROOT, dst_rel)
    if os.path.exists(src):
        # shutil.move moves the directory itself, so we don't need it pre-created
        # but since we made it, let's remove the empty dst first
        if os.path.exists(dst):
            os.rmdir(dst)
        shutil.move(src, dst)
        print(f"Moved directory {src_rel}")

# Helper: Just copy main.py, config.py, database.py to the recruit system so it has the boilerplate
import shutil
for f in ["main.py", "database.py", "config.py"]:
    src = os.path.join(ROOT, "backend/app", f)
    if os.path.exists(src):
        shutil.copy(src, os.path.join(RECRUIT_ROOT, "backend/app", f))
        
# Helper: Copy frontend basic files
for f in ["vite.config.js", "package.json", "global.css", "global.js"]:
    src = os.path.join(ROOT, "frontend", f)
    if os.path.exists(src):
        shutil.copy(src, os.path.join(RECRUIT_ROOT, "frontend", f))

print("Move complete.")
