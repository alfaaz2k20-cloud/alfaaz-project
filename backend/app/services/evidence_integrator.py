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

# Template sentences for descriptive observations (Strictly non-evaluative)
OBSERVED_BEHAVIOR_TEMPLATES = {
    "empathy": {
        "calibrated": "Demonstrated {adj} latency in acknowledging partner feedback during acoustic tuning.",
        "uncalibrated": "Engaged in frequency balancing and partner communication trials."
    },
    "conscientiousness": {
        "calibrated": "Exhibited {adj} rule adherence and active verification during archival sorting.",
        "uncalibrated": "Participated in document cataloguing and quality control verification."
    },
    "collaborative_spirit": {
        "calibrated": "Demonstrated {adj} sensitivity to peer resource scarcity during mosaic construction.",
        "uncalibrated": "Engaged in collaborative tile allocation and stroke coordination."
    },
    "emotional_agility": {
        "calibrated": "Showed {adj} behavioral recovery speed post-reset.",
        "uncalibrated": "Completed symbolic sorting and grid navigation tasks."
    },
    "curiosity": {
        "calibrated": "Voluntarily explored {adj} proportion of optional historical alcoves.",
        "uncalibrated": "Navigated gallery floorplan and inspected artifact exhibits."
    },
    "creative_initiative": {
        "calibrated": "Generated structural configurations with {adj} dissimilarity from standard templates.",
        "uncalibrated": "Tested assembly variations and novel tool affordances."
    },
    "motivation": {
        "calibrated": "Formatted {adj} optional units beyond stated required minimum.",
        "uncalibrated": "Completed required formatting units with steady cadence."
    }
}

def integrate_session_evidence(db: Session, session_id: str) -> List[DBEvidence]:
    """
    Computes integrated evidence records per parameter from SJT responses and extracted game features.
    """
    evidence_records = db.exec(
        select(DBEvidence).where(DBEvidence.session_id == session_id)
    ).all()

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
            if m_feats and all(f.valid for f in m_feats):
                usable_count += 1

        # Game Status & Bands
        # Since thresholds are shipped as null (UNCALIBRATED per D3)
        if usable_count == 0:
            ev.game_status = "INSUFFICIENT"
            ev.game_band = None
            ev.consistency = "INSUFFICIENT"
            ev.relationship = "SJT_ONLY" if ev.sjt_band else "INSUFFICIENT"
        else:
            ev.game_status = "UNCALIBRATED"
            ev.game_band = "UNCALIBRATED"
            ev.consistency = "NOT_COMPUTED"
            ev.relationship = "NOT_COMPUTED"

        # Confidence Calculation
        if usable_count <= 1 or has_critical_flag:
            ev.confidence = "LIMITED"
        elif usable_count == 2:
            ev.confidence = "MODERATE"
        elif usable_count == 3 and not has_critical_flag:
            ev.confidence = "SUBSTANTIAL"

        # Narrative Template
        ev.observed_behavior_summary = OBSERVED_BEHAVIOR_TEMPLATES.get(param, {}).get(
            "uncalibrated", "Completed experimental interaction battery."
        )

        db.add(ev)
        updated_evidence.append(ev)

    db.commit()
    return updated_evidence
