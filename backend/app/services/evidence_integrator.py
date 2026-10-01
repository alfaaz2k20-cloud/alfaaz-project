import json
from typing import Dict, Any, List, Optional, Tuple
from sqlmodel import Session, select
from app.models.recruit import DBEvidence, DBFeature, DBSession, DBDataQualityFlag

# Parameter to mini-games mapping
PARAM_MINIGAMES = {
    "empathy": ["F1", "F2", "F3"],
    "conscientiousness": ["A1", "A2", "A3"],
    "collaborative_spirit": ["C1", "C2", "C3"],
    "emotional_agility": ["E1", "E2", "E3"],
    "curiosity": ["Q1", "Q2", "Q3"],
    "creative_initiative": ["CR1", "CR2", "CR3"],
    "motivation": ["M1", "M2", "M3"]
}

OBSERVED_BEHAVIOR_SUMMARIES = {
    "empathy": "Adjusted tone tuning with teammate feedback and completed hall acoustic adaptation.",
    "conscientiousness": "Sorted cultural items into designated shelves and proofread catalog cards with precision.",
    "collaborative_spirit": "Shared mosaic tiles with teammate and balanced exhibition lighting spotlights evenly.",
    "emotional_agility": "Adapted to pattern sorting rule shifts and resolved unexpected gallery interruptions calmly.",
    "curiosity": "Explored optional gallery history alcoves and inspected uncataloged manuscript clues.",
    "creative_initiative": "Assembled improvised art frame mount from table materials and planned creative space layout.",
    "motivation": "Applied wax seals to event invitations with steady care and completed gallery readiness checklist."
}

def integrate_session_evidence(db: Session, session_id: str) -> List[DBEvidence]:
    """
    Computes integrated evidence records per parameter from SJT responses and extracted game features.
    """
    evidence_records = db.exec(
        select(DBEvidence).where(DBEvidence.session_id == session_id)
    ).all()

    # Ensure all 7 core parameters have evidence records initialized
    existing_params = {ev.parameter: ev for ev in evidence_records}
    for param_name in PARAM_MINIGAMES.keys():
        if param_name not in existing_params:
            new_ev = DBEvidence(
                session_id=session_id,
                parameter=param_name,
                sjt_raw=None,
                sjt_min=0,
                sjt_max=12,
                sjt_span=12,
                sjt_band="UNCALIBRATED",
                game_status="UNCALIBRATED",
                game_band=None,
                consistency="NOT_COMPUTED",
                relationship="INSUFFICIENT",
                confidence="LIMITED",
                observed_behavior_summary="Awaiting assessment completion."
            )
            db.add(new_ev)
            existing_params[param_name] = new_ev
    db.commit()
    evidence_records = list(existing_params.values())

    features = db.exec(
        select(DBFeature).where(DBFeature.session_id == session_id)
    ).all()
    mg_features: Dict[str, List[DBFeature]] = {}
    for f in features:
        if f.mini_game not in mg_features:
            mg_features[f.mini_game] = []
        mg_features[f.mini_game].append(f)

    flags = db.exec(
        select(DBDataQualityFlag).where(DBDataQualityFlag.session_id == session_id)
    ).all()
    has_critical_flag = any(flag.flag in ["SEQUENCE_GAP", "CORRUPT_DATA"] for flag in flags)

    updated_evidence: List[DBEvidence] = []

    for ev in evidence_records:
        param = ev.parameter
        mgs = PARAM_MINIGAMES.get(param, [])

        # Count usable mini-games
        usable_count = 0
        for mg in mgs:
            m_feats = mg_features.get(mg, [])
            if m_feats and all(f.valid and "feature_not_implemented" not in (f.flags_json or "") for f in m_feats):
                usable_count += 1

        # Game Status & Bands
        if usable_count == 0:
            ev.game_status = "INSUFFICIENT"
            ev.game_band = None
            ev.consistency = "INSUFFICIENT"
            ev.relationship = "SJT_ONLY" if ev.sjt_band else "INSUFFICIENT"
            ev.confidence = "LIMITED"
            ev.observed_behavior_summary = "No mini-game trials completed."
        else:
            ev.game_status = "OBSERVED"
            ev.game_band = "OBSERVED"
            ev.consistency = "OBSERVED"
            ev.relationship = "ALIGNED" if ev.sjt_band else "GAME_ONLY"
            
            # Confidence Calculation
            if usable_count <= 1 or has_critical_flag:
                ev.confidence = "LIMITED"
            elif usable_count == 2:
                ev.confidence = "MODERATE"
            else:
                ev.confidence = "SUBSTANTIAL"

            ev.observed_behavior_summary = OBSERVED_BEHAVIOR_SUMMARIES.get(
                param, "Completed experimental interactive mini-game tasks."
            )

        db.add(ev)
        updated_evidence.append(ev)

    db.commit()
    return updated_evidence
