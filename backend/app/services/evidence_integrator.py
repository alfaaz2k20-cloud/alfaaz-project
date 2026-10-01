import os
import json
from typing import Dict, Any, List, Optional, Tuple
from datetime import datetime, timezone
from sqlmodel import Session, select
from app.models.recruit import (
    DBEvidence, DBFeature, DBSession, DBDataQualityFlag, DBSJTResponse
)
from app.services.sjt_engine import score_sjt_responses, resolve_config_path

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

CRITICAL_FLAGS = {"seq_conflict", "events_cap_reached"}
BAND_ORDINALS = {"LOW": 0, "MODERATE": 1, "HIGH": 2}
ORDINAL_BANDS = {0: "LOW", 1: "MODERATE", 2: "HIGH"}

DEFAULT_CONFIG_HASH = "f9026b9c50ad4a7c65b3108b2b3321b8c4daece85a1402274d9f342374cf0397"


def load_integration_config() -> Dict[str, Any]:
    path = resolve_config_path("integration.json")
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    return {
        "min_usable_minigames": 2,
        "consistency_max_band_range": 1,
        "minigame_weights": {mg: 1.0 / 3.0 for p_mgs in PARAM_MINIGAMES.values() for mg in p_mgs}
    }


def load_feature_bands_config() -> Dict[str, Any]:
    path = resolve_config_path("feature_bands.json")
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    return {"calibration_status": "UNCALIBRATED", "bands": {}}


def load_config_hash() -> str:
    path = resolve_config_path("locked_hashes.json")
    if os.path.exists(path):
        try:
            with open(path, "r", encoding="utf-8") as f:
                data = json.load(f)
                return data.get("parameters_canonical_sha256", DEFAULT_CONFIG_HASH)
        except Exception:
            return DEFAULT_CONFIG_HASH
    return DEFAULT_CONFIG_HASH


def evaluate_minigame_status(
    mg: str,
    mg_feats: List[DBFeature],
    quality_flags: List[DBDataQualityFlag]
) -> str:
    """
    Evaluates mini-game status: USABLE, INSUFFICIENT, or INVALID.
    Never convert INSUFFICIENT or INVALID into a LOW band.
    """
    if not mg_feats:
        return "INSUFFICIENT"

    feature_flags = set()
    for f in mg_feats:
        if not f.valid:
            return "INVALID"
        if f.flags_json:
            try:
                fl = json.loads(f.flags_json)
                if isinstance(fl, list):
                    feature_flags.update(fl)
            except Exception:
                pass

    if "invalid_timing" in feature_flags:
        return "INVALID"

    mg_scoped_flags = [qf.flag for qf in quality_flags if qf.scope == mg]
    if any(fl in ["seq_gap", "seq_conflict", "invalid_timing"] for fl in mg_scoped_flags):
        return "INVALID"

    if "feature_not_implemented" in feature_flags:
        return "INSUFFICIENT"

    if "interrupted" in feature_flags or any(fl == "interrupted" for fl in mg_scoped_flags):
        return "INSUFFICIENT"

    if any(f.value_raw is None for f in mg_feats):
        return "INSUFFICIENT"

    return "USABLE"


def classify_minigame_band(mg: str, feat_val: Optional[float], band_def: Any) -> Optional[str]:
    """
    Evaluates a mini-game feature value against a calibrated band definition.
    Only called when calibrated.
    """
    if feat_val is None or band_def is None:
        return None
    if isinstance(band_def, str) and band_def in BAND_ORDINALS:
        return band_def
    if isinstance(band_def, dict):
        # Case 1: thresholds {"LOW": <float>, "HIGH": <float>}
        if "LOW" in band_def and "HIGH" in band_def and not isinstance(band_def["LOW"], list):
            low_cutoff = band_def["LOW"]
            high_cutoff = band_def["HIGH"]
            if feat_val < low_cutoff:
                return "LOW"
            elif feat_val >= high_cutoff:
                return "HIGH"
            else:
                return "MODERATE"
        # Case 2: range bounds {"LOW": [min, max], "MODERATE": [min, max], "HIGH": [min, max]}
        for b_name in ["LOW", "MODERATE", "HIGH"]:
            bounds = band_def.get(b_name)
            if isinstance(bounds, (list, tuple)) and len(bounds) == 2:
                if bounds[0] <= feat_val <= bounds[1]:
                    return b_name
    return "MODERATE"


