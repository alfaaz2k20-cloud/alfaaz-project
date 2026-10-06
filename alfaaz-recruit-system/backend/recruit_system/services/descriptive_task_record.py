import json
from typing import List, Dict, Any, Optional
from sqlmodel import Session, select
from recruit_system.models.recruit import DBTelemetryEvent, DBDataQualityFlag, DBSession
from recruit_system.services.task_definitions import (
    reconstruct_a3_inspection_state,
    reconstruct_c1_allocation_state,
    reconstruct_c3_repair_state,
    reconstruct_e1_sorting_state,
    reconstruct_e2_recovery_state,
    reconstruct_e3_adaptation_state,
    reconstruct_q1_information_seeking_state,
    reconstruct_q2_investigation_state,
    reconstruct_q3_integration_state,
    reconstruct_cr1_construction_state,
    reconstruct_cr2_reframing_state,
    reconstruct_cr3_affordance_state,
    reconstruct_m1_diligence_state,
    reconstruct_m2_continuation_state,
    reconstruct_m3_persistence_state,
    get_stimulus_ground_truth,
    get_game_role
)

# Canonical 21 games metadata
LOCKED_GAMES = [
    {"game_id": "F1", "world_id": "W1", "world_name": "The Frequency", "game_name": "Cue Detection", "is_neutral": False},
    {"game_id": "F2", "world_id": "W1", "world_name": "The Frequency", "game_name": "Ambiguous Cue", "is_neutral": True},
    {"game_id": "F3", "world_id": "W1", "world_name": "The Frequency", "game_name": "Context Change", "is_neutral": False},
    {"game_id": "A1", "world_id": "W2", "world_name": "The Archive", "game_name": "Classification", "is_neutral": False},
    {"game_id": "A2", "world_id": "W2", "world_name": "The Archive", "game_name": "Exception Handling", "is_neutral": False},
    {"game_id": "A3", "world_id": "W2", "world_name": "The Archive", "game_name": "Quality Control", "is_neutral": False},
    {"game_id": "C1", "world_id": "W3", "world_name": "The Shared Canvas", "game_name": "Resource Cooperation", "is_neutral": True},
    {"game_id": "C2", "world_id": "W3", "world_name": "The Shared Canvas", "game_name": "Coordination", "is_neutral": False},
    {"game_id": "C3", "world_id": "W3", "world_name": "The Shared Canvas", "game_name": "Collaboration Repair", "is_neutral": False},
    {"game_id": "E1", "world_id": "W4", "world_name": "The Shifting Grid", "game_name": "Rule Shift", "is_neutral": False},
    {"game_id": "E2", "world_id": "W4", "world_name": "The Shifting Grid", "game_name": "Setback Recovery", "is_neutral": True},
    {"game_id": "E3", "world_id": "W4", "world_name": "The Shifting Grid", "game_name": "Changing Conditions", "is_neutral": False},
    {"game_id": "Q1", "world_id": "W5", "world_name": "The Hidden Gallery", "game_name": "Optional Discovery", "is_neutral": True},
    {"game_id": "Q2", "world_id": "W5", "world_name": "The Hidden Gallery", "game_name": "Mystery Exploration", "is_neutral": True},
    {"game_id": "Q3", "world_id": "W5", "world_name": "The Hidden Gallery", "game_name": "Information Integration", "is_neutral": True},
    {"game_id": "CR1", "world_id": "W6", "world_name": "The Broken Tool", "game_name": "Open Construction", "is_neutral": True},
    {"game_id": "CR2", "world_id": "W6", "world_name": "The Broken Tool", "game_name": "Constraint Shift", "is_neutral": True},
    {"game_id": "CR3", "world_id": "W6", "world_name": "The Broken Tool", "game_name": "Unspecified Tool Use", "is_neutral": True},
    {"game_id": "M1", "world_id": "W7", "world_name": "The Repetition", "game_name": "Minimum Completed", "is_neutral": True},
    {"game_id": "M2", "world_id": "W7", "world_name": "The Repetition", "game_name": "Optional Continuation", "is_neutral": True},
    {"game_id": "M3", "world_id": "W7", "world_name": "The Repetition", "game_name": "Persistence Under Reduced Feedback", "is_neutral": True}
]

NEUTRAL_TAG = "neutral behavioral record, no good/bad direction"
DOSSIER_STATEMENT = "Descriptive task counts; not a score, not norm-referenced, and not a basis for automated decisions."

