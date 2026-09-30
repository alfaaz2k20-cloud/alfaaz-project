import os
import json
import hashlib
from typing import Dict, Any, List, Tuple

def resolve_config_path(filename: str) -> str:
    candidates = [
        os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__)))), "config", filename),
        os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "config", filename),
        os.path.join(os.getcwd(), "config", filename),
        os.path.join(os.getcwd(), "..", "config", filename),
    ]
    for c in candidates:
        if os.path.exists(c):
            return os.path.abspath(c)
    return candidates[0]

PARAMETERS_PATH = resolve_config_path("parameters.json")
SJT_ITEMS_PATH = resolve_config_path("sjt_items.json")

EXPECTED_HASHES = {
    "parameters.json": [
        "1262f85b33c6bd64b3331d214363813e218e9fb52efa856cd6342bd6818c70e6",  # LF (Linux/Render)
        "ed4eb65e958a37d45b539470dfe5dc125932651cbc404e68f56fac31bb5bc64e"   # CRLF (Windows)
    ],
    "sjt_items.json": [
        "c098b401d37cc30b515139d307fef632047c048584e19771c0e014ef027e391d",  # LF (Linux/Render)
        "be71fb2f4f0473034dccc5b9affac76ca93a553b50c54c155470ce1b50835890"   # CRLF (Windows)
    ]
}

_CACHED_PARAMS = None
_CACHED_SJT = None
_CACHED_CONFIG_HASH = None
_CACHED_RANGES = None

def get_file_hash(path: str) -> str:
    with open(path, "rb") as f:
        return hashlib.sha256(f.read()).hexdigest()

def verify_and_load_configs():
    global _CACHED_PARAMS, _CACHED_SJT, _CACHED_CONFIG_HASH, _CACHED_RANGES
    if _CACHED_PARAMS is not None and _CACHED_SJT is not None:
        return _CACHED_PARAMS, _CACHED_SJT, _CACHED_CONFIG_HASH, _CACHED_RANGES

    p_hash = get_file_hash(PARAMETERS_PATH)
    s_hash = get_file_hash(SJT_ITEMS_PATH)

    valid_p_hashes = [h.lower() for h in EXPECTED_HASHES["parameters.json"]]
    valid_s_hashes = [h.lower() for h in EXPECTED_HASHES["sjt_items.json"]]

    if p_hash.lower() not in valid_p_hashes:
        raise RuntimeError(f"parameters.json hash mismatch: {p_hash}")
    if s_hash.lower() not in valid_s_hashes:
        raise RuntimeError(f"sjt_items.json hash mismatch: {s_hash}")

    combined = (valid_p_hashes[0] + valid_s_hashes[0]).encode("utf-8")
    _CACHED_CONFIG_HASH = hashlib.sha256(combined).hexdigest()

    with open(PARAMETERS_PATH, "r", encoding="utf-8") as f:
        _CACHED_PARAMS = json.load(f)

    with open(SJT_ITEMS_PATH, "r", encoding="utf-8") as f:
        _CACHED_SJT = json.load(f)

    # Precalculate min, max, span per parameter
    params = list(_CACHED_PARAMS.keys())
    min_scores = {p: 0 for p in params}
    max_scores = {p: 0 for p in params}

    for s in _CACHED_SJT["scenarios"]:
        for p in params:
            vals = [opt["keys"][p] for opt in s["options"]]
            min_scores[p] += min(vals)
            max_scores[p] += max(vals)

    _CACHED_RANGES = {
        p: {
            "min": min_scores[p],
            "max": max_scores[p],
            "span": max_scores[p] - min_scores[p]
        }
        for p in params
    }

    return _CACHED_PARAMS, _CACHED_SJT, _CACHED_CONFIG_HASH, _CACHED_RANGES

def get_config_hash() -> str:
    _, _, config_hash, _ = verify_and_load_configs()
    return config_hash

def get_public_sjt_payload() -> Dict[str, Any]:
    """Returns candidate-safe SJT payload. Keys are strictly omitted."""
    _, sjt_data, config_hash, _ = verify_and_load_configs()
    
    public_scenarios = []
    for s in sjt_data["scenarios"]:
        pub_options = [
            {
                "id": opt["id"],
                "text": opt["text"]
            }
            for opt in s["options"]
        ]
        act_info = s.get("act_title", {})
        public_scenarios.append({
            "id": s["id"],
            "act": s.get("act", 1),
            "act_title_en": act_info.get("en", "") if isinstance(act_info, dict) else str(act_info),
            "act_title_ur": act_info.get("ur", "") if isinstance(act_info, dict) else "",
            "setup": s.get("setup", ""),
            "options": pub_options
        })

    return {
        "sjt_version": sjt_data.get("sjt_version", "2026-09-rev"),
        "config_hash": config_hash,
        "scenarios": public_scenarios
    }

def score_sjt_responses(responses: Dict[str, str]) -> Dict[str, Dict[str, Any]]:
    """
    Scores SJT responses using exact integer arithmetic.
    responses: Dict[scenario_id, option_id], e.g. {"S1": "S1B", "S2": "S2A", ...}
    """
    params_data, sjt_data, _, ranges = verify_and_load_configs()
    params = list(params_data.keys())

    # Build lookup map: (scenario_id, option_id) -> keys
    option_key_map = {}
    for s in sjt_data["scenarios"]:
        for opt in s["options"]:
            option_key_map[(s["id"], opt["id"])] = opt["keys"]

    raw_scores = {p: 0 for p in params}

    for scenario in sjt_data["scenarios"]:
        s_id = scenario["id"]
        if s_id not in responses:
            raise ValueError(f"Missing response for scenario {s_id}")
        opt_id = responses[s_id]
        key_tuple = (s_id, opt_id)
        if key_tuple not in option_key_map:
            raise ValueError(f"Invalid option {opt_id} for scenario {s_id}")
        
        opt_keys = option_key_map[key_tuple]
        for p in params:
            raw_scores[p] += opt_keys[p]

    results = {}
    for p in params:
        raw = raw_scores[p]
        p_min = ranges[p]["min"]
        p_max = ranges[p]["max"]
        span = ranges[p]["span"]
        num = raw - p_min

        if span == 0:
            band = "UNAVAILABLE"
        elif 3 * num >= 2 * span:
            band = "HIGH"
        elif 3 * num >= span:
            band = "MODERATE"
        else:
            band = "LOW"

        results[p] = {
            "raw": raw,
            "min": p_min,
            "max": p_max,
            "span": span,
            "band": band
        }

    return results
