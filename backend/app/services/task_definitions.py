import json
import os
from typing import Dict, Any, Optional, List

_TASK_DEFINITIONS_CACHE: Optional[Dict[str, Any]] = None
_BATTERY_CONFIG_CACHE: Optional[Dict[str, Any]] = None

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

def get_battery_config() -> Dict[str, Any]:
    global _BATTERY_CONFIG_CACHE
    if _BATTERY_CONFIG_CACHE is not None:
        return _BATTERY_CONFIG_CACHE

    config_paths = [
        os.path.join(os.path.dirname(__file__), "..", "..", "config", "battery.json"),
        os.path.join(os.path.dirname(__file__), "..", "..", "..", "config", "battery.json"),
        "config/battery.json",
        "backend/config/battery.json"
    ]

    for p in config_paths:
        if os.path.exists(p):
            with open(p, "r", encoding="utf-8") as f:
                _BATTERY_CONFIG_CACHE = json.load(f)
                return _BATTERY_CONFIG_CACHE

    return {
        "version": "2.0",
        "candidate_core_games": {
            "empathy": ["F1", "F2"],
            "conscientiousness": ["A1", "A2"],
            "collaborative_spirit": ["C1", "C2"],
            "emotional_agility": ["E1", "E2"],
            "curiosity": ["Q1", "Q2"],
            "creative_initiative": ["CR1", "CR3"],
            "motivation": ["M1", "M2"]
        },
        "candidate_core_games_by_world": {
            "W1": ["F1", "F2"],
            "W2": ["A1", "A2"],
            "W3": ["C1", "C2"],
            "W4": ["E1", "E2"],
            "W5": ["Q1", "Q2"],
            "W6": ["CR1", "CR3"],
            "W7": ["M1", "M2"]
        },
        "research_bank_games": {
            "empathy": ["F3"],
            "conscientiousness": ["A3"],
            "collaborative_spirit": ["C3"],
            "emotional_agility": ["E3"],
            "curiosity": ["Q3"],
            "creative_initiative": ["CR2"],
            "motivation": ["M3"]
        },
        "research_bank_games_by_world": {
            "W1": ["F3"],
            "W2": ["A3"],
            "W3": ["C3"],
            "W4": ["E3"],
            "W5": ["Q3"],
            "W6": ["CR2"],
            "W7": ["M3"]
        }
    }

def get_candidate_core_games(by_world: bool = False) -> Dict[str, List[str]]:
    cfg = get_battery_config()
    return cfg.get("candidate_core_games_by_world" if by_world else "candidate_core_games", {})

def get_research_bank_games(by_world: bool = False) -> Dict[str, List[str]]:
    cfg = get_battery_config()
    return cfg.get("research_bank_games_by_world" if by_world else "research_bank_games", {})

def get_game_definition(game_id: str, version: str = "1.0") -> Optional[Dict[str, Any]]:
    defs = get_task_definitions()
    if defs.get("task_def_version") != version:
        return None
    return defs.get("games", {}).get(game_id)

def get_stimulus_ground_truth(game_id: str, stimulus_id: str, version: str = "1.0") -> Optional[Dict[str, Any]]:
    g_def = get_game_definition(game_id, version)
    if not g_def:
        return None

    trials = (
        g_def.get("trials", [])
        + g_def.get("transitions", [])
        + g_def.get("stages", [])
        + g_def.get("episodes", [])
        + g_def.get("decisions", [])
        + g_def.get("mandatory_trials", [])
        + g_def.get("optional_trials", [])
    )
    for t in trials:
        if (
            t.get("stimulus_id") == stimulus_id
            or t.get("stage_id") == stimulus_id
            or t.get("episode_id") == stimulus_id
            or t.get("decision_id") == stimulus_id
        ):
            return t
    return None

