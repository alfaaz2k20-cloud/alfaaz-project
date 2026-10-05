import os
import json
import math
from typing import Dict, Any, List, Optional, Tuple
from recruit_system.models.recruit import DBFeature
from recruit_system.services.sjt_engine import resolve_config_path

DEFAULT_MODEL_ARTIFACT_REL_PATH = os.path.join("models", "relative_ridge_v1.json")
_MODEL_ARTIFACT_CACHE: Optional[Dict[str, Any]] = None


def resolve_model_path(rel_path: str = DEFAULT_MODEL_ARTIFACT_REL_PATH) -> str:
    candidates = [
        os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__)))), "config", rel_path),
        os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "config", rel_path),
        os.path.join(os.getcwd(), "config", rel_path),
        os.path.join(os.getcwd(), "..", "config", rel_path),
        os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "backend", "config", rel_path),
    ]
    for c in candidates:
        if os.path.exists(c):
            return os.path.abspath(c)
    return candidates[0]


def load_model_artifact(artifact_path: Optional[str] = None) -> Dict[str, Any]:
    global _MODEL_ARTIFACT_CACHE
    if _MODEL_ARTIFACT_CACHE is not None and artifact_path is None:
        return _MODEL_ARTIFACT_CACHE

    target_path = artifact_path or resolve_model_path()
    if not os.path.exists(target_path):
        return {
            "model_id": "none",
            "model_version": "none",
            "status": "NOT_AVAILABLE",
            "parameters": {}
        }

    try:
        with open(target_path, "r", encoding="utf-8") as f:
            data = json.load(f)
            if artifact_path is None:
                _MODEL_ARTIFACT_CACHE = data
            return data
    except Exception as e:
        print(f"[RegressionEngine] Failed to load model artifact from {target_path}: {e}")
        return {
            "model_id": "error",
            "model_version": "error",
            "status": "NOT_AVAILABLE",
            "parameters": {}
        }


def standardize_feature(
    val: float,
    mean: float,
    sd: float,
    direction: str = "POSITIVE"
) -> float:
    """
    Standardizes a feature using frozen training-data mean and sd.
    If direction == 'NEGATIVE', inverts z-score so higher value aligns with construct.
    """
    if sd <= 1e-9:
        z = 0.0
    else:
        z = (val - mean) / sd

    if direction == "NEGATIVE":
        z = -z
    return z


