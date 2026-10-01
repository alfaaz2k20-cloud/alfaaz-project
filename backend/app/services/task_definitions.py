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

def reconstruct_e1_sorting_state(events: list) -> Dict[str, Any]:
    """
    Reconstructs E1 Rule Shift state strictly from primitive events:
    - trial_presented (stimulus_id, trial_index, t_ms)
    - tile_sorted (stimulus_id, trial_index, choice, t_ms)
    Derives dwell time / response latency strictly from event timestamps.
    Evaluates accuracy against server task ground truth.
    Tracks perseverative errors (post-shift adherence to pre-shift color rule).
    """
    defs = get_task_definitions().get("games", {}).get("E1", {})
    trials = defs.get("trials", [])

    presented_times = {}
    sorted_trials = {}

    for ev in events:
        mg = getattr(ev, "mini_game", None) or (ev.get("mini_game") if isinstance(ev, dict) else None)
        if mg != "E1":
            continue
        data_json = getattr(ev, "data_json", None)
        if data_json:
            data = json.loads(data_json)
        elif isinstance(ev, dict):
            data = ev.get("data", {})
        else:
            data = {}

        action = getattr(ev, "action", None) or (ev.get("action") if isinstance(ev, dict) else None)
        t_ms = getattr(ev, "t_ms", None) or (ev.get("t_ms") if isinstance(ev, dict) else 0.0)
        s_id = data.get("stimulus_id")

        if action == "trial_presented" and s_id:
            presented_times[s_id] = float(t_ms)
        elif action == "tile_sorted" and s_id:
            choice = data.get("choice")
            if choice:
                pres_t = presented_times.get(s_id)
                derived_dwell = max(0.0, float(t_ms) - pres_t) if pres_t is not None else None
                sorted_trials[s_id] = {
                    "choice": choice,
                    "dwell_ms": round(derived_dwell, 2) if derived_dwell is not None else None,
                    "input_modality": data.get("input_modality")
                }

    correct_count = 0
    perseverative_count = 0
    trial_results = []

    for i, t in enumerate(trials):
        s_id = t["stimulus_id"]
        res = sorted_trials.get(s_id)
        if not res:
            continue
        choice = res["choice"]
        target = t["target_container"]
        is_correct = (choice == target)
        if is_correct:
            correct_count += 1

        is_perseverative = False
        # Post-shift trials (index >= 3): check if error was consistent with pre-shift color rule
        if i >= 3 and not is_correct:
            color = t.get("tile_color")
            color_target = "container_1" if color == "Gold" else "container_2"
            if choice == color_target:
                is_perseverative = True
                perseverative_count += 1

        trial_results.append({
            "stimulus_id": s_id,
            "trial_index": i,
            "choice": choice,
            "target": target,
            "is_correct": is_correct,
            "is_perseverative": is_perseverative
        })

    completed = len(trial_results)
    return {
        "trials_completed": completed,
        "correct_count": correct_count,
        "accuracy": round(correct_count / completed, 4) if completed > 0 else 0.0,
        "perseverative_error_count": perseverative_count,
        "trial_results": trial_results,
        "all_trials_completed": completed == len(trials)
    }

def reconstruct_e2_recovery_state(events: list) -> Dict[str, Any]:
    """
    Reconstructs E2 Setback Recovery state strictly from primitive events:
    - sequence_presented
    - action_selected
    - sequence_completed
    """
    defs = get_task_definitions().get("games", {}).get("E2", {})
    trials = defs.get("trials", [])

    seq_actions = {}
    for ev in events:
        mg = getattr(ev, "mini_game", None) or (ev.get("mini_game") if isinstance(ev, dict) else None)
        if mg != "E2":
            continue
        data_json = getattr(ev, "data_json", None)
        if data_json:
            data = json.loads(data_json)
        elif isinstance(ev, dict):
            data = ev.get("data", {})
        else:
            data = {}

        action = getattr(ev, "action", None) or (ev.get("action") if isinstance(ev, dict) else None)
        s_id = data.get("stimulus_id")
        if action in ["action_selected", "sequence_completed"] and s_id:
            action_id = data.get("action_id") or data.get("chosen_action")
            if action_id:
                seq_actions[s_id] = action_id

    constructive_count = 0
    results = {}
    for t in trials:
        s_id = t["stimulus_id"]
        chosen = seq_actions.get(s_id)
        target = t.get("target_action")
        is_constructive = (chosen == target)
        if is_constructive:
            constructive_count += 1
        results[s_id] = {
            "chosen_action": chosen,
            "target_action": target,
            "is_constructive": is_constructive,
            "has_disruption": t.get("has_disruption", False)
        }

    return {
        "sequences": results,
        "completed_count": len(seq_actions),
        "constructive_count": constructive_count,
        "all_completed": len(seq_actions) == len(trials)
    }

def reconstruct_e3_adaptation_state(events: list) -> Dict[str, Any]:
    """
    Reconstructs E3 Changing Conditions state strictly from primitive events:
    - condition_presented
    - composition_action_attempted
    - composition_confirmed
    """
    defs = get_task_definitions().get("games", {}).get("E3", {})
    trials = defs.get("trials", [])

    confirmed = {}
    for ev in events:
        mg = getattr(ev, "mini_game", None) or (ev.get("mini_game") if isinstance(ev, dict) else None)
        if mg != "E3":
            continue
        data_json = getattr(ev, "data_json", None)
        if data_json:
            data = json.loads(data_json)
        elif isinstance(ev, dict):
            data = ev.get("data", {})
        else:
            data = {}

        action = getattr(ev, "action", None) or (ev.get("action") if isinstance(ev, dict) else None)
        s_id = data.get("stimulus_id")
        if action == "composition_confirmed" and s_id:
            chosen = data.get("chosen_action")
            if chosen:
                confirmed[s_id] = chosen

    aligned_count = 0
    results = {}
    for t in trials:
        s_id = t["stimulus_id"]
        chosen = confirmed.get(s_id)
        target = t.get("target_action")
        is_aligned = (chosen == target)
        if is_aligned:
            aligned_count += 1
        results[s_id] = {
            "chosen_action": chosen,
            "target_action": target,
            "is_aligned": is_aligned,
            "constraint_state": t.get("constraint_state")
        }

    return {
        "conditions": results,
        "completed_count": len(confirmed),
        "aligned_count": aligned_count,
        "all_completed": len(confirmed) == len(trials)
    }


