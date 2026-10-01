import json
import os
from typing import Dict, Any, Optional

_TASK_DEFINITIONS_CACHE: Optional[Dict[str, Any]] = None

def get_task_definitions() -> Dict[str, Any]:
    global _TASK_DEFINITIONS_CACHE
    if _TASK_DEFINITIONS_CACHE is not None:
        return _TASK_DEFINITIONS_CACHE

    config_paths = [
        os.path.join(os.path.dirname(__file__), "..", "..", "config", "task_definitions.json"),
        os.path.join(os.path.dirname(__file__), "..", "..", "..", "config", "task_definitions.json"),
        "config/task_definitions.json",
        "backend/config/task_definitions.json"
    ]

    for p in config_paths:
        if os.path.exists(p):
            with open(p, "r", encoding="utf-8") as f:
                _TASK_DEFINITIONS_CACHE = json.load(f)
                return _TASK_DEFINITIONS_CACHE

    raise FileNotFoundError("config/task_definitions.json could not be located.")

def get_game_definition(game_id: str, version: str = "1.0") -> Optional[Dict[str, Any]]:
    defs = get_task_definitions()
    if defs.get("task_def_version") != version:
        return None
    return defs.get("games", {}).get(game_id)

def get_stimulus_ground_truth(game_id: str, stimulus_id: str, version: str = "1.0") -> Optional[Dict[str, Any]]:
    g_def = get_game_definition(game_id, version)
    if not g_def:
        return None

    trials = g_def.get("trials", [])
    for t in trials:
        if t.get("stimulus_id") == stimulus_id:
            return t
    return None