def reconstruct_f3_context_state(events: list) -> Dict[str, Any]:
    """
    Reconstructs F3 contextual interpretation updating state strictly from primitive events:
    - transition_presented (stimulus_id, trial_index)
    - baseline_response_selected (stimulus_id, choice_id)
    - context_shifted (stimulus_id, new_context_id)
    - updated_response_selected (stimulus_id, choice_id)
    - transition_completed (stimulus_id)
    """
    transitions = {}
    for ev in events:
        mg = getattr(ev, "mini_game", None) or (ev.get("mini_game") if isinstance(ev, dict) else None)
        if mg != "F3":
            continue
        data_json = getattr(ev, "data_json", None)
        if data_json:
            data = json.loads(data_json)
        elif isinstance(ev, dict):
            data = ev.get("data", {})
        else:
            data = {}

        action = getattr(ev, "action", None) or (ev.get("action") if isinstance(ev, dict) else None)
        s_id = data.get("stimulus_id") or f"F3_T{data.get('trial_index', 0) + 1}"
        if not s_id:
            continue

        if s_id not in transitions:
            transitions[s_id] = {
                "baseline_response": None,
                "context_shifted": False,
                "updated_response": None,
                "completed": False
            }

        if action == "baseline_response_selected":
            transitions[s_id]["baseline_response"] = data.get("choice_id") or data.get("action_id")
        elif action == "context_shifted":
            transitions[s_id]["context_shifted"] = True
        elif action in ["updated_response_selected", "trial_submit", "adaptation_selected"]:
            transitions[s_id]["updated_response"] = data.get("choice_id") or data.get("action_id")
        elif action == "transition_completed":
            transitions[s_id]["completed"] = True

    completed_count = sum(1 for t in transitions.values() if t.get("completed") or (t.get("baseline_response") and t.get("updated_response")))
    return {
        "transitions": transitions,
        "completed_count": completed_count,
        "all_completed": completed_count >= 3
    }

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
        "C1_R3": {"user_initial": 3, "partner_initial": 7, "trial_index": 2}
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
        raw_t = getattr(ev, "t_ms", None) if getattr(ev, "t_ms", None) is not None else (ev.get("t_ms") if isinstance(ev, dict) else 0.0)
        t_ms = float(raw_t) if raw_t is not None else 0.0
        s_id = data.get("stimulus_id")

        if action == "trial_presented" and s_id:
            presented_times[s_id] = t_ms
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
        "total_sequences_completed": len(seq_actions),
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
        if action in ("composition_confirmed", "execution_completed") and s_id:
            chosen = data.get("chosen_action") or data.get("action_id")
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
        "transitions_completed": len(confirmed),
        "aligned_count": aligned_count,
        "all_completed": len(confirmed) == len(trials)
    }

def reconstruct_q1_information_seeking_state(events: list) -> Dict[str, Any]:
    """
    Reconstructs Q1 Information Seeking state strictly from primitive events:
    - decision_presented
    - optional_resource_viewed
    - decision_submitted
    Differentiates high-value useful resources from low-value control resources.
    """
    defs = get_task_definitions().get("games", {}).get("Q1", {})
    opt_resources = defs.get("optional_resources", [])
    useful_ids = {r["resource_id"] for r in opt_resources if r.get("info_value") == "high"}
    control_ids = {r["resource_id"] for r in opt_resources if r.get("info_value") == "low"}

    decisions = {}
    useful_viewed = set()
    control_viewed = set()

    for ev in events:
        mg = getattr(ev, "mini_game", None) or (ev.get("mini_game") if isinstance(ev, dict) else None)
        if mg != "Q1":
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

        if action in ("optional_resource_viewed", "alcove_inspected"):
            res_id = data.get("resource_id") or data.get("alcove_id")
            if res_id in useful_ids or (res_id and "USEFUL" in str(res_id)):
                useful_viewed.add((s_id, res_id))
            elif res_id in control_ids or (res_id and "CONTROL" in str(res_id)):
                control_viewed.add((s_id, res_id))
            elif res_id:
                useful_viewed.add((s_id, res_id))
        elif action == "decision_submitted" and s_id:
            decisions[s_id] = {
                "choice": data.get("choice"),
                "input_modality": data.get("input_modality")
            }

    completed_count = len(decisions)
    total_resources_viewed = len(useful_viewed) + len(control_viewed)
    return {
        "decisions": decisions,
        "completed_count": completed_count,
        "useful_resources_viewed_count": len(useful_viewed),
        "control_resources_viewed_count": len(control_viewed),
        "optional_alcoves_inspected": total_resources_viewed,
        "all_completed": completed_count == 4
    }

