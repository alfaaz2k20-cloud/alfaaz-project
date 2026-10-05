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

LOCKED_HASHES_PATH = resolve_config_path("locked_hashes.json")
PARAMETERS_PATH = resolve_config_path("parameters.json")
SJT_ITEMS_PATH = resolve_config_path("sjt_items.json")

_CACHED_PARAMS = None
_CACHED_SJT = None
_CACHED_CONFIG_HASH = None
_CACHED_RANGES = None

def get_file_hash(path: str) -> str:
    with open(path, "rb") as f:
        return hashlib.sha256(f.read()).hexdigest()

def compute_keys_fingerprint(sjt_data: Dict[str, Any]) -> str:
    obj = {
        "sjt_version": sjt_data.get("sjt_version"),
        "scenario_ids": [s["id"] for s in sjt_data.get("scenarios", [])],
        "options": {
            opt["id"]: opt.get("keys", {})
            for s in sjt_data.get("scenarios", [])
            for opt in s.get("options", [])
        }
    }
    canonical = json.dumps(obj, sort_keys=True, ensure_ascii=False, separators=(',', ':')).encode("utf-8")
    return hashlib.sha256(canonical).hexdigest()

def verify_and_load_configs():
    global _CACHED_PARAMS, _CACHED_SJT, _CACHED_CONFIG_HASH, _CACHED_RANGES
    if _CACHED_PARAMS is not None and _CACHED_SJT is not None:
        return _CACHED_PARAMS, _CACHED_SJT, _CACHED_CONFIG_HASH, _CACHED_RANGES

    if not os.path.exists(LOCKED_HASHES_PATH):
        raise RuntimeError(f"locked_hashes.json missing at {LOCKED_HASHES_PATH}")

    with open(LOCKED_HASHES_PATH, "r", encoding="utf-8") as f:
        locked = json.load(f)

    with open(PARAMETERS_PATH, "rb") as f:
        p_bytes = f.read()
    p_raw_sha = hashlib.sha256(p_bytes).hexdigest()
    p_lf_sha = hashlib.sha256(p_bytes.replace(b"\r\n", b"\n")).hexdigest()
    valid_p_hashes = [locked["parameters_lf_sha256"].lower(), locked["parameters_crlf_sha256"].lower()]
    if p_raw_sha.lower() not in valid_p_hashes and p_lf_sha.lower() not in valid_p_hashes:
        raise RuntimeError(f"parameters.json hash mismatch: raw={p_raw_sha}, lf={p_lf_sha}")

    p_data = json.loads(p_bytes.decode("utf-8"))
    p_canonical = json.dumps(p_data, sort_keys=True, ensure_ascii=False, separators=(',', ':')).encode("utf-8")
    if hashlib.sha256(p_canonical).hexdigest() != locked["parameters_canonical_sha256"]:
        raise RuntimeError("parameters.json canonical hash mismatch")

    with open(SJT_ITEMS_PATH, "rb") as f:
        s_bytes = f.read()
    s_raw_sha = hashlib.sha256(s_bytes).hexdigest()
    s_lf_sha = hashlib.sha256(s_bytes.replace(b"\r\n", b"\n")).hexdigest()
    valid_s_hashes = [locked["sjt_reference_lf_sha256"].lower(), locked["sjt_reference_crlf_sha256"].lower()]
    if s_raw_sha.lower() not in valid_s_hashes and s_lf_sha.lower() not in valid_s_hashes:
        raise RuntimeError(f"sjt_items.json hash mismatch: raw={s_raw_sha}, lf={s_lf_sha}")

    s_data = json.loads(s_bytes.decode("utf-8"))
    s_fp = compute_keys_fingerprint(s_data)
    if s_fp != locked["sjt_keys_fingerprint"]:
        raise RuntimeError(f"sjt_items.json keys fingerprint mismatch: {s_fp}")

    combined = (locked["parameters_lf_sha256"] + locked["sjt_reference_lf_sha256"]).encode("utf-8")
    _CACHED_CONFIG_HASH = hashlib.sha256(combined).hexdigest()

    _CACHED_PARAMS = p_data
    _CACHED_SJT = s_data

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
        sjt_relative = round(num / span, 6) if span > 0 else 0.0

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
            "num": num,
            "sjt_relative": sjt_relative,
            "band": band
        }

    return results
