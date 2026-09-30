import json
import itertools
import hashlib
import os

PARAMETERS_PATH = os.path.join("config", "parameters.json")
SJT_ITEMS_PATH = os.path.join("config", "sjt_items.json")
OUTPUT_PATH = os.path.join("docs", "sjt_enumeration.json")

EXPECTED_HASHES = {
    "parameters.json": [
        "1262f85b33c6bd64b3331d214363813e218e9fb52efa856cd6342bd6818c70e6",
        "ed4eb65e958a37d45b539470dfe5dc125932651cbc404e68f56fac31bb5bc64e"
    ],
    "sjt_items.json": [
        "91a5b9934ff13a94164cbdb956b1dc8de8d163fbf1e93b024710aacbdb76bc14",
        "cfd2e4da886c03211beddf13e2ff47c1e3e2bd95068f413238f1f3394b9e39b6"
    ]
}

def verify_hashes():
    for filename, expected in EXPECTED_HASHES.items():
        path = os.path.join("config", filename)
        with open(path, "rb") as f:
            computed = hashlib.sha256(f.read()).hexdigest()
        valid = [e.lower() for e in expected] if isinstance(expected, list) else [expected.lower()]
        if computed.lower() not in valid:
            raise ValueError(f"Hash mismatch for {filename}: got {computed}, expected {expected}")

def compute_sjt_enumeration():
    verify_hashes()
    
    with open(PARAMETERS_PATH, "r", encoding="utf-8") as f:
        params_data = json.load(f)
    params = list(params_data.keys())
    
    with open(SJT_ITEMS_PATH, "r", encoding="utf-8") as f:
        sjt_data = json.load(f)
    
    scenarios = sjt_data["scenarios"]
    
    # Calculate min, max, span per parameter across scenarios
    min_scores = {p: 0 for p in params}
    max_scores = {p: 0 for p in params}
    
    for s in scenarios:
        for p in params:
            vals = [opt["keys"][p] for opt in s["options"]]
            min_scores[p] += min(vals)
            max_scores[p] += max(vals)
            
    span_scores = {p: max_scores[p] - min_scores[p] for p in params}
    
    # Enumeration over all 4^7 = 16,384 combinations
    scenario_options = [s["options"] for s in scenarios]
    all_combinations = list(itertools.product(*scenario_options))
    total_patterns = len(all_combinations)
    
    band_counts = {p: {"LOW": 0, "MODERATE": 0, "HIGH": 0} for p in params}
    high_bands_per_pattern = {i: 0 for i in range(8)}
    low_bands_per_pattern = {i: 0 for i in range(8)}
    sum_distribution = {}
    
    for combo in all_combinations:
        combo_raw = {p: 0 for p in params}
        for opt in combo:
            for p in params:
                combo_raw[p] += opt["keys"][p]
                
        total_raw_sum = sum(combo_raw.values())
        sum_distribution[total_raw_sum] = sum_distribution.get(total_raw_sum, 0) + 1
        
        high_count = 0
        low_count = 0
        
        for p in params:
            raw = combo_raw[p]
            span = span_scores[p]
            num = raw - min_scores[p]
            
            # Exact integer arithmetic
            if 3 * num >= 2 * span:
                band = "HIGH"
                high_count += 1
            elif 3 * num >= span:
                band = "MODERATE"
            else:
                band = "LOW"
                low_count += 1
                
            band_counts[p][band] += 1
            
        high_bands_per_pattern[high_count] += 1
        low_bands_per_pattern[low_count] += 1
        
    band_percentages = {}
    for p in params:
        band_percentages[p] = {
            band: round((count / total_patterns) * 100, 1)
            for band, count in band_counts[p].items()
        }
        
    result = {
        "sjt_version": sjt_data.get("sjt_version", "2026-09-rev"),
        "total_patterns": total_patterns,
        "parameters": params,
        "score_ranges": {
            p: {
                "min": min_scores[p],
                "max": max_scores[p],
                "span": span_scores[p]
            }
            for p in params
        },
        "band_counts": band_counts,
        "band_percentages": band_percentages,
        "high_bands_per_pattern": high_bands_per_pattern,
        "low_bands_per_pattern": low_bands_per_pattern,
        "raw_sum_distribution": sum_distribution
    }
    
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(result, f, indent=2)
        
    print("SJT Enumeration completed successfully. Output written to docs/sjt_enumeration.json")
    print("\n--- GOLDEN SUMMARY ---")
    for p in params:
        sr = result["score_ranges"][p]
        bp = result["band_percentages"][p]
        print(f"{p:22} | min:{sr['min']:2} max:{sr['max']:2} span:{sr['span']:2} | LOW:{bp['LOW']:4.1f}% MOD:{bp['MODERATE']:4.1f}% HIGH:{bp['HIGH']:4.1f}%")
    print(f"\nMax HIGH bands observed in any pattern: {max(k for k, v in high_bands_per_pattern.items() if v > 0)}")
    return result

if __name__ == "__main__":
    compute_sjt_enumeration()