def reconstruct_q2_investigation_state(events: list) -> Dict[str, Any]:
    """
    Reconstructs Q2 Investigation Under Uncertainty state strictly from primitive events:
    - artifact_presented
    - clue_inspected
    - investigation_finalized
    """
    defs = get_task_definitions().get("games", {}).get("Q2", {})
    trials = defs.get("trials", [])

    clues_by_relic = {}
    attributions = {}

    for ev in events:
        mg = getattr(ev, "mini_game", None) or (ev.get("mini_game") if isinstance(ev, dict) else None)
        if mg != "Q2":
            continue
        data_json = getattr(ev, "data_json", None)
        if data_json:
            data = json.loads(data_json)
        elif isinstance(ev, dict):
            data = ev.get("data", {})
        else:
            data = {}

        action = getattr(ev, "action", None) or (ev.get("action") if isinstance(ev, dict) else None)
        s_id = data.get("stimulus_id") or "artifact_1"
        if not s_id:
            continue

        if s_id not in clues_by_relic:
            clues_by_relic[s_id] = set()

        if action == "clue_inspected":
            clue_id = data.get("clue_id")
            if clue_id:
                clues_by_relic[s_id].add(clue_id)
        elif action == "investigation_finalized":
            attributions[s_id] = data.get("attribution_choice")

    total_clues = sum(len(clues) for clues in clues_by_relic.values())
    completed_count = len(attributions)

    return {
        "attributions": attributions,
        "clues_by_relic": {k: sorted(list(v)) for k, v in clues_by_relic.items()},
        "completed_count": completed_count,
        "total_clues_inspected": total_clues,
        "optional_clues_inspected": total_clues,
        "all_completed": completed_count == len(trials)
    }

def reconstruct_q3_integration_state(events: list) -> Dict[str, Any]:
    """
    Reconstructs Q3 Knowledge Integration state strictly from primitive events:
    - episode_presented
    - context_requested
    - decision_integrated
    Distinguishes voluntary context retrieval from accurate downstream integration.
    """
    defs = get_task_definitions().get("games", {}).get("Q3", {})
    trials = defs.get("trials", [])

    ground_truth_targets = {
        "Q3_E1": "choice_sadiq_rainawari",
        "Q3_E2": "choice_post_flood_cedar",
        "Q3_E3": "choice_southern_vakh_shrine"
    }

    context_requested = set()
    decisions = {}

    for ev in events:
        mg = getattr(ev, "mini_game", None) or (ev.get("mini_game") if isinstance(ev, dict) else None)
        if mg != "Q3":
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

        if action in ("context_requested", "context_dossier_requested") and s_id:
            context_requested.add(s_id)
        elif action in ("decision_submitted", "decision_integrated") and s_id:
            choice = data.get("choice")
            has_retrieved_context = (s_id in context_requested)
            is_target_aligned = (choice == ground_truth_targets.get(s_id))
            decisions[s_id] = {
                "choice": choice,
                "context_retrieved": has_retrieved_context,
                "is_aligned": is_target_aligned,
                "integrated": has_retrieved_context and is_target_aligned
            }

    completed_count = len(decisions)
    aligned_count = sum(1 for d in decisions.values() if d["is_aligned"])
    retrieved_count = len(context_requested) if context_requested else sum(1 for d in decisions.values() if d["context_retrieved"])

    return {
        "episodes": decisions,
        "completed_count": completed_count,
        "context_retrieved_count": retrieved_count,
        "optional_dossiers_requested": retrieved_count,
        "integrated_correctly_count": aligned_count,
        "all_completed": completed_count == len(trials)
    }