def predict_parameter_relative(
    param_name: str,
    features: List[DBFeature],
    model_artifact: Optional[Dict[str, Any]] = None
) -> Tuple[Optional[float], str, Dict[str, Any]]:
    """
    Computes game-predicted SJT-aligned relative target for a single parameter.
    
    Returns:
        (predicted_value, prediction_status, metadata)
        
    Prediction statuses:
        AVAILABLE: Model is active and successfully predicted from usable features.
        NOT_AVAILABLE: Model is untrained, uncalibrated, or artifact missing.
        INSUFFICIENT: Required features are missing or invalid.
    """
    artifact = model_artifact or load_model_artifact()
    param_cfg = artifact.get("parameters", {}).get(param_name)

    metadata: Dict[str, Any] = {
        "model_id": artifact.get("model_id", "none"),
        "model_version": artifact.get("model_version", "none"),
        "is_active": False,
        "feature_schema_version": artifact.get("feature_schema_version", "1.0"),
        "status": "NOT_AVAILABLE"
    }

    if not param_cfg or not param_cfg.get("is_active", False):
        metadata["status"] = param_cfg.get("status", "NOT_AVAILABLE") if param_cfg else "NOT_AVAILABLE"
        return None, "NOT_AVAILABLE", metadata

    metadata["is_active"] = True
    coefficients: Dict[str, float] = param_cfg.get("coefficients", {})
    means: Dict[str, float] = param_cfg.get("feature_means", {})
    sds: Dict[str, float] = param_cfg.get("feature_sds", {})
    directions: Dict[str, str] = param_cfg.get("feature_directions", {})
    intercept: float = float(param_cfg.get("intercept", 0.5))

    # Check that required features are present and valid
    feature_map = {f.feature_name: f for f in features if f.valid and f.value_raw is not None}
    
    missing_required = [fn for fn in coefficients.keys() if fn not in feature_map]
    if missing_required:
        metadata["status"] = "INSUFFICIENT"
        metadata["missing_features"] = missing_required
        return None, "INSUFFICIENT", metadata

    # Linear prediction on standardized features
    pred = intercept
    used_features = {}
    for fn, coef in coefficients.items():
        feat = feature_map[fn]
        raw_val = float(feat.value_raw)
        m = means.get(fn, 0.0)
        s = sds.get(fn, 1.0)
        d = directions.get(fn, "POSITIVE")
        z = standardize_feature(raw_val, m, s, d)
        pred += coef * z
        used_features[fn] = {
            "raw": raw_val,
            "standardized": round(z, 4),
            "coefficient": coef,
            "direction": d
        }

    # Bounded to theoretical SJT relative space [0.0, 1.0]
    if math.isnan(pred) or math.isinf(pred):
        metadata["status"] = "INVALID"
        return None, "INVALID", metadata

    final_val = max(0.0, min(1.0, pred))
    metadata["status"] = "AVAILABLE"
    metadata["intercept"] = intercept
    metadata["features_used"] = used_features

    return round(final_val, 6), "AVAILABLE", metadata


# --------------------------------------------------------------------------
# Pure Python Ridge Regression Trainer & Cross-Validator
# --------------------------------------------------------------------------
def _solve_ridge(X: List[List[float]], y: List[float], alpha: float) -> Tuple[float, List[float]]:
    """
    Fits Ridge regression: y = b0 + X * b with L2 penalty alpha * sum(b^2).
    Pure python implementation without external dependency.
    Centering trick: center X and y, solve (X_c^T X_c + alpha * I) b = X_c^T y_c, b0 = y_bar - X_bar * b.
    """
    n = len(y)
    p = len(X[0])
    
    # Means
    y_mean = sum(y) / n
    x_means = [sum(X[i][j] for i in range(n)) / n for j in range(p)]
    
    # Centered X and y
    Xc = [[X[i][j] - x_means[j] for j in range(p)] for i in range(n)]
    yc = [y[i] - y_mean for i in range(n)]
    
    # XtX = Xc^T * Xc
    XtX = [[sum(Xc[i][j] * Xc[i][k] for i in range(n)) for k in range(p)] for j in range(p)]
    # Add alpha to diagonal
    for j in range(p):
        XtX[j][j] += alpha
        
    # Xty = Xc^T * yc
    Xty = [sum(Xc[i][j] * yc[i] for i in range(n)) for j in range(p)]
    
    # Solve XtX * b = Xty via Gaussian elimination with partial pivoting
    A = [row[:] for row in XtX]
    b_vec = Xty[:]
    for i in range(p):
        # Pivot
        max_row = max(range(i, p), key=lambda r: abs(A[r][i]))
        if abs(A[max_row][i]) < 1e-12:
            continue
        A[i], A[max_row] = A[max_row], A[i]
        b_vec[i], b_vec[max_row] = b_vec[max_row], b_vec[i]
        
        pivot = A[i][i]
        for col in range(i, p):
            A[i][col] /= pivot
        b_vec[i] /= pivot
        
        for r in range(p):
            if r != i:
                factor = A[r][i]
                for col in range(i, p):
                    A[r][col] -= factor * A[i][col]
                b_vec[r] -= factor * b_vec[i]
                
    coefficients = b_vec
    intercept = y_mean - sum(x_means[j] * coefficients[j] for j in range(p))
    return intercept, coefficients


# Public alias
solve_ridge_regression = _solve_ridge

