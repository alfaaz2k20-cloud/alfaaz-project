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

def reconstruct_c1_allocation_state(events: list) -> Dict[str, Any]:
    """
    Reconstructs C1 allocation state strictly from primitive observable events:
    - resource_transferred (stimulus_id / trial_index, delta)
    - allocation_confirmed (stimulus_id / trial_index)
    Derives transferred_count, remaining_count, partner_final_count, and final_allocation_state.
    Never relies on client-authored summary fields.
    """
    round_baselines = {
        "C1_R1": {"user_initial": 8, "partner_initial": 2, "trial_index": 0},
        "C1_R2": {"user_initial": 5, "partner_initial": 5, "trial_index": 1},
        "C1_R3": {"user_initial": 5, "partner_initial": 8, "trial_index": 2}
    }
    
    # State tracking per stimulus_id
    transfers = {"C1_R1": 0, "C1_R2": 0, "C1_R3": 0}
    confirmed = {"C1_R1": False, "C1_R2": False, "C1_R3": False}

    idx_to_stim = {0: "C1_R1", 1: "C1_R2", 2: "C1_R3"}

    for ev in events:
        mg = getattr(ev, "mini_game", None) or (ev.get("mini_game") if isinstance(ev, dict) else None)
        if mg != "C1":
            continue
        data_json = getattr(ev, "data_json", None)
        if data_json:
            data = json.loads(data_json)
        elif isinstance(ev, dict):
            data = ev.get("data", {})
        else:
            data = {}

        action = getattr(ev, "action", None) or (ev.get("action") if isinstance(ev, dict) else None)
        stim_id = data.get("stimulus_id")
        if not stim_id and "trial_index" in data and data["trial_index"] in idx_to_stim:
            stim_id = idx_to_stim[data["trial_index"]]

        if not stim_id or stim_id not in round_baselines:
            continue

        base = round_baselines[stim_id]

        if action in ["resource_transferred", "tile_transferred", "allocation_adjusted"]:
            delta = data.get("delta")
            if delta is not None:
                transfers[stim_id] = max(0, min(base["user_initial"], transfers[stim_id] + delta))
            elif "allocated_amount" in data:
                transfers[stim_id] = max(0, min(base["user_initial"], int(data["allocated_amount"])))
        elif action in ["allocation_confirmed", "round_submit"]:
            confirmed[stim_id] = True

    results = {}
    for s_id, base in round_baselines.items():
        t_count = transfers[s_id]
        rem = base["user_initial"] - t_count
        p_final = base["partner_initial"] + t_count
        results[s_id] = {
            "stimulus_id": s_id,
            "transferred_count": t_count,
            "remaining_count": rem,
            "partner_final_count": p_final,
            "is_confirmed": confirmed[s_id],
            "final_allocation_state": {
                "user_final": rem,
                "partner_final": p_final,
                "transferred": t_count
            }
        }

    return {
        "rounds": results,
        "all_rounds_confirmed": all(confirmed.values()),
        "total_transferred": sum(transfers.values())
    }

def reconstruct_c3_repair_state(events: list) -> Dict[str, Any]:
    """
    Reconstructs C3 collaboration repair state strictly from primitive events:
    - repair_presented
    - breakdown_identified
    - repair_action_performed
    - repaired_action_executed
    """
    opportunities = {
        "C3_R1": {"presented": False, "fault_id": None, "repair_action_id": None, "execution_action_id": None, "completed": False},
        "C3_R2": {"presented": False, "fault_id": None, "repair_action_id": None, "execution_action_id": None, "completed": False},
        "C3_R3": {"presented": False, "fault_id": None, "repair_action_id": None, "execution_action_id": None, "completed": False}
    }
    idx_to_stim = {0: "C3_R1", 1: "C3_R2", 2: "C3_R3"}

    for ev in events:
        mg = getattr(ev, "mini_game", None) or (ev.get("mini_game") if isinstance(ev, dict) else None)
        if mg != "C3":
            continue
        data_json = getattr(ev, "data_json", None)
        if data_json:
            data = json.loads(data_json)
        elif isinstance(ev, dict):
            data = ev.get("data", {})
        else:
            data = {}

        action = getattr(ev, "action", None) or (ev.get("action") if isinstance(ev, dict) else None)
        stim_id = data.get("stimulus_id")
        if not stim_id and "trial_index" in data and data["trial_index"] in idx_to_stim:
            stim_id = idx_to_stim[data["trial_index"]]

        if not stim_id or stim_id not in opportunities:
            continue

        opp = opportunities[stim_id]
        if action == "repair_presented":
            opp["presented"] = True
        elif action == "breakdown_identified":
            opp["fault_id"] = data.get("fault_id")
        elif action == "repair_action_performed":
            opp["repair_action_id"] = data.get("repair_action_id")
        elif action == "repaired_action_executed":
            opp["execution_action_id"] = data.get("execution_action_id")
            if opp["fault_id"] and opp["repair_action_id"] and opp["execution_action_id"]:
                opp["completed"] = True

    completed_count = sum(1 for o in opportunities.values() if o["completed"])
    return {
        "opportunities": opportunities,
        "completed_count": completed_count,
        "all_completed": completed_count == 3
    }