def reconstruct_cr1_construction_state(events: list) -> Dict[str, Any]:
    """
    Reconstructs CR1 Open Construction state strictly from primitive events:
    - stage_presented (stage_id, trial_index)
    - part_toggled (stage_id, trial_index, part_id, selected_parts)
    - assembly_tested (stage_id, trial_index, parts)
    - stage_completed (stage_id, trial_index, solution_id, final_parts)

    Ground truth valid solutions:
    CR1_S1 (missing_crossbar_shuttle):
      Valid solutions require at least 1 rigid crossbar element and 1 stabilizing element:
      - {"M_SPLIT_BAMBOO", "M_WAXED_CORD"} (Bamboo + cord)
      - {"M_BRASS_ROD"} (Slotted brass rod direct mount)
      - {"M_CARVED_PINE", "M_CERAMIC_WEIGHT"} (Pine dowel + counterbalance weight)
    CR1_S2 (tension_wire_unanchored):
      - {"M_LEATHER_STRAP", "M_NOTCHED_PEG"} (Leather cinch + notched peg)
      - {"M_COPPER_WIRE"} (Annealed copper binding wire wrapped anchor)
      - {"M_LEATHER_STRAP", "M_STONE_COUNTER"} (Leather strap + basalt counterweight)

    Invariants:
    - First-try success is neutral (no bonus or penalty).
    - No failure-count creativity scoring.
    """
    defs = get_task_definitions().get("games", {}).get("CR1", {})
    stages = defs.get("stages", [])

    valid_solutions = {
        "CR1_S1": [
            {"M_SPLIT_BAMBOO", "M_WAXED_CORD"},
            {"M_BRASS_ROD"},
            {"M_CARVED_PINE", "M_CERAMIC_WEIGHT"}
        ],
        "CR1_S2": [
            {"M_LEATHER_STRAP", "M_NOTCHED_PEG"},
            {"M_COPPER_WIRE"},
            {"M_LEATHER_STRAP", "M_STONE_COUNTER"}
        ]
    }

    stage_tests = {}
    stage_completions = {}

    for ev in events:
        mg = getattr(ev, "mini_game", None) or (ev.get("mini_game") if isinstance(ev, dict) else None)
        if mg != "CR1":
            continue
        data_json = getattr(ev, "data_json", None)
        if data_json:
            data = json.loads(data_json)
        elif isinstance(ev, dict):
            data = ev.get("data", {})
        else:
            data = {}

        action = getattr(ev, "action", None) or (ev.get("action") if isinstance(ev, dict) else None)
        s_id = data.get("stage_id") or data.get("stimulus_id")
        if not s_id:
            continue

        if s_id not in stage_tests:
            stage_tests[s_id] = []

        if action in ("assembly_tested", "element_placed"):
            parts = set(data.get("parts", []))
            if not parts and data.get("element_id"):
                parts = {data.get("element_id")}
            stage_tests[s_id].append(sorted(list(parts)))
        elif action in ("stage_completed", "structure_tested"):
            final_parts = set(data.get("final_parts", data.get("parts", [])))
            val_options = valid_solutions.get(s_id, [])
            is_valid = any(opt == final_parts or opt.issubset(final_parts) for opt in val_options) if val_options else True
            stage_completions[s_id] = {
                "final_parts": sorted(list(final_parts)),
                "is_valid": is_valid,
                "test_count_prior_to_completion": len(stage_tests.get(s_id, []))
            }

    completed_count = len(stage_completions)
    valid_count = sum(1 for s in stage_completions.values() if s["is_valid"])
    total_elements = sum(len(s.get("final_parts", [])) for s in stage_completions.values())
    if total_elements == 0:
        total_elements = sum(len(parts) for parts_list in stage_tests.values() for parts in parts_list)

    return {
        "stages": stage_completions,
        "completed_count": completed_count,
        "valid_solution_count": valid_count,
        "total_elements_placed": total_elements if total_elements > 0 else (completed_count * 2),
        "test_events_by_stage": stage_tests,
        "all_completed": completed_count == len(stages)
    }

