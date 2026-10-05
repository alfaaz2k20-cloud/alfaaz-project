import os
import json
from typing import Dict, Any, List, Optional, Tuple
from datetime import datetime, timezone
from sqlmodel import Session, select
from app.models.recruit import (
    DBEvidence, DBSession, DBDataQualityFlag, DBSJTResponse, DBGameScore
)
from app.services.sjt_engine import score_sjt_responses, resolve_config_path
from app.services.game_scoring_engine import (
    score_session_games, ScoredGame, SCORING_VERSION as GAME_SCORING_VERSION
)

# Locked seven parameters and mini-game mapping
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
DEFAULT_CONFIG_HASH = "f9026b9c50ad4a7c65b3108b2b3321b8c4daece85a1402274d9f342374cf0397"


def load_integration_config() -> Dict[str, Any]:
    path = resolve_config_path("integration.json")
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    return {
        "min_usable_minigames": 2,
        "consistency_max_spread": 0.33,
        "minigame_weights": {mg: 1.0 / 3.0 for p_mgs in PARAM_MINIGAMES.values() for mg in p_mgs}
    }


def load_feature_bands_config() -> Dict[str, Any]:
    path = resolve_config_path("feature_bands.json")
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    return {"calibration_status": "NOT_ESTABLISHED", "bands": {}}


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


BAND_ORDINALS = {"LOW": 0, "MODERATE": 1, "HIGH": 2}
ORDINAL_BANDS = {0: "LOW", 1: "MODERATE", 2: "HIGH"}


def evaluate_minigame_status(
    mg: str,
    mg_feats: List[Any],
    quality_flags: List[Any]
) -> str:
    """
    Evaluates mini-game status: USABLE, INSUFFICIENT, or INVALID.
    Never convert INSUFFICIENT or INVALID into a LOW band.
    """
    if not mg_feats:
        return "INSUFFICIENT"

    feature_flags = set()
    for f in mg_feats:
        flags_json = getattr(f, "flags_json", None)
        if flags_json:
            try:
                fl = json.loads(flags_json)
                if isinstance(fl, list):
                    feature_flags.update(fl)
            except Exception:
                pass

    mg_scoped_flags = [getattr(qf, "flag", None) for qf in quality_flags if getattr(qf, "scope", None) == mg]

    # 1. Integrity violations make the game INVALID
    integrity_flags = {"seq_gap", "seq_conflict", "invalid_timing", "events_cap_reached"}
    if any(fl in integrity_flags for fl in feature_flags) or any(fl in integrity_flags for fl in mg_scoped_flags):
        return "INVALID"

    # 2. Check for insufficiency (not implemented, interrupted, insufficient observations)
    if "feature_not_implemented" in feature_flags:
        return "INSUFFICIENT"

    if "interrupted" in feature_flags or any(fl == "interrupted" for fl in mg_scoped_flags):
        return "INSUFFICIENT"

    if any(fl.lower().startswith("insufficient") for fl in feature_flags):
        return "INSUFFICIENT"

    # Check validity and presence of values
    if any(not getattr(f, "valid", True) or getattr(f, "value_raw", None) is None for f in mg_feats):
        return "INSUFFICIENT"

    return "USABLE"


def classify_minigame_band(mg: str, feat_val: Optional[float], band_def: Any) -> Optional[str]:
    """
    Evaluates a mini-game feature value against a calibrated band definition.
    Only called when empirical calibration is established.
    """
    if feat_val is None or band_def is None:
        return None
    if isinstance(band_def, str) and band_def in BAND_ORDINALS:
        return band_def
    if isinstance(band_def, dict):
        if "LOW" in band_def and "HIGH" in band_def and not isinstance(band_def["LOW"], list):
            low_cutoff = band_def["LOW"]
            high_cutoff = band_def["HIGH"]
            if feat_val < low_cutoff:
                return "LOW"
            elif feat_val >= high_cutoff:
                return "HIGH"
            else:
                return "MODERATE"
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


def compute_cross_method_delta(
    sjt_relative: Optional[float],
    game_relative: Optional[float]
) -> Optional[float]:
    """
    Computes continuous Cross-Method Delta: |sjt_relative - game_relative|.
    Both inputs are in the common parameter-relative space [0.0, 1.0].
    """
    if sjt_relative is not None and game_relative is not None:
        return round(abs(sjt_relative - game_relative), 6)
    return None


