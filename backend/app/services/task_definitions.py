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

def reconstruct_a3_inspection_state(events: list) -> Dict[str, Any]:
    """
    Reconstructs A3 QC state strictly from primitive observable events:
    - record_inspected (stimulus_id)
    - discrepancy_toggled (stimulus_id, flagged_state)
    - verification_finalized
    Does not rely on or accept any client-authored summaries.
    """
    inspected = set()
    flagged = set()
    verified = False

    for ev in events:
        mg = getattr(ev, "mini_game", None) or (ev.get("mini_game") if isinstance(ev, dict) else None)
        if mg != "A3":
            continue
        data_json = getattr(ev, "data_json", None)
        if data_json:
            data = json.loads(data_json)
        elif isinstance(ev, dict):
            data = ev.get("data", {})
        else:
            data = {}

        stim_id = data.get("stimulus_id") or data.get("record_id")
        action = getattr(ev, "action", None) or (ev.get("action") if isinstance(ev, dict) else None)

        if action == "record_inspected" and stim_id:
            inspected.add(stim_id)
        elif action == "discrepancy_toggled" and stim_id:
            if data.get("flagged_state"):
                flagged.add(stim_id)
            else:
                flagged.discard(stim_id)
        elif action in ["verification_finalized", "ledger_verified"]:
            verified = True

    defs = get_task_definitions().get("games", {}).get("A3", {})
    trials = defs.get("trials", [])

    tp, tn, fp, fn = 0, 0, 0, 0
    for t in trials:
        s_id = t.get("stimulus_id")
        has_error = t.get("has_error", False)
        is_flagged = s_id in flagged
        if has_error and is_flagged:
            tp += 1
        elif not has_error and not is_flagged:
            tn += 1
        elif not has_error and is_flagged:
            fp += 1
        elif has_error and not is_flagged:
            fn += 1

    total = len(trials) if trials else 5
    accuracy = (tp + tn) / total if total > 0 else 0.0

    return {
        "inspected_count": len(inspected),
        "inspected_records": sorted(list(inspected)),
        "flagged_count": len(flagged),
        "flagged_records": sorted(list(flagged)),
        "detection_accuracy": round(accuracy, 4),
        "verification_finalized": verified,
        "true_positives": tp,
        "true_negatives": tn,
        "false_positives": fp,
        "false_negatives": fn
    }