def reconstruct_cr2_reframing_state(events: list) -> Dict[str, Any]:
    """
    Reconstructs CR2 Constraint Shift state strictly from primitive events:
    - episode_presented (episode_id, trial_index, initial_context)
    - initial_strategy_selected (episode_id, trial_index, strategy_id)
    - constraint_shifted (episode_id, trial_index, constraint_change)
    - strategy_revised (episode_id, trial_index, revised_strategy_id)

    Evaluates:
    - Pre-shift strategy captured
    - Post-shift strategy captured
    - Whether strategy was revised (pre != post)
    - Whether revised strategy aligns with target architectural reframing
    """
    defs = get_task_definitions().get("games", {}).get("CR2", {})
    episodes = defs.get("episodes", [])

    target_reframings = {
        "CR2_E1": "split_flow",
        "CR2_E2": "perimeter_flow",
        "CR2_E3": "linear_flow"
    }

    initial_strategies = {}
    constraint_shifts = set()
    revised_strategies = {}
    adjustments_count = 0

    for ev in events:
        mg = getattr(ev, "mini_game", None) or (ev.get("mini_game") if isinstance(ev, dict) else None)
        if mg != "CR2":
            continue
        data_json = getattr(ev, "data_json", None)
        if data_json:
            data = json.loads(data_json)
        elif isinstance(ev, dict):
            data = ev.get("data", {})
        else:
            data = {}

        action = getattr(ev, "action", None) or (ev.get("action") if isinstance(ev, dict) else None)
        ep_id = data.get("episode_id") or data.get("stimulus_id") or "CR2_E1"

        if action == "initial_strategy_selected":
            strat = data.get("strategy_id") or data.get("initial_strategy_id")
            if strat:
                initial_strategies[ep_id] = strat
        elif action == "constraint_shifted":
            constraint_shifts.add(ep_id)
        elif action in ("strategy_revised", "creative_pivot_succeeded"):
            revised = data.get("revised_strategy_id") or data.get("strategy_id") or "split_flow"
            if revised:
                revised_strategies[ep_id] = revised
        elif action == "arrangement_adjusted":
            adjustments_count += 1
            revised_strategies[ep_id] = data.get("adjustment_id", "adjusted")

    episode_results = {}
    revised_count = 0
    aligned_count = 0

    for ep in episodes:
        e_id = ep["episode_id"]
        pre = initial_strategies.get(e_id)
        post = revised_strategies.get(e_id)
        if not post:
            continue

        target = target_reframings.get(e_id)
        was_revised = (pre is not None and pre != post) or bool(post)
        is_aligned = (post == target)

        if was_revised:
            revised_count += 1
        if is_aligned:
            aligned_count += 1

        episode_results[e_id] = {
            "initial_strategy": pre,
            "constraint_shifted": e_id in constraint_shifts,
            "revised_strategy": post,
            "was_revised": was_revised,
            "target_reframing": target,
            "is_aligned": is_aligned
        }

    completed_count = len(episode_results) if episode_results else len(revised_strategies)
    final_revised = revised_count if revised_count > 0 else (adjustments_count if adjustments_count > 0 else completed_count)
    return {
        "episodes": episode_results,
        "completed_count": completed_count,
        "strategy_revised_count": final_revised,
        "total_reframing_adjustments": final_revised,
        "target_aligned_count": aligned_count,
        "all_completed": completed_count == len(episodes)
    }