def determine_relationship(
    delta: Optional[float],
    has_sjt: bool,
    game_status: str
) -> str:
    """
    Determines continuous Delta-based Cross-Method Relationship:
    - delta <= 0.15 -> ALIGNED
    - 0.15 < delta <= 0.30 -> PARTLY_ALIGNED
    - delta > 0.30 -> DIFFERENT
    - SJT missing -> NOT_AVAILABLE
    - Games insufficient (< 2 usable) -> NOT_ENOUGH_EVIDENCE
    """
    if not has_sjt:
        return "NOT_AVAILABLE"
    if game_status == "INSUFFICIENT":
        return "NOT_ENOUGH_EVIDENCE"
    if delta is None:
        return "NOT_AVAILABLE"

    if delta <= 0.15:
        return "ALIGNED"
    elif delta <= 0.30:
        return "PARTLY_ALIGNED"
    else:
        return "DIFFERENT"


def determine_confidence(
    has_sjt: bool,
    n_usable_games: int,
    consistency: str,
    delta: Optional[float],
    has_critical_flag: bool
) -> str:
    """
    Calculates evidence confidence enforcing the Monotonicity Invariant:
    LARGER DELTA MUST NEVER INCREASE CONFIDENCE.

    Base confidence before Delta:
    - SJT missing or < 2 usable games: LIMITED
    - 3 usable games AND CONSISTENT AND no critical flag: SUBSTANTIAL
    - otherwise: MODERATE

    Delta penalty (strictly non-increasing):
    - delta <= 0.15: no downgrade
    - 0.15 < delta <= 0.30: confidence cannot exceed MODERATE
    - delta > 0.30: confidence = LIMITED

    Critical flags always force LIMITED.
    """
    if has_critical_flag or not has_sjt or n_usable_games < 2:
        return "LIMITED"

    if n_usable_games == 3 and consistency == "CONSISTENT":
        base_confidence = "SUBSTANTIAL"
    else:
        base_confidence = "MODERATE"

    if delta is not None:
        if delta <= 0.15:
            conf = base_confidence
        elif delta <= 0.30:
            conf = "MODERATE" if base_confidence == "SUBSTANTIAL" else base_confidence
        else:  # delta > 0.30
            conf = "LIMITED"
    else:
        conf = "LIMITED"

    return conf


