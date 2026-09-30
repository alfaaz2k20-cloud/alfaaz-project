import re

with open('backend/app/routers/volunteers.py', 'r', encoding='utf-8') as f:
    code = f.read()

new_logic = '''
def generate_interpretations(assessment_id: str, db: Session):
    events = db.query(DBAssessmentEvent).filter(DBAssessmentEvent.assessment_id == assessment_id).all()
    observations = db.query(DBBehavioralObservation).filter(DBBehavioralObservation.assessment_id == assessment_id).all()

    # Build a tag index: { tag_name: [{ direction, strength, context }, ...] }
    tag_index = {}
    for obs in observations:
        tag_index.setdefault(obs.behavior_tag, []).append({
            "direction": obs.direction,
            "strength": obs.strength or 1.0,
            "context": obs.context or ""
        })

    def score_construct(positive_tags, negative_tags):
        supporting = 0
        counter = 0
        for tag in positive_tags:
            for entry in tag_index.get(tag, []):
                if entry["direction"] in ["positive", "neutral"]:
                    supporting += entry["strength"]
                elif entry["direction"] == "negative":
                    counter += entry["strength"]
        for tag in negative_tags:
            for entry in tag_index.get(tag, []):
                if entry["direction"] in ["positive", "neutral"]:
                    counter += entry["strength"]
                elif entry["direction"] == "negative":
                    supporting += entry["strength"]
        total = supporting + counter
        confidence = "Insufficient Data"
        if total >= 6: confidence = "High"
        elif total >= 3: confidence = "Moderate"
        elif total >= 1: confidence = "Low"
        return int(supporting), int(counter), int(total), confidence

    constructs = [
        {
            "name": "Empathy",
            "pos": ["distress_response", "edge_sitter_notice", "helper_awareness", "people_priority", "sjt_empathy"],
            "neg": ["ignored_distress", "task_over_people"],
            "sjt_tag": "sjt_empathy",
            "game_pos": ["distress_response", "edge_sitter_notice", "helper_awareness", "people_priority"],
            "desc": "Responsiveness to others' emotional states and prioritization of people over tasks."
        },
        {
            "name": "Conscientiousness",
            "pos": ["project_completion", "methodical_collection", "sjt_conscientiousness"],
            "neg": ["abandoned_project", "erratic_movement"],
            "sjt_tag": "sjt_conscientiousness",
            "game_pos": ["project_completion", "methodical_collection"],
            "desc": "Reliability, organization, and commitment to completing structural tasks."
        },
        {
            "name": "Collaborative Spirit",
            "pos": ["shared_project_contribution", "helped_helper", "sjt_collaborative"],
            "neg": ["hoarded_resources"],
            "sjt_tag": "sjt_collaborative",
            "game_pos": ["shared_project_contribution", "helped_helper"],
            "desc": "Willingness to share resources and work alongside others on joint goals."
        },
        {
            "name": "Emotional Agility",
            "pos": ["fast_recovery", "sjt_emotional"],
            "neg": ["paralysis", "panic_clicking"],
            "sjt_tag": "sjt_emotional",
            "game_pos": ["fast_recovery"],
            "desc": "Ability to maintain composure and adapt quickly after a sudden disruption."
        },
        {
            "name": "Curiosity & Learning",
            "pos": ["fog_exploration", "novelty_seeking", "sjt_curiosity"],
            "neg": ["ignored_fogs", "repetitive_loops"],
            "sjt_tag": "sjt_curiosity",
            "game_pos": ["fog_exploration", "novelty_seeking"],
            "desc": "Drive to explore the unknown, reveal hidden information, and seek new paths."
        },
        {
            "name": "Creative Initiative",
            "pos": ["creative_zone_usage", "unprompted_action", "sjt_creative"],
            "neg": ["rigid_adherence"],
            "sjt_tag": "sjt_creative",
            "game_pos": ["creative_zone_usage", "unprompted_action"],
            "desc": "Tendency to create structure where none exists and utilize open creative spaces."
        }
    ]

    db.query(DBConstructEvidence).filter(DBConstructEvidence.assessment_id == assessment_id).delete()

    for c in constructs:
        sup, ctr, total, confidence = score_construct(c["pos"], c["neg"])
        
        # Calculate Reliability (Game vs SJT)
        game_sup, _, _, _ = score_construct(c["game_pos"], [])
        sjt_sup, _, _, _ = score_construct([c["sjt_tag"]], [])
        
        reliability_msg = "Unknown"
        if sjt_sup > 0 and game_sup > 0:
            reliability_msg = "High Consistency (Demonstrated in both Implicit Simulation & Explicit SJT)"
        elif sjt_sup > 0 and game_sup == 0:
            reliability_msg = "Explicit Only (Candidate endorsed this trait in theory, but did not demonstrate it in simulation)"
        elif sjt_sup == 0 and game_sup > 0:
            reliability_msg = "Implicit Only (Candidate naturally demonstrated this trait, though did not explicitly select it)"

        if total == 0:
            interp = f"No behavioral indicators observed for {c['name'].lower()}."
        else:
            interp = f"{c['desc']} Total Score: {sup}. Reliability: {reliability_msg}."

        ev = DBConstructEvidence(
            assessment_id=assessment_id,
            construct=c["name"],
            supporting_count=sup,
            counter_count=ctr,
            context_count=len(events),
            confidence=confidence,
            interpretation=interp
        )
        db.add(ev)
'''

code = re.sub(r'def generate_interpretations\(.*?db\.query\(DBRoleFit\)', new_logic + '\n    db.query(DBRoleFit)', code, flags=re.DOTALL)

with open('backend/app/routers/volunteers.py', 'w', encoding='utf-8') as f:
    f.write(code)
print('Done!')