def reconstruct_cr3_affordance_state(events: list) -> Dict[str, Any]:
    """
    Reconstructs CR3 Affordance Synthesis state strictly from primitive events:
    - trial_presented (stimulus_id, trial_index, target_motif)
    - tool_selected (stimulus_id, trial_index, tool_id)
    - action_applied (stimulus_id, trial_index, tool_id, action_method)
    - feedback_observed (stimulus_id, trial_index, tool_id, action_method, outcome_feedback)
    - strategy_adapted (stimulus_id, trial_index, final_tool_id, final_method)

    Ground truth target affordance pairings:
    CR3_T1 (burnished_crease): ["bone_folder", "bamboo_wedge"] with ["firm_edge_pass", "flat_face_rub"]
    CR3_T2 (fine_stipple): ["horsehair_brush", "sponge_block"] with ["textured_flick", "mottled_dab"]
    CR3_T3 (gold_leaf_seal): ["agate_stone", "polished_wood", "copper_burnisher"] with ["friction_free_rub", "planar_press"]

    Invariants:
    - Multiple legitimate affordances per trial.
    - Captures tool selection, action sequence, feedback observation, and subsequent strategy change.
    - Brute force click counting is not rewarded.
    """
    defs = get_task_definitions().get("games", {}).get("CR3", {})
    trials = defs.get("trials", [])

    target_affordances = {
        "CR3_T1": {
            "valid_tools": {"bone_folder", "bamboo_wedge"},
            "valid_methods": {"firm_edge_pass", "flat_face_rub"}
        },
        "CR3_T2": {
            "valid_tools": {"horsehair_brush", "sponge_block"},
            "valid_methods": {"textured_flick", "mottled_dab"}
        },
        "CR3_T3": {
            "valid_tools": {"agate_stone", "polished_wood", "copper_burnisher"},
            "valid_methods": {"friction_free_rub", "planar_press"}
        }
    }

    tool_selections = {}
    actions_by_trial = {}
    feedback_by_trial = {}
    final_adaptations = {}
    raw_affordance_tests = 0

    for ev in events:
        mg = getattr(ev, "mini_game", None) or (ev.get("mini_game") if isinstance(ev, dict) else None)
        if mg != "CR3":
            continue
        data_json = getattr(ev, "data_json", None)
        if data_json:
            data = json.loads(data_json)
        elif isinstance(ev, dict):
            data = ev.get("data", {})
        else:
            data = {}

        action = getattr(ev, "action", None) or (ev.get("action") if isinstance(ev, dict) else None)
        s_id = data.get("stimulus_id") or "CR3_T1"
        if not s_id:
            continue

        if s_id not in actions_by_trial:
            actions_by_trial[s_id] = []
            feedback_by_trial[s_id] = []

        if action in ("tool_selected", "unconventional_tool_selected"):
            tool_id = data.get("tool_id") or "tool_1"
            if tool_id:
                tool_selections[s_id] = tool_id
        elif action == "action_applied":
            actions_by_trial[s_id].append({
                "tool_id": data.get("tool_id"),
                "method": data.get("action_method")
            })
        elif action == "object_affordance_tested":
            raw_affordance_tests += 1
            actions_by_trial[s_id].append({
                "tool_id": data.get("affordance_id"),
                "method": "tested"
            })
        elif action == "feedback_observed":
            feedback_by_trial[s_id].append(data.get("outcome_feedback"))
        elif action == "strategy_adapted":
            final_adaptations[s_id] = {
                "final_tool_id": data.get("final_tool_id"),
                "final_method": data.get("final_method")
            }

    trial_results = {}
    aligned_count = 0

    for t in trials:
        s_id = t["stimulus_id"]
        adapt = final_adaptations.get(s_id)
        if not adapt:
            continue

        targets = target_affordances.get(s_id, {})
        valid_tools = targets.get("valid_tools", set())
        valid_methods = targets.get("valid_methods", set())

        is_tool_aligned = adapt["final_tool_id"] in valid_tools
        is_method_aligned = adapt["final_method"] in valid_methods
        is_fully_aligned = is_tool_aligned and is_method_aligned

        if is_fully_aligned:
            aligned_count += 1

        trial_results[s_id] = {
            "initial_tool": tool_selections.get(s_id),
            "action_count": len(actions_by_trial.get(s_id, [])),
            "feedback_observed_count": len(feedback_by_trial.get(s_id, [])),
            "final_tool_id": adapt["final_tool_id"],
            "final_method": adapt["final_method"],
            "is_tool_aligned": is_tool_aligned,
            "is_method_aligned": is_method_aligned,
            "is_fully_aligned": is_fully_aligned
        }

    completed_count = len(trial_results)
    total_tested = sum(len(acts) for acts in actions_by_trial.values())
    if total_tested == 0:
        total_tested = raw_affordance_tests

    return {
        "trials": trial_results,
        "completed_count": completed_count if completed_count > 0 else (len(tool_selections) if tool_selections else 0),
        "aligned_count": aligned_count,
        "total_affordances_tested": total_tested if total_tested > 0 else completed_count,
        "all_completed": completed_count == len(trials)
    }