def get_session_task_records(db: Session, session_id: str) -> List[Dict[str, Any]]:
    """
    Computes deterministic, versioned, factual within-game Task Records (descriptive).
    Operates strictly on server ground truth and accepted primitive raw events.
    Does NOT modify R3 evidence records, bands, consistency, relationship, or confidence.
    Never computes cross-game sums, rankings, or automated decisions.
    """
    # Check session existence
    sess = db.get(DBSession, session_id)
    if not sess:
        return []

    # Check session-critical integrity flags
    flags = db.exec(
        select(DBDataQualityFlag).where(DBDataQualityFlag.session_id == session_id)
    ).all()
    critical_flags = {f.flag for f in flags if f.flag in ["seq_conflict", "events_cap_reached"]}
    is_session_invalid = bool(critical_flags)

    # Fetch all stored raw events
    events = db.exec(
        select(DBTelemetryEvent)
        .where(DBTelemetryEvent.session_id == session_id)
        .order_by(DBTelemetryEvent.seq)
    ).all()

    # Group events by mini_game
    game_events_map: Dict[str, List[DBTelemetryEvent]] = {}
    for ev in events:
        mg = ev.mini_game
        if mg:
            if mg not in game_events_map:
                game_events_map[mg] = []
            game_events_map[mg].append(ev)

    results = []
    for g in LOCKED_GAMES:
        gid = g["game_id"]
        evs = game_events_map.get(gid, [])

        # Display Gate Condition 1 & 2: telemetry & opportunities exist
        if not evs:
            results.append({
                "game_id": gid,
                "world_id": g["world_id"],
                "world_name": g["world_name"],
                "game_name": g["game_name"],
                "battery_role": get_game_role(gid),
                "status": "NOT_DERIVED",
                "display_text": "not derived yet",
                "is_neutral_record": g["is_neutral"],
                "opportunities_count": 0
            })
            continue

        # If session has critical conflict -> INVALID
        if is_session_invalid:
            results.append({
                "game_id": gid,
                "world_id": g["world_id"],
                "world_name": g["world_name"],
                "game_name": g["game_name"],
                "battery_role": get_game_role(gid),
                "status": "INVALID",
                "display_text": "INVALID",
                "is_neutral_record": g["is_neutral"],
                "opportunities_count": len(evs)
            })
            continue

        # Check for game-level interruption
        has_interruption = any(e.action == "interrupted" for e in evs)
        if has_interruption:
            results.append({
                "game_id": gid,
                "world_id": g["world_id"],
                "world_name": g["world_name"],
                "game_name": g["game_name"],
                "battery_role": get_game_role(gid),
                "status": "INSUFFICIENT",
                "display_text": "INSUFFICIENT",
                "is_neutral_record": g["is_neutral"],
                "opportunities_count": len(evs)
            })
            continue

        # Game-specific derivation
        desc_text = None
        opp_count = 0
        gate_status = "RECORDED"

        if gid == "F1":
            submits = [e for e in evs if e.action in ["trial_submit", "dialogue_selected"]]
            opp_count = len(submits)
            desc_text = f"completed {opp_count} of 6 cue attunement trials"

        elif gid == "F2":
            submits = [e for e in evs if e.action in ["trial_submit", "inquiry_selected"]]
            opp_count = len(submits)
            desc_text = f"completed {opp_count} of 4 ambiguous cue inquiry trials; {NEUTRAL_TAG}"

        elif gid == "F3":
            submits = [e for e in evs if e.action in ["transition_completed", "trial_submit", "adaptation_selected", "updated_response_selected"]]
            opp_count = len(submits)
            desc_text = f"completed {opp_count} of 3 contextual interpretation transitions"

        elif gid == "A1":
            fileds = [e for e in evs if e.action in ["document_filed", "item_sorted"]]
            opp_count = len(fileds)
            desc_text = f"completed {opp_count} of 5 classification items"

        elif gid == "A2":
            # Strict A2 Gate: genuine exceptions < 3 -> INSUFFICIENT
            decs = [e for e in evs if e.action == "decision_logged"]
            if not decs:
                decs = [e for e in evs if e.action == "exception_resolved"]
            seen_stim = set()
            genuine_stim = set()
            for e in decs:
                d = json.loads(e.data_json) if e.data_json else {}
                sid = d.get("stimulus_id")
                if sid and sid not in seen_stim:
                    seen_stim.add(sid)
                    stim = get_stimulus_ground_truth("A2", sid)
                    if stim:
                        if stim.get("condition_type") == "true_exception":
                            genuine_stim.add(sid)
                    else:
                        genuine_stim.add(sid)

            opp_count = len(genuine_stim) if seen_stim else len(decs)
            if opp_count < 3:
                gate_status = "INSUFFICIENT"
                desc_text = "INSUFFICIENT"
            else:
                desc_text = f"handled {min(opp_count, 3)} of 3 exceptions as defined"

        elif gid == "A3":
            res = reconstruct_a3_inspection_state(evs)
            opp_count = res.get("inspected_count", 0)
            desc_text = f"inspected {res.get('inspected_count', 0)} of 5 records; flagged {res.get('flagged_count', 0)} discrepancies"

        elif gid == "C1":
            res = reconstruct_c1_allocation_state(evs)
            opp_count = len(res.get("rounds", {}))
            desc_text = f"completed {opp_count} of 3 resource allocation rounds; {NEUTRAL_TAG}"

        elif gid == "C2":
            confirms = [e for e in evs if e.action == "placement_confirmed"]
            opp_count = len(confirms)
            desc_text = f"completed {opp_count} of 3 canvas coordination rounds"

        elif gid == "C3":
            res = reconstruct_c3_repair_state(evs)
            opp_count = res.get("completed_count", 0)
            desc_text = f"identified and executed repair in {opp_count} of 3 collaboration breakdowns"

        elif gid == "E1":
            res = reconstruct_e1_sorting_state(evs)
            opp_count = res.get("trials_completed", 0)
            desc_text = f"completed {opp_count} of 9 rule-shift trials"

        elif gid == "E2":
            res = reconstruct_e2_recovery_state(evs)
            opp_count = res.get("completed_count", res.get("total_sequences_completed", 0))
            desc_text = f"completed {opp_count} of 4 sequences across 3 disruptions and 1 control; {NEUTRAL_TAG}"

        elif gid == "E3":
            res = reconstruct_e3_adaptation_state(evs)
            opp_count = res.get("completed_count", res.get("transitions_completed", 0))
            desc_text = f"completed {opp_count} of 3 environmental condition transitions"

        elif gid == "Q1":
            res = reconstruct_q1_information_seeking_state(evs)
            opp_count = res.get("optional_alcoves_inspected", res.get("useful_resources_viewed_count", 0) + res.get("control_resources_viewed_count", 0))
            desc_text = f"explored {opp_count} of 4 optional alcoves; {NEUTRAL_TAG}"

        elif gid == "Q2":
            res = reconstruct_q2_investigation_state(evs)
            opp_count = res.get("total_clues_inspected", res.get("optional_clues_inspected", 0))
            desc_text = f"inspected {opp_count} optional investigative clues across 4 artifacts; {NEUTRAL_TAG}"

        elif gid == "Q3":
            res = reconstruct_q3_integration_state(evs)
            opp_count = res.get("context_retrieved_count", res.get("optional_dossiers_requested", 0))
            desc_text = f"retrieved {opp_count} optional dossiers across 3 synthesis decisions; {NEUTRAL_TAG}"

        elif gid == "CR1":
            res = reconstruct_cr1_construction_state(evs)
            opp_count = res.get("total_elements_placed", res.get("valid_solution_count", res.get("completed_count", 0)))
            desc_text = f"assembled 3 compositions using {opp_count} distinct elements; {NEUTRAL_TAG}"

        elif gid == "CR2":
            res = reconstruct_cr2_reframing_state(evs)
            opp_count = res.get("strategy_revised_count", res.get("total_reframing_adjustments", 0))
            desc_text = f"completed 3 constraint shifts with {opp_count} reframing adjustments; {NEUTRAL_TAG}"

        elif gid == "CR3":
            res = reconstruct_cr3_affordance_state(evs)
            opp_count = res.get("total_affordances_tested", res.get("aligned_count", res.get("completed_count", 0)))
            desc_text = f"tested {opp_count} tool affordances across 3 fixture problems; {NEUTRAL_TAG}"

        elif gid == "M1":
            res = reconstruct_m1_diligence_state(evs)
            opp_count = res.get("completed_count", res.get("units_completed", 0))
            desc_text = f"completed {opp_count} of 3 required verification units; {NEUTRAL_TAG}"

        elif gid == "M2":
            res = reconstruct_m2_continuation_state(evs)
            opp_count = res.get("optional_completed_count", 0)
            desc_text = f"completed 3 mandatory units and continued for {opp_count} optional units; {NEUTRAL_TAG}"

        elif gid == "M3":
            res = reconstruct_m3_persistence_state(evs)
            opp_count = res.get("voluntary_completed_count", 0)
            desc_text = f"completed 3 mandatory units and verified {opp_count} voluntary rows under reduced feedback; {NEUTRAL_TAG}"

        results.append({
            "game_id": gid,
            "world_id": g["world_id"],
            "world_name": g["world_name"],
            "game_name": g["game_name"],
            "battery_role": get_game_role(gid),
            "status": gate_status,
            "display_text": desc_text if desc_text else "not derived yet",
            "is_neutral_record": g["is_neutral"],
            "opportunities_count": opp_count
        })

    return results