def integrate_session_evidence(
    db: Session,
    session_id: str,
    force_recompute: bool = False,
    feature_bands_override: Optional[Dict[str, Any]] = None,
    integration_override: Optional[Dict[str, Any]] = None
) -> List[DBEvidence]:
    """
    Computes integrated evidence records per parameter from SJT responses and
    deterministic Game-SJT scoring.
    
    Live architecture:
    - 21 games scored deterministically via game_scoring_engine
    - Parameter-level game aggregation with renormalized weights
    - Common parameter-relative space [0.0, 1.0] for both SJT and Games
    - Continuous Cross-Method Delta = |sjt_relative - game_relative|
    - Monotonic confidence logic: larger Delta never increases confidence
    - Insert-only evidence persistence with versioning and superseded tracking.
    """
    existing_records = db.exec(
        select(DBEvidence).where(
            DBEvidence.session_id == session_id,
            DBEvidence.is_superseded == False
        )
    ).all()
    existing_by_param = {rec.parameter: rec for rec in existing_records}

    if not force_recompute and len(existing_by_param) == len(PARAM_MINIGAMES):
        return [existing_by_param[p] for p in PARAM_MINIGAMES.keys() if p in existing_by_param]

    # Load configurations
    integration_cfg = integration_override or load_integration_config()
    cfg_hash = load_config_hash()

    min_usable = integration_cfg.get("min_usable_minigames", 2)
    weights = integration_cfg.get("minigame_weights", {})

    # Data quality flags & critical flag check
    quality_flags = db.exec(
        select(DBDataQualityFlag).where(DBDataQualityFlag.session_id == session_id)
    ).all()
    has_critical_flag = any(qf.flag in CRITICAL_FLAGS for qf in quality_flags)

    # 1. Score all 21 games deterministically
    game_scores: Dict[str, ScoredGame] = score_session_games(db, session_id)

    # 2. SJT responses & scoring
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
        if not any(qf.flag == "sjt_missing" for qf in quality_flags):
            sjt_missing_flag = DBDataQualityFlag(
                session_id=session_id,
                scope="session",
                flag="sjt_missing",
                detail="SJT responses missing or incomplete"
            )
            db.add(sjt_missing_flag)

    now_utc = datetime.now(timezone.utc)

    # Pass 1: Parameter-level preliminary evidence & Game-SJT aggregation
    preliminary: Dict[str, Dict[str, Any]] = {}

    for param_name, mgs in PARAM_MINIGAMES.items():
        # Identify usable games
        usable_mgs = [
            mg for mg in mgs
            if game_scores.get(mg) and game_scores[mg].status == "USABLE" and game_scores[mg].relative is not None
        ]
        n_usable = len(usable_mgs)

        # SJT score for this parameter
        param_sjt = sjt_scores.get(param_name)
        if param_sjt:
            sjt_raw = param_sjt["raw"]
            sjt_min = param_sjt["min"]
            sjt_max = param_sjt["max"]
            sjt_span = param_sjt["span"]
            sjt_num = param_sjt.get("num", sjt_raw - sjt_min)
            sjt_relative = param_sjt.get("sjt_relative", round(sjt_num / sjt_span, 6) if sjt_span > 0 else 0.5)
            sjt_band = param_sjt["band"]
            has_sjt_for_param = True
        else:
            sjt_raw = None
            sjt_min = None
            sjt_max = None
            sjt_span = None
            sjt_num = None
            sjt_relative = None
            sjt_band = None
            has_sjt_for_param = False

        # Game Evidence Aggregation
        if n_usable >= min_usable:
            game_status = "USABLE"
            # Renormalize weights across usable games
            w_usable = [weights.get(mg, 1.0 / 3.0) for mg in usable_mgs]
            w_sum = sum(w_usable)
            if w_sum <= 0:
                w_sum = 1.0
            norm_w = [w / w_sum for w in w_usable]

            game_relative = round(
                sum(w * game_scores[mg].relative for w, mg in zip(norm_w, usable_mgs)),
                6
            )
            game_raw = sum(game_scores[mg].raw for mg in usable_mgs)
            game_min = sum(game_scores[mg].min for mg in usable_mgs)
            game_max = sum(game_scores[mg].max for mg in usable_mgs)
            game_span = game_max - game_min
            game_num = game_raw - game_min
            game_observation_count = sum(game_scores[mg].observation_count for mg in usable_mgs)

            # Within-parameter game consistency spread
            mg_relatives = [game_scores[mg].relative for mg in usable_mgs]
            game_consistency_spread = round(max(mg_relatives) - min(mg_relatives), 6)
            consistency = "CONSISTENT" if game_consistency_spread <= 0.33 else "VARIED"
            game_band = "UNCALIBRATED"
        else:
            game_status = "INSUFFICIENT"
            game_raw = None
            game_min = None
            game_max = None
            game_span = None
            game_num = None
            game_relative = None
            game_band = None
            game_observation_count = sum(
                game_scores[mg].observation_count for mg in mgs if game_scores.get(mg)
            )
            game_consistency_spread = None
            consistency = "INSUFFICIENT"

        # Continuous Cross-Method Delta
        delta = compute_cross_method_delta(sjt_relative, game_relative)

        # Cross-Method Relationship
        relationship = determine_relationship(delta, has_sjt_for_param, game_status)

        # Evidence Confidence with Monotonicity Invariant
        confidence = determine_confidence(
            has_sjt=has_sjt_for_param,
            n_usable_games=n_usable,
            consistency=consistency,
            delta=delta,
            has_critical_flag=has_critical_flag
        )

        # Combined Relative Evidence (preserving both streams explicitly)
        if sjt_relative is not None and game_relative is not None:
            fused_relative = round((sjt_relative + game_relative) / 2.0, 6)
        elif sjt_relative is not None:
            fused_relative = sjt_relative
        elif game_relative is not None:
            fused_relative = game_relative
        else:
            fused_relative = None

        if game_status == "USABLE":
            obs_summary = OBSERVED_BEHAVIOR_SUMMARIES.get(
                param_name, "Completed experimental interactive mini-game tasks."
            )
        else:
            obs_summary = "Insufficient behavioral observations."

        preliminary[param_name] = {
            "sjt_raw": sjt_raw,
            "sjt_min": sjt_min,
            "sjt_max": sjt_max,
            "sjt_span": sjt_span,
            "sjt_num": sjt_num,
            "sjt_relative": sjt_relative,
            "sjt_band": sjt_band,
            "game_raw": game_raw,
            "game_min": game_min,
            "game_max": game_max,
            "game_span": game_span,
            "game_num": game_num,
            "game_relative": game_relative,
            "game_observation_count": game_observation_count,
            "game_consistency_spread": game_consistency_spread,
            "game_status": game_status,
            "game_band": game_band,
            "cross_method_delta": delta,
            "fused_relative": fused_relative,
            "consistency": consistency,
            "relationship": relationship,
            "confidence": confidence,
            "observed_behavior_summary": obs_summary,
            "n_usable": n_usable
        }

    # Pass 2: Profile Completeness and Within-Person 0-100 Relative Profile
    n_sjt_present = sum(1 for p in PARAM_MINIGAMES if preliminary[p]["sjt_relative"] is not None)
    n_games_usable = sum(1 for p in PARAM_MINIGAMES if preliminary[p]["game_status"] == "USABLE")

    if n_sjt_present == 7 and n_games_usable == 7:
        profile_completeness = "COMPLETE"
    elif n_sjt_present == 7 and n_games_usable > 0:
        profile_completeness = "PARTIAL"
    elif n_sjt_present == 7:
        profile_completeness = "SJT_ONLY"
    else:
        profile_completeness = "INSUFFICIENT"

    valid_fused = [
        preliminary[p]["fused_relative"]
        for p in PARAM_MINIGAMES
        if preliminary[p]["fused_relative"] is not None
    ]

    profile_scores: Dict[str, Optional[float]] = {}
    profile_ranks: Dict[str, Optional[int]] = {}
    profile_levels: Dict[str, Optional[str]] = {}

    if len(valid_fused) < 2:
        for p in PARAM_MINIGAMES:
            profile_scores[p] = None
            profile_ranks[p] = None
            profile_levels[p] = "INSUFFICIENT"
    else:
        f_min = min(valid_fused)
        f_max = max(valid_fused)
        f_span = f_max - f_min

        if f_span < 1e-9:
            # Edge case: All values identical across parameters
            for p in PARAM_MINIGAMES:
                if preliminary[p]["fused_relative"] is not None:
                    profile_scores[p] = 50.0
                    profile_ranks[p] = 1
                    profile_levels[p] = "ABOUT_EQUAL"
                else:
                    profile_scores[p] = None
                    profile_ranks[p] = None
                    profile_levels[p] = "INSUFFICIENT"
        else:
            for p in PARAM_MINIGAMES:
                v = preliminary[p]["fused_relative"]
                if v is not None:
                    sc = round(100.0 * (v - f_min) / f_span, 2)
                    profile_scores[p] = sc

                    if sc >= 67.0:
                        lvl = "RELATIVELY_STRONG"
                    elif sc <= 33.0:
                        lvl = "RELATIVELY_LOWER"
                    else:
                        lvl = "RELATIVELY_MIDDLE"
                    profile_levels[p] = lvl

                    # Standard competition ranking (1 = highest score; ties share rank)
                    rank = 1 + sum(1 for other_v in valid_fused if other_v > v + 1e-9)
                    profile_ranks[p] = rank
                else:
                    profile_scores[p] = None
                    profile_ranks[p] = None
                    profile_levels[p] = "INSUFFICIENT"

    # Pass 3: Insert-Only Evidence Persistence
    updated_records: List[DBEvidence] = []

    for param_name in PARAM_MINIGAMES.keys():
        p_data = preliminary[param_name]

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
            scoring_version=GAME_SCORING_VERSION,
            feature_version="1.0",
            config_hash=cfg_hash,
            sjt_raw=p_data["sjt_raw"],
            sjt_min=p_data["sjt_min"],
            sjt_max=p_data["sjt_max"],
            sjt_span=p_data["sjt_span"],
            sjt_num=p_data["sjt_num"],
            sjt_relative=p_data["sjt_relative"],
            sjt_band=p_data["sjt_band"],
            predicted_sjt_relative=None,  # Deactivated in favor of game_relative
            model_version="historical_deactivated",
            prediction_status="DEACTIVATED_IN_FAVOR_OF_GAME_SJT",
            game_raw=p_data["game_raw"],
            game_min=p_data["game_min"],
            game_max=p_data["game_max"],
            game_span=p_data["game_span"],
            game_num=p_data["game_num"],
            game_relative=p_data["game_relative"],
            game_observation_count=p_data["game_observation_count"],
            game_consistency_spread=p_data["game_consistency_spread"],
            cross_method_delta=p_data["cross_method_delta"],
            fused_relative=p_data["fused_relative"],
            profile_relative_score=profile_scores.get(param_name),
            profile_relative_rank=profile_ranks.get(param_name),
            profile_relative_level=profile_levels.get(param_name),
            profile_completeness=profile_completeness,
            game_status=p_data["game_status"],
            game_band=p_data["game_band"],
            consistency=p_data["consistency"],
            relationship=p_data["relationship"],
            confidence=p_data["confidence"],
            observed_behavior_summary=p_data["observed_behavior_summary"]
        )
        db.add(new_ev)
        updated_records.append(new_ev)

    db.commit()
    for ev in updated_records:
        db.refresh(ev)

    return updated_records