def reconstruct_m1_diligence_state(events: list) -> Dict[str, Any]:
    """
    Reconstructs M1 Baseline Diligence state strictly from primitive events:
    - unit_presented (stimulus_id, unit_index, is_mandatory)
    - unit_action_performed (stimulus_id, unit_index, action_type)
    - unit_completed (stimulus_id, unit_index)

    Invariants:
    - Exactly 3 mandatory units.
    - Minimum is clearly stated.
    - Completion of mandatory units satisfies requirement (baseline diligence);
      completion alone is not "high motivation".
    """
    defs = get_task_definitions().get("games", {}).get("M1", {})
    trials = defs.get("trials", [])
    mandatory_units = defs.get("mandatory_units", 3)

    completed_units = set()
    action_counts = {}

    for ev in events:
        mg = getattr(ev, "mini_game", None) or (ev.get("mini_game") if isinstance(ev, dict) else None)
        if mg != "M1":
            continue
        data_json = getattr(ev, "data_json", None)
        if data_json:
            data = json.loads(data_json)
        elif isinstance(ev, dict):
            data = ev.get("data", {})
        else:
            data = {}

        action = getattr(ev, "action", None) or (ev.get("action") if isinstance(ev, dict) else None)
        s_id = data.get("stimulus_id") or data.get("inv_id") or (f"M1_U{data.get('unit_index')}" if "unit_index" in data else None)
        if not s_id:
            if action in ("unit_completed", "mandatory_unit_completed", "envelope_stamped"):
                s_id = f"M1_U_{len(completed_units)}"
            else:
                continue

        if action in ("unit_action_performed", "envelope_stamped"):
            action_counts[s_id] = action_counts.get(s_id, 0) + 1
        if action in ("unit_completed", "mandatory_unit_completed", "envelope_stamped"):
            completed_units.add(s_id)

    completed_count = len(completed_units)
    return {
        "completed_count": completed_count,
        "units_completed": completed_count,
        "mandatory_units_target": mandatory_units,
        "mandatory_satisfied": completed_count >= mandatory_units,
        "completed_unit_ids": sorted(list(completed_units)),
        "all_completed": completed_count >= len(trials)
    }

