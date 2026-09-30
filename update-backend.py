import re

with open('backend/app/routers/volunteers.py', 'r', encoding='utf-8') as f:
    code = f.read()

new_interp = '''
def generate_interpretations(assessment_id: str, db: Session):
    assessment = db.query(DBAssessment).filter(DBAssessment.id == assessment_id).first()
    if not assessment: return

    # Try to parse the new hybrid payload from notes
    try:
        import json
        payload = json.loads(assessment.notes)
        if "sjtResponses" in payload:
            is_hybrid = True
        else:
            is_hybrid = False
    except:
        is_hybrid = False

    db.query(DBConstructEvidence).filter(DBConstructEvidence.assessment_id == assessment_id).delete()

    if is_hybrid:
        # Interpret the new sequence format
        c1 = payload.get("metricsC1", {})
        c2 = payload.get("metricsC2", {})
        sjt = payload.get("sjtResponses", [])
        
        # Calculate Reliability
        is_reliable = payload.get("isReliable", False)
        motor = payload.get("motorBaselineMs", 0)
        
        # We can map the SJT tags
        sjt_tag_counts = {}
        for resp in sjt:
            for tag in resp.get("tags", []):
                sjt_tag_counts[tag] = sjt_tag_counts.get(tag, 0) + 1
        
        constructs = [
            {
                "name": "Cognitive Baseline",
                "desc": f"Motor Latency: {motor:.0f}ms. Working Memory Peak: {c1.get('wmPeak', 0)} nodes. Inhibition Limit: {c1.get('sabLimit', 0)}ms.",
                "sup": 5 if is_reliable else 2,
                "ctr": 0 if is_reliable else 3,
                "conf": "High"
            },
            {
                "name": "Fatigue Degradation (Reliability)",
                "desc": f"Shift in Error Rate: {c2.get('stroopErr', 0) - c1.get('stroopErr', 0)}. Shift in Memory Span: {c2.get('wmPeak', 0) - c1.get('wmPeak', 0)}.",
                "sup": 5 if is_reliable else 1,
                "ctr": 0 if is_reliable else 4,
                "conf": "High"
            },
            {
                "name": "Situational Empathy",
                "desc": f"Explicitly selected empathic responses in {sjt_tag_counts.get('empathy', 0)} scenarios.",
                "sup": sjt_tag_counts.get('empathy', 0),
                "ctr": 0,
                "conf": "Moderate"
            },
            {
                "name": "Collaborative Spirit",
                "desc": f"Explicitly prioritized collaboration in {sjt_tag_counts.get('collaborative', 0)} scenarios.",
                "sup": sjt_tag_counts.get('collaborative', 0),
                "ctr": 0,
                "conf": "Moderate"
            },
            {
                "name": "Creative Initiative",
                "desc": f"Chose creative compromises in {sjt_tag_counts.get('creative', 0)} scenarios. Risk Intensity (BART): {c1.get('bartAvg', 0):.1f}",
                "sup": sjt_tag_counts.get('creative', 0),
                "ctr": 0,
                "conf": "Moderate"
            },
            {
                "name": "Emotional Agility",
                "desc": f"Chose emotionally agile responses in {sjt_tag_counts.get('emotional', 0)} scenarios. Go/NoGo Limit: {c1.get('sabLimit', 0)}ms.",
                "sup": sjt_tag_counts.get('emotional', 0),
                "ctr": 0,
                "conf": "Moderate"
            },
            {
                "name": "Conscientiousness",
                "desc": f"Chose structured/dutiful responses in {sjt_tag_counts.get('conscientiousness', 0)} scenarios.",
                "sup": sjt_tag_counts.get('conscientiousness', 0),
                "ctr": 0,
                "conf": "Moderate"
            }
        ]
        
        for c in constructs:
            ev = DBConstructEvidence(
                assessment_id=assessment_id,
                construct=c["name"],
                supporting_count=c["sup"],
                counter_count=c["ctr"],
                context_count=len(sjt),
                confidence=c["conf"],
                interpretation=c["desc"]
            )
            db.add(ev)
    else:
        # Fallback to the old tag-based interpretation if no payload is present (or old data)
        pass # we can ignore old data for now to keep the code simple, or restore the old logic here.
'''

# We will just replace the whole generate_interpretations function 
code = re.sub(r'def generate_interpretations\(.*?db\.query\(DBRoleFit\)', new_interp + '\n    db.query(DBRoleFit)', code, flags=re.DOTALL)

with open('backend/app/routers/volunteers.py', 'w', encoding='utf-8') as f:
    f.write(code)

print("Updated backend")