def aggregate_game_bands(
    usable_mgs: List[str],
    mg_bands: List[str],
    weights: Dict[str, float]
) -> str:
    """
    Aggregates calibrated mini-game ordinal bands into a parameter-level game band.
    """
    valid_pairs = [(mg, b) for mg, b in zip(usable_mgs, mg_bands) if b in BAND_ORDINALS]
    if not valid_pairs:
        return "MODERATE"
    total_w = sum(weights.get(mg, 1.0) for mg, _ in valid_pairs)
    if total_w <= 0:
        total_w = 1.0
    weighted_ord = sum(weights.get(mg, 1.0) * BAND_ORDINALS[b] for mg, b in valid_pairs) / total_w
    rounded_ord = int(round(weighted_ord))
    return ORDINAL_BANDS.get(rounded_ord, "MODERATE")


def is_calibrated(usable_mgs: List[str], feature_bands_cfg: Dict[str, Any], min_usable: int) -> bool:
    if feature_bands_cfg.get("calibration_status") != "CALIBRATED":
        return False
    bands = feature_bands_cfg.get("bands", {})
    return len(usable_mgs) >= min_usable and all(bands.get(mg) is not None for mg in usable_mgs)


def integrate_session_evidence(
    db: Session,
    session_id: str,
    force_recompute: bool = False,
    feature_bands_override: Optional[Dict[str, Any]] = None,
    integration_override: Optional[Dict[str, Any]] = None
) -> List[DBEvidence]:
    """
    Computes integrated evidence records per parameter from SJT responses and extracted game features.
    
    Derived records are INSERT-ONLY:
    - Never UPDATE existing derived records in place.
    - Each recompute inserts new records and marks previous records as superseded.
    - Exactly one current non-superseded result per derivation scope (session_id, parameter).
    """
    # Check existing non-superseded records
    existing_records = db.exec(
        select(DBEvidence).where(
            DBEvidence.session_id == session_id,
            DBEvidence.is_superseded == False
        )
    ).all()
    existing_by_param = {rec.parameter: rec for rec in existing_records}

    # If not forcing recompute and all 7 parameters exist, return current non-superseded records
    if not force_recompute and len(existing_by_param) == len(PARAM_MINIGAMES):
        return [existing_by_param[p] for p in PARAM_MINIGAMES.keys() if p in existing_by_param]

    # Load configurations
    integration_cfg = integration_override or load_integration_config()
    feature_bands_cfg = feature_bands_override or load_feature_bands_config()
    cfg_hash = load_config_hash()

    min_usable = integration_cfg.get("min_usable_minigames", 2)
    consistency_max_range = integration_cfg.get("consistency_max_band_range", 1)
    weights = integration_cfg.get("minigame_weights", {})

    # Data quality flags & critical flag check
    quality_flags = db.exec(
        select(DBDataQualityFlag).where(DBDataQualityFlag.session_id == session_id)
    ).all()
    has_critical_flag = any(qf.flag in CRITICAL_FLAGS for qf in quality_flags)

    # Features grouped by mini-game
    features = db.exec(
        select(DBFeature).where(DBFeature.session_id == session_id)
    ).all()
    mg_features: Dict[str, List[DBFeature]] = {}
    for f in features:
        if f.mini_game not in mg_features:
            mg_features[f.mini_game] = []
        mg_features[f.mini_game].append(f)

    # SJT responses & scoring
    sjt_responses = db.exec(
        select(DBSJTResponse).where(DBSJTResponse.session_id == session_id)
    ).all()
    sjt_scores: Dict[str, Dict[str, Any]] = {}
    if len(sjt_responses) == 7:
        resp_map = {r.scenario_id: r.option_id for r in sjt_responses}
        try:
            sjt_scores = score_sjt_responses(resp_map)
        except Exception:
            sjt_scores = {}

    if not sjt_scores:
        # SJT is missing or incomplete; record informational flag sjt_missing if not present
        if not any(qf.flag == "sjt_missing" for qf in quality_flags):
            sjt_missing_flag = DBDataQualityFlag(
                session_id=session_id,
                scope="session",
                flag="sjt_missing",
                detail="SJT responses missing or incomplete"
            )
            db.add(sjt_missing_flag)

    now_utc = datetime.now(timezone.utc)
    updated_records: List[DBEvidence] = []

    for param_name, mgs in PARAM_MINIGAMES.items():
        # Evaluate each mini-game's status
        usable_mgs = [
            mg for mg in mgs
            if evaluate_minigame_status(mg, mg_features.get(mg, []), quality_flags) == "USABLE"
        ]
        n_usable = len(usable_mgs)

        # 1. Game Status
        if n_usable >= min_usable:
            game_status = "USABLE"
        else:
            game_status = "INSUFFICIENT"

        # SJT score for this parameter
        param_sjt = sjt_scores.get(param_name)
        if param_sjt:
            sjt_raw = param_sjt["raw"]
            sjt_min = param_sjt["min"]
            sjt_max = param_sjt["max"]
            sjt_span = param_sjt["span"]
            sjt_band = param_sjt["band"]
        else:
            sjt_raw = None
            sjt_min = None
            sjt_max = None
            sjt_span = None
            sjt_band = None

        # 2. Calibration check
        calibrated = is_calibrated(usable_mgs, feature_bands_cfg, min_usable)

        if not calibrated:
            # Uncalibrated game evidence
            game_band = "UNCALIBRATED" if game_status == "USABLE" else None

            # Consistency
            if n_usable < min_usable:
                consistency = "INSUFFICIENT"
            else:
                consistency = "NOT_COMPUTED"

            # Relationship
            if sjt_band is None:
                relationship = "INSUFFICIENT"
            elif game_status == "INSUFFICIENT":
                relationship = "SJT_ONLY"
            else:
                relationship = "NOT_COMPUTED"

            # Confidence: uncalibrated game evidence cannot exceed MODERATE
            if sjt_band is None or n_usable <= 1 or has_critical_flag:
                confidence = "LIMITED"
            else:
                confidence = "MODERATE"

        else:
            # Calibrated game evidence
            mg_bands = []
            for mg in usable_mgs:
                feats = mg_features.get(mg, [])
                feat_val = feats[0].value_raw if feats else None
                b = classify_minigame_band(mg, feat_val, feature_bands_cfg.get("bands", {}).get(mg))
                mg_bands.append(b)

            game_band = aggregate_game_bands(usable_mgs, mg_bands, weights)

            # Consistency
            if n_usable < min_usable:
                consistency = "INSUFFICIENT"
            else:
                ords = [BAND_ORDINALS[b] for b in mg_bands if b in BAND_ORDINALS]
                r = (max(ords) - min(ords)) if ords else 0
                consistency = "CONSISTENT" if r <= consistency_max_range else "VARIED"

            # Relationship
            if sjt_band is None:
                relationship = "INSUFFICIENT"
            elif game_status == "INSUFFICIENT":
                relationship = "SJT_ONLY"
            else:
                d = abs(BAND_ORDINALS[sjt_band] - BAND_ORDINALS[game_band])
                if d == 0:
                    relationship = "ALIGNED"
                elif d == 1:
                    relationship = "PARTLY_ALIGNED"
                else:
                    relationship = "DIFFERENT"

            # Confidence
            if sjt_band is None or n_usable <= 1 or has_critical_flag:
                confidence = "LIMITED"
            elif n_usable == 3 and consistency == "CONSISTENT" and not has_critical_flag:
                confidence = "SUBSTANTIAL"
            else:
                confidence = "MODERATE"

        # Observed behavior summary
        if game_status == "USABLE":
            obs_summary = OBSERVED_BEHAVIOR_SUMMARIES.get(
                param_name, "Completed experimental interactive mini-game tasks."
            )
        else:
            obs_summary = "Insufficient behavioral observations."

        # Insert-Only Versioning: supersede old record without rewriting historical content
        curr = existing_by_param.get(param_name)
        next_version = 1
        if curr is not None:
            next_version = curr.version + 1
            curr.is_superseded = True
            curr.superseded_at = now_utc
            db.add(curr)

        new_ev = DBEvidence(
            session_id=session_id,
            parameter=param_name,
            version=next_version,
            is_superseded=False,
            superseded_at=None,
            spec_version="2026-10-v2",
            sjt_version="2026-09-rev",
            scoring_version="1.0-exact-thirds",
            feature_version="1.0",
            config_hash=cfg_hash,
            sjt_raw=sjt_raw,
            sjt_min=sjt_min,
            sjt_max=sjt_max,
            sjt_span=sjt_span,
            sjt_band=sjt_band,
            game_status=game_status,
            game_band=game_band,
            consistency=consistency,
            relationship=relationship,
            confidence=confidence,
            observed_behavior_summary=obs_summary
        )
        db.add(new_ev)
        updated_records.append(new_ev)

    db.commit()
    for ev in updated_records:
        db.refresh(ev)

    return updated_records