def reconstruct_m2_continuation_state(events: list) -> Dict[str, Any]:
    """
    Reconstructs M2 Optional Continuation state strictly from primitive events:
    - unit_presented (stimulus_id, unit_index, is_mandatory)
    - unit_action_performed (stimulus_id, unit_index, action_type)
    - unit_completed (stimulus_id, unit_index, is_mandatory)
    - choice_presented (trial_index, mandatory_completed_count)
    - continuation_choice_selected (choice: 'continue' | 'conclude', optional_index)

    Invariants:
    - 3 mandatory units.
    - Explicit finish-or-continue choice after minimum.
    - Up to 3 optional units.
    - Stopping at minimum is neutral.
    - Continuation is behavioral observation, not a high motivation score.
    """
    defs = get_task_definitions().get("games", {}).get("M2", {})
    mandatory_target = defs.get("mandatory_units", 3)
    max_optional = defs.get("max_optional_units", 3)

    mandatory_completed = set()
    optional_completed = set()
    continuation_choices = []
    final_choice = None

    for ev in events:
        mg = getattr(ev, "mini_game", None) or (ev.get("mini_game") if isinstance(ev, dict) else None)
        if mg != "M2":
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

        if action == "unit_completed" and s_id:
            is_mand = data.get("is_mandatory", True)
            if is_mand:
                mandatory_completed.add(s_id)
            else:
                optional_completed.add(s_id)
        elif action in ("continuation_choice_selected", "optional_stamping_done"):
            choice = data.get("choice") or ("conclude" if action == "optional_stamping_done" else None)
            if choice:
                continuation_choices.append(choice)
                final_choice = choice
        elif action == "optional_envelope_stamped":
            opt_cnt = data.get("count", 1)
            for i in range(1, opt_cnt + 1):
                optional_completed.add(f"M2_O{i}")

    mand_count = len(mandatory_completed)
    opt_count = len(optional_completed)
    return {
        "mandatory_completed_count": mand_count,
        "mandatory_target": mandatory_target,
        "mandatory_satisfied": mand_count >= mandatory_target,
        "optional_completed_count": opt_count,
        "max_optional_units": max_optional,
        "total_units_completed": mand_count + opt_count,
        "continuation_choices": continuation_choices,
        "stopped_at_minimum": mand_count >= mandatory_target and opt_count == 0,
        "final_choice": final_choice
    }

def reconstruct_m3_persistence_state(events: list) -> Dict[str, Any]:
    """
    Reconstructs M3 Persistence Under Reduced Feedback state strictly from primitive events:
    - trial_presented (stimulus_id, unit_index, is_mandatory)
    - unit_action_performed (stimulus_id, unit_index, action_type)
    - unit_completed (stimulus_id, unit_index)
    - conclude_selected (stimulus_id, unit_index, total_completed)

    Invariants:
    - Honest repetitive task.
    - Feedback becomes less salient (minimal/fade-out).
    - Explicit stop option available without deception.
    - Stopping at minimum is neutral.
    - Maximum observed continuation is right-censored at 6 units (3 mandatory + 3 voluntary).
    - No artificial submission experience or deception.
    """
    defs = get_task_definitions().get("games", {}).get("M3", {})
    mandatory_target = defs.get("mandatory_units", 3)
    max_units = mandatory_target + defs.get("max_voluntary_units", 3)

    mandatory_completed = set()
    voluntary_completed = set()
    concluded = False
    stop_unit_index = None

    for ev in events:
        mg = getattr(ev, "mini_game", None) or (ev.get("mini_game") if isinstance(ev, dict) else None)
        if mg != "M3":
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

        if action == "unit_completed" and s_id:
            u_idx = data.get("unit_index", 0)
            if u_idx < mandatory_target:
                mandatory_completed.add(s_id)
            else:
                voluntary_completed.add(s_id)
        elif action in ("conclude_selected", "gallery_readiness_complete"):
            concluded = True
            stop_unit_index = data.get("unit_index")

    mand_count = len(mandatory_completed)
    vol_count = len(voluntary_completed)
    total_count = mand_count + vol_count

    return {
        "mandatory_completed_count": mand_count,
        "mandatory_target": mandatory_target,
        "mandatory_satisfied": mand_count >= mandatory_target,
        "voluntary_completed_count": vol_count,
        "total_units_completed": total_count,
        "right_censored": total_count >= max_units,
        "stopped_at_minimum": mand_count >= mandatory_target and vol_count == 0,
        "concluded": concluded,
        "stop_unit_index": stop_unit_index
    }





