import unittest
import json
import uuid
import os
import sys

# Add backend to sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "backend")))

from sqlmodel import Session, create_engine, SQLModel, select
from app.models.recruit import DBSession, DBTelemetryEvent, DBDataQualityFlag, DBEvidence, DBSJTResponse
from app.services.descriptive_task_record import get_session_task_records, NEUTRAL_TAG, DOSSIER_STATEMENT, LOCKED_GAMES
from app.services.evidence_integrator import integrate_session_evidence

class TestDescriptiveTaskRecord(unittest.TestCase):
    def setUp(self):
        self.engine = create_engine("sqlite:///:memory:")
        SQLModel.metadata.create_all(self.engine)
        self.db = Session(self.engine)
        self.session_id = str(uuid.uuid4())
        self.session = DBSession(session_id=self.session_id, status="GAMES", email="candidate@alfaaz.test")
        self.db.add(self.session)
        self.db.commit()

    def tearDown(self):
        self.db.close()

    def test_display_gate_empty_session(self):
        """Unattempted session displays 'not derived yet' for all 21 games."""
        records = get_session_task_records(self.db, self.session_id)
        self.assertEqual(len(records), 21)
        for r in records:
            self.assertEqual(r["status"], "NOT_DERIVED")
            self.assertEqual(r["display_text"], "not derived yet")

    def test_interruption_yields_insufficient(self):
        """Interrupted game displays INSUFFICIENT."""
        self.db.add(DBTelemetryEvent(
            session_id=self.session_id, seq=1, segment_id=1, t_ms=100.0,
            screen="game", mini_game="F1", action="interrupted", task_def_version="1.0"
        ))
        self.db.commit()

        records = get_session_task_records(self.db, self.session_id)
        f1_rec = next(r for r in records if r["game_id"] == "F1")
        self.assertEqual(f1_rec["status"], "INSUFFICIENT")
        self.assertEqual(f1_rec["display_text"], "INSUFFICIENT")

    def test_session_conflict_yields_invalid(self):
        """Critical session flag (seq_conflict) renders all games with telemetry INVALID."""
        self.db.add_all([
            DBDataQualityFlag(session_id=self.session_id, scope="telemetry", flag="seq_conflict", detail="conflict"),
            DBTelemetryEvent(
                session_id=self.session_id, seq=1, segment_id=1, t_ms=100.0,
                screen="game", mini_game="A1", action="document_filed", task_def_version="1.0"
            )
        ])
        self.db.commit()

        records = get_session_task_records(self.db, self.session_id)
        a1_rec = next(r for r in records if r["game_id"] == "A1")
        self.assertEqual(a1_rec["status"], "INVALID")
        self.assertEqual(a1_rec["display_text"], "INVALID")

    def test_a2_observation_gate_n1_n2_n3(self):
        """A2 displays INSUFFICIENT for N<3 and descriptive text for N>=3."""
        # N=2
        sess_n2 = str(uuid.uuid4())
        self.db.add(DBSession(session_id=sess_n2, status="GAMES"))
        self.db.add_all([
            DBTelemetryEvent(session_id=sess_n2, seq=1, segment_id=1, t_ms=100.0, screen="game", mini_game="A2", action="decision_logged", task_def_version="1.0"),
            DBTelemetryEvent(session_id=sess_n2, seq=2, segment_id=1, t_ms=200.0, screen="game", mini_game="A2", action="decision_logged", task_def_version="1.0"),
        ])
        self.db.commit()

        recs_n2 = get_session_task_records(self.db, sess_n2)
        a2_n2 = next(r for r in recs_n2 if r["game_id"] == "A2")
        self.assertEqual(a2_n2["status"], "INSUFFICIENT")
        self.assertEqual(a2_n2["display_text"], "INSUFFICIENT")

        # N=3
        sess_n3 = str(uuid.uuid4())
        self.db.add(DBSession(session_id=sess_n3, status="GAMES"))
        self.db.add_all([
            DBTelemetryEvent(session_id=sess_n3, seq=1, segment_id=1, t_ms=100.0, screen="game", mini_game="A2", action="decision_logged", task_def_version="1.0"),
            DBTelemetryEvent(session_id=sess_n3, seq=2, segment_id=1, t_ms=200.0, screen="game", mini_game="A2", action="decision_logged", task_def_version="1.0"),
            DBTelemetryEvent(session_id=sess_n3, seq=3, segment_id=1, t_ms=300.0, screen="game", mini_game="A2", action="decision_logged", task_def_version="1.0"),
        ])
        self.db.commit()

        recs_n3 = get_session_task_records(self.db, sess_n3)
        a2_n3 = next(r for r in recs_n3 if r["game_id"] == "A2")
        self.assertEqual(a2_n3["status"], "DERIVED")
        self.assertEqual(a2_n3["display_text"], "handled 3 of 3 exceptions as defined")

    def test_golden_fixtures_all_21_games(self):
        """Golden fixture populates all 21 games and verifies exact descriptive phrasing."""
        events = []
        seq = 1

        # W1: F1 (6 trials), F2 (4 trials), F3 (3 transitions)
        for i in range(1, 7):
            events.append(DBTelemetryEvent(session_id=self.session_id, seq=seq, segment_id=1, t_ms=float(seq*100), screen="game", mini_game="F1", action="trial_submit", task_def_version="1.0", data_json=json.dumps({"stimulus_id": f"F1_T{i}", "action_id": "accommodate"})))
            seq += 1
        for i in range(1, 5):
            events.append(DBTelemetryEvent(session_id=self.session_id, seq=seq, segment_id=1, t_ms=float(seq*100), screen="game", mini_game="F2", action="trial_submit", task_def_version="1.0", data_json=json.dumps({"stimulus_id": f"F2_T{i}", "action_id": "act"})))
            seq += 1
        for i in range(1, 4):
            events.append(DBTelemetryEvent(session_id=self.session_id, seq=seq, segment_id=1, t_ms=float(seq*100), screen="game", mini_game="F3", action="trial_submit", task_def_version="1.0", data_json=json.dumps({"stimulus_id": f"F3_T{i}", "action_id": "update"})))
            seq += 1

        # W2: A1 (12 folios), A2 (3 exceptions), A3 (8 records)
        for i in range(1, 13):
            events.append(DBTelemetryEvent(session_id=self.session_id, seq=seq, segment_id=1, t_ms=float(seq*100), screen="game", mini_game="A1", action="document_filed", task_def_version="1.0", data_json=json.dumps({"stimulus_id": f"DOC_{i:02d}", "choice": "19th_century"})))
            seq += 1
        for i in range(1, 4):
            events.append(DBTelemetryEvent(session_id=self.session_id, seq=seq, segment_id=1, t_ms=float(seq*100), screen="game", mini_game="A2", action="decision_logged", task_def_version="1.0", data_json=json.dumps({"stimulus_id": f"EXC_{i:02d}", "action_id": "flag_exception"})))
            seq += 1
        for i in range(1, 9):
            events.append(DBTelemetryEvent(session_id=self.session_id, seq=seq, segment_id=1, t_ms=float(seq*100), screen="game", mini_game="A3", action="record_inspected", task_def_version="1.0", data_json=json.dumps({"stimulus_id": f"REC_{i:02d}"})))
            seq += 1
        for i in [1, 3, 5, 7]:
            events.append(DBTelemetryEvent(session_id=self.session_id, seq=seq, segment_id=1, t_ms=float(seq*100), screen="game", mini_game="A3", action="discrepancy_toggled", task_def_version="1.0", data_json=json.dumps({"stimulus_id": f"REC_{i:02d}", "flagged_state": True})))
            seq += 1
        events.append(DBTelemetryEvent(session_id=self.session_id, seq=seq, segment_id=1, t_ms=float(seq*100), screen="game", mini_game="A3", action="verification_finalized", task_def_version="1.0"))
        seq += 1

        # W3: C1 (4 rounds), C2 (3 rounds), C3 (3 breakdowns)
        for i in range(1, 5):
            events.append(DBTelemetryEvent(session_id=self.session_id, seq=seq, segment_id=1, t_ms=float(seq*100), screen="game", mini_game="C1", action="allocation_confirmed", task_def_version="1.0", data_json=json.dumps({"stimulus_id": f"C1_R{i}", "allocated_amount": 2})))
            seq += 1
        for i in range(1, 4):
            events.append(DBTelemetryEvent(session_id=self.session_id, seq=seq, segment_id=1, t_ms=float(seq*100), screen="game", mini_game="C2", action="placement_confirmed", task_def_version="1.0", data_json=json.dumps({"stimulus_id": f"C2_R{i}", "chosen_slot": "slot_1"})))
            seq += 1
        for i in range(1, 4):
            events.append(DBTelemetryEvent(session_id=self.session_id, seq=seq, segment_id=1, t_ms=float(seq*100), screen="game", mini_game="C3", action="breakdown_identified", task_def_version="1.0", data_json=json.dumps({"stimulus_id": f"C3_R{i}", "fault_id": f"fault_{i}"})))
            seq += 1
            events.append(DBTelemetryEvent(session_id=self.session_id, seq=seq, segment_id=1, t_ms=float(seq*100), screen="game", mini_game="C3", action="repair_action_performed", task_def_version="1.0", data_json=json.dumps({"stimulus_id": f"C3_R{i}", "repair_action_id": f"repair_{i}"})))
            seq += 1
            events.append(DBTelemetryEvent(session_id=self.session_id, seq=seq, segment_id=1, t_ms=float(seq*100), screen="game", mini_game="C3", action="repaired_action_executed", task_def_version="1.0", data_json=json.dumps({"stimulus_id": f"C3_R{i}", "execution_action_id": f"exec_{i}"})))
            seq += 1

        # W4: E1 (9 trials), E2 (4 sequences), E3 (3 transitions)
        for i in range(1, 10):
            events.append(DBTelemetryEvent(session_id=self.session_id, seq=seq, segment_id=1, t_ms=float(seq*100), screen="game", mini_game="E1", action="tile_sorted", task_def_version="1.0", data_json=json.dumps({"stimulus_id": f"E1_T{i}", "choice": "container_1"})))
            seq += 1
        for i in range(1, 5):
            events.append(DBTelemetryEvent(session_id=self.session_id, seq=seq, segment_id=1, t_ms=float(seq*100), screen="game", mini_game="E2", action="sequence_completed", task_def_version="1.0", data_json=json.dumps({"stimulus_id": f"E2_S{i}"})))
            seq += 1
        for i in range(1, 4):
            events.append(DBTelemetryEvent(session_id=self.session_id, seq=seq, segment_id=1, t_ms=float(seq*100), screen="game", mini_game="E3", action="execution_completed", task_def_version="1.0", data_json=json.dumps({"stimulus_id": f"E3_C{i}"})))
            seq += 1

        # W5: Q1 (2 alcoves), Q2 (2 clues), Q3 (2 dossiers)
        for i in [1, 2]:
            events.append(DBTelemetryEvent(session_id=self.session_id, seq=seq, segment_id=1, t_ms=float(seq*100), screen="game", mini_game="Q1", action="alcove_inspected", task_def_version="1.0", data_json=json.dumps({"resource_id": f"OPT_USEFUL_{i}"})))
            seq += 1
        for i in [1, 2]:
            events.append(DBTelemetryEvent(session_id=self.session_id, seq=seq, segment_id=1, t_ms=float(seq*100), screen="game", mini_game="Q2", action="clue_inspected", task_def_version="1.0", data_json=json.dumps({"clue_id": f"clue_{i}"})))
            seq += 1
        for i in [1, 2]:
            events.append(DBTelemetryEvent(session_id=self.session_id, seq=seq, segment_id=1, t_ms=float(seq*100), screen="game", mini_game="Q3", action="context_dossier_requested", task_def_version="1.0", data_json=json.dumps({"stimulus_id": f"Q3_E{i}"})))
            seq += 1

        # W6: CR1 (3 elements), CR2 (3 adjustments), CR3 (3 affordances)
        for i in [1, 2, 3]:
            events.append(DBTelemetryEvent(session_id=self.session_id, seq=seq, segment_id=1, t_ms=float(seq*100), screen="game", mini_game="CR1", action="element_placed", task_def_version="1.0", data_json=json.dumps({"element_id": f"elem_{i}"})))
            seq += 1
        for i in [1, 2, 3]:
            events.append(DBTelemetryEvent(session_id=self.session_id, seq=seq, segment_id=1, t_ms=float(seq*100), screen="game", mini_game="CR2", action="arrangement_adjusted", task_def_version="1.0", data_json=json.dumps({"adjustment_id": f"adj_{i}"})))
            seq += 1
        for i in [1, 2, 3]:
            events.append(DBTelemetryEvent(session_id=self.session_id, seq=seq, segment_id=1, t_ms=float(seq*100), screen="game", mini_game="CR3", action="object_affordance_tested", task_def_version="1.0", data_json=json.dumps({"affordance_id": f"aff_{i}"})))
            seq += 1

        # W7: M1 (3 units), M2 (2 voluntary units), M3 (1 voluntary unit)
        for i in range(1, 4):
            events.append(DBTelemetryEvent(session_id=self.session_id, seq=seq, segment_id=1, t_ms=float(seq*100), screen="game", mini_game="M1", action="unit_completed", task_def_version="1.0", data_json=json.dumps({"unit_index": i-1})))
            seq += 1
        # M2: 3 mandatory + 2 voluntary
        for i in range(1, 4):
            events.append(DBTelemetryEvent(session_id=self.session_id, seq=seq, segment_id=1, t_ms=float(seq*100), screen="game", mini_game="M2", action="unit_completed", task_def_version="1.0", data_json=json.dumps({"stimulus_id": f"M2_M{i}", "unit_index": i-1, "is_mandatory": True})))
            seq += 1
        for i in range(1, 3):
            events.append(DBTelemetryEvent(session_id=self.session_id, seq=seq, segment_id=1, t_ms=float(seq*100), screen="game", mini_game="M2", action="unit_completed", task_def_version="1.0", data_json=json.dumps({"stimulus_id": f"M2_O{i}", "unit_index": 2+i, "is_mandatory": False})))
            seq += 1

        # M3: 3 mandatory + 1 voluntary (total 4 units)
        for i in range(1, 4):
            events.append(DBTelemetryEvent(session_id=self.session_id, seq=seq, segment_id=1, t_ms=float(seq*100), screen="game", mini_game="M3", action="unit_completed", task_def_version="1.0", data_json=json.dumps({"stimulus_id": f"M3_U{i}", "unit_index": i-1})))
            seq += 1
        events.append(DBTelemetryEvent(session_id=self.session_id, seq=seq, segment_id=1, t_ms=float(seq*100), screen="game", mini_game="M3", action="unit_completed", task_def_version="1.0", data_json=json.dumps({"stimulus_id": "M3_U4", "unit_index": 3})))
        seq += 1

        self.db.add_all(events)
        self.db.commit()

        records = get_session_task_records(self.db, self.session_id)
        self.assertEqual(len(records), 21)

        # Check all 21 games have status DERIVED
        for r in records:
            self.assertEqual(r["status"], "DERIVED", f"Game {r['game_id']} should be DERIVED")

        # Check neutral tag on no-good/bad games
        neutral_ids = {"C1", "F2", "E2", "M1", "Q1", "Q2", "Q3", "CR1", "CR2", "CR3", "M2", "M3"}
        for r in records:
            if r["game_id"] in neutral_ids:
                self.assertTrue(r["is_neutral_record"], f"{r['game_id']} should be marked neutral")
                self.assertIn(NEUTRAL_TAG, r["display_text"], f"{r['game_id']} must include '{NEUTRAL_TAG}'")
            else:
                self.assertFalse(r["is_neutral_record"], f"{r['game_id']} should not be marked neutral")
                self.assertNotIn(NEUTRAL_TAG, r["display_text"])

        # Check specific text examples
        f1 = next(r for r in records if r["game_id"] == "F1")
        self.assertEqual(f1["display_text"], "completed 6 of 6 cue attunement trials")

        a1 = next(r for r in records if r["game_id"] == "A1")
        self.assertEqual(a1["display_text"], "completed 12 of 12 classification items")

        a3 = next(r for r in records if r["game_id"] == "A3")
        self.assertEqual(a3["display_text"], "inspected 8 of 8 records; flagged 4 discrepancies")

        c3 = next(r for r in records if r["game_id"] == "C3")
        self.assertEqual(c3["display_text"], "identified and executed repair in 3 of 3 collaboration breakdowns")

        m2 = next(r for r in records if r["game_id"] == "M2")
        self.assertIn("completed 3 mandatory units and continued for 2 optional units", m2["display_text"])

    def test_task_records_do_not_mutate_r3_evidence(self):
        """Task records generation must NEVER modify DBEvidence or R3 evidence values."""
        # Seed basic SJT responses
        for s_idx in range(1, 8):
            self.db.add(DBSJTResponse(session_id=self.session_id, scenario_id=f"S{s_idx}", option_id=f"S{s_idx}A"))
        self.db.commit()

        # Compute R3 evidence
        ev_before = integrate_session_evidence(self.db, self.session_id, force_recompute=True)
        ev_before_data = [(e.parameter, e.sjt_band, e.game_band, e.consistency, e.relationship, e.confidence) for e in ev_before]

        # Call get_session_task_records
        _ = get_session_task_records(self.db, self.session_id)

        # Check DBEvidence in DB
        ev_after = self.db.exec(select(DBEvidence).where(DBEvidence.session_id == self.session_id, DBEvidence.is_superseded == False)).all()
        ev_after_data = [(e.parameter, e.sjt_band, e.game_band, e.consistency, e.relationship, e.confidence) for e in ev_after]

        self.assertEqual(ev_before_data, ev_after_data, "Task records calculation must not mutate R3 evidence")

    def test_deterministic_replay(self):
        """Repeated computation of task records produces byte-identical output."""
        run1 = get_session_task_records(self.db, self.session_id)
        run2 = get_session_task_records(self.db, self.session_id)
        self.assertEqual(run1, run2)

if __name__ == "__main__":
    unittest.main()
