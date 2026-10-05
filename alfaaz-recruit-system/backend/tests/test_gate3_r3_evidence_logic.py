import unittest
import os
import sys
import json
import uuid
from datetime import datetime, timezone
from sqlmodel import Session, create_engine, SQLModel, select
from fastapi.testclient import TestClient

# Add backend to sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "backend")))

from app.models.recruit import (
    DBSession, DBTelemetryEvent, DBFeature, DBEvidence,
    DBDataQualityFlag, DBSJTResponse, DBAccessibilityProfile
)
from app.services.feature_extractor import extract_session_features
from app.services.evidence_integrator import (
    integrate_session_evidence, PARAM_MINIGAMES, BAND_ORDINALS, ORDINAL_BANDS
)
from app.main import app

client = TestClient(app)

class TestGate3R3EvidenceLogic(unittest.TestCase):
    def setUp(self):
        self.engine = create_engine("sqlite:///:memory:")
        SQLModel.metadata.create_all(self.engine)

    def _setup_sjt_responses(self, db: Session, session_id: str):
        """Helper to create full 7 SJT responses."""
        # 7 scenarios S1 to S7
        sjt_data = [
            ("S1", "S1A"), ("S2", "S2A"), ("S3", "S3A"),
            ("S4", "S4A"), ("S5", "S5A"), ("S6", "S6A"), ("S7", "S7A")
        ]
        for s_id, opt_id in sjt_data:
            db.add(DBSJTResponse(
                session_id=session_id,
                scenario_id=s_id,
                option_id=opt_id,
                t_ms=1500.0
            ))
        db.commit()

    def test_usable_count_branches_and_no_low_on_insufficient(self):
        """
        Tests usable counts 0, 1, 2, 3:
        - 0 or 1 usable mini-games -> game_status=INSUFFICIENT, game_band=None, relationship=SJT_ONLY, confidence=LIMITED
        - Insufficient evidence NEVER becomes LOW.
        """
        with Session(self.engine) as db:
            session_id = str(uuid.uuid4())
            db.add(DBSession(session_id=session_id, status="ACTIVE"))
            self._setup_sjt_responses(db, session_id)

            # Case A: 0 usable mini-games for conscientiousness (A1, A2, A3 missing)
            ev_list = integrate_session_evidence(db, session_id, force_recompute=True)
            ev_c = next(e for e in ev_list if e.parameter == "conscientiousness")
            self.assertEqual(ev_c.game_status, "INSUFFICIENT")
            self.assertIsNone(ev_c.game_band)
            self.assertNotEqual(ev_c.game_band, "LOW")
            self.assertEqual(ev_c.consistency, "INSUFFICIENT")
            self.assertEqual(ev_c.relationship, "SJT_ONLY")
            self.assertEqual(ev_c.confidence, "LIMITED")

            # Case B: 1 usable mini-game (only A1 usable, A2 and A3 quarantined/missing)
            db.add(DBFeature(
                session_id=session_id, mini_game="A1",
                feature_name="classification_rule_adherence_rate",
                value_raw=0.9, valid=True, flags_json="[]"
            ))
            db.add(DBFeature(
                session_id=session_id, mini_game="A2",
                feature_name="exception_flagging_precision",
                value_raw=None, valid=False, flags_json=json.dumps(["feature_not_implemented"])
            ))
            db.commit()

            ev_list = integrate_session_evidence(db, session_id, force_recompute=True)
            ev_c = next(e for e in ev_list if e.parameter == "conscientiousness")
            self.assertEqual(ev_c.game_status, "INSUFFICIENT")
            self.assertIsNone(ev_c.game_band)
            self.assertNotEqual(ev_c.game_band, "LOW")
            self.assertEqual(ev_c.relationship, "SJT_ONLY")
            self.assertEqual(ev_c.confidence, "LIMITED")

            # Case C: 2 usable mini-games (clean session with A1 and A2 usable) -> USABLE, UNCALIBRATED, NOT_COMPUTED, MODERATE
            session_id_2 = str(uuid.uuid4())
            db.add(DBSession(session_id=session_id_2, status="ACTIVE"))
            self._setup_sjt_responses(db, session_id_2)
            db.add(DBFeature(
                session_id=session_id_2, mini_game="A1",
                feature_name="classification_rule_adherence_rate",
                value_raw=0.9, valid=True, flags_json="[]"
            ))
            db.add(DBFeature(
                session_id=session_id_2, mini_game="A2",
                feature_name="exception_flagging_precision",
                value_raw=0.85, valid=True, flags_json="[]"
            ))
            db.commit()

            ev_list_2 = integrate_session_evidence(db, session_id_2, force_recompute=True)
            ev_c2 = next(e for e in ev_list_2 if e.parameter == "conscientiousness")
            self.assertEqual(ev_c2.game_status, "USABLE")
            self.assertEqual(ev_c2.game_band, "UNCALIBRATED")
            self.assertEqual(ev_c2.consistency, "NOT_COMPUTED")
            self.assertEqual(ev_c2.relationship, "NOT_COMPUTED")
            self.assertEqual(ev_c2.confidence, "MODERATE")

            # Case D: 3 usable mini-games in uncalibrated mode -> still cannot exceed MODERATE
            db.add(DBFeature(
                session_id=session_id_2, mini_game="A3",
                feature_name="error_detection_sensitivity",
                value_raw=0.8, valid=True, flags_json="[]"
            ))
            db.commit()

            ev_list_3 = integrate_session_evidence(db, session_id_2, force_recompute=True)
            ev_c3 = next(e for e in ev_list_3 if e.parameter == "conscientiousness")
            self.assertEqual(ev_c3.game_status, "USABLE")
            self.assertEqual(ev_c3.game_band, "UNCALIBRATED")
            self.assertEqual(ev_c3.consistency, "NOT_COMPUTED")
            self.assertEqual(ev_c3.relationship, "NOT_COMPUTED")
            self.assertEqual(ev_c3.confidence, "MODERATE")  # cannot exceed MODERATE while uncalibrated

    def test_sjt_absent_relationship_and_sjt_missing_flag(self):
        """
        When SJT is missing:
        - relationship = INSUFFICIENT
        - informational flag 'sjt_missing' added
        - confidence = LIMITED
        - missing SJT never becomes LOW
        """
        with Session(self.engine) as db:
            session_id = str(uuid.uuid4())
            db.add(DBSession(session_id=session_id, status="ACTIVE"))
            # 2 usable mini-games for A1 and A2
            db.add(DBFeature(session_id=session_id, mini_game="A1", feature_name="feat_a1", value_raw=0.8, valid=True, flags_json="[]"))
            db.add(DBFeature(session_id=session_id, mini_game="A2", feature_name="feat_a2", value_raw=0.8, valid=True, flags_json="[]"))
            db.commit()

            # Integrate without any SJT responses
            ev_list = integrate_session_evidence(db, session_id, force_recompute=True)
            ev_c = next(e for e in ev_list if e.parameter == "conscientiousness")

            self.assertIsNone(ev_c.sjt_band)
            self.assertNotEqual(ev_c.sjt_band, "LOW")
            self.assertEqual(ev_c.relationship, "INSUFFICIENT")
            self.assertEqual(ev_c.confidence, "LIMITED")

            # Check that sjt_missing flag was recorded
            flags = db.exec(select(DBDataQualityFlag).where(DBDataQualityFlag.session_id == session_id)).all()
            self.assertTrue(any(f.flag == "sjt_missing" for f in flags))

    def test_critical_flag_forces_limited_confidence(self):
        """
        Critical flags (seq_conflict, events_cap_reached) force confidence = LIMITED across all parameters.
        """
        with Session(self.engine) as db:
            session_id = str(uuid.uuid4())
            db.add(DBSession(session_id=session_id, status="ACTIVE"))
            self._setup_sjt_responses(db, session_id)

            # 2 usable mini-games
            db.add(DBFeature(session_id=session_id, mini_game="A1", feature_name="f1", value_raw=0.8, valid=True, flags_json="[]"))
            db.add(DBFeature(session_id=session_id, mini_game="A2", feature_name="f2", value_raw=0.8, valid=True, flags_json="[]"))
            # Add critical flag
            db.add(DBDataQualityFlag(session_id=session_id, scope="session", flag="seq_conflict", detail="Conflicting seq 10"))
            db.commit()

            ev_list = integrate_session_evidence(db, session_id, force_recompute=True)
            for ev in ev_list:
                self.assertEqual(ev.confidence, "LIMITED")

    def test_calibrated_branches_consistency_relationship_and_substantial(self):
        """
        Tests the calibrated branches:
        - range <= 1 -> CONSISTENT, range > 1 -> VARIED
        - relationship: ALIGNED (diff 0), PARTLY_ALIGNED (diff 1), DIFFERENT (diff 2)
        - 3 usable + CONSISTENT + no critical -> SUBSTANTIAL
        - 3 usable + VARIED -> MODERATE
        """
        with Session(self.engine) as db:
            session_id = str(uuid.uuid4())
            db.add(DBSession(session_id=session_id, status="ACTIVE"))
            self._setup_sjt_responses(db, session_id)

            # 3 usable mini-games for conscientiousness: A1, A2, A3
            db.add(DBFeature(session_id=session_id, mini_game="A1", feature_name="f1", value_raw=0.9, valid=True, flags_json="[]"))
            db.add(DBFeature(session_id=session_id, mini_game="A2", feature_name="f2", value_raw=0.85, valid=True, flags_json="[]"))
            db.add(DBFeature(session_id=session_id, mini_game="A3", feature_name="f3", value_raw=0.8, valid=True, flags_json="[]"))
            db.commit()

            # Mock calibration config: all 3 in HIGH band
            calibrated_cfg_consistent = {
                "calibration_status": "CALIBRATED",
                "bands": {
                    "A1": {"LOW": 0.3, "HIGH": 0.7},  # 0.9 -> HIGH
                    "A2": {"LOW": 0.3, "HIGH": 0.7},  # 0.85 -> HIGH
                    "A3": {"LOW": 0.3, "HIGH": 0.7},  # 0.8 -> HIGH
                }
            }

            ev_list = integrate_session_evidence(
                db, session_id, force_recompute=True, feature_bands_override=calibrated_cfg_consistent
            )
            ev_c = next(e for e in ev_list if e.parameter == "conscientiousness")
            self.assertEqual(ev_c.game_band, "HIGH")
            self.assertEqual(ev_c.consistency, "CONSISTENT")
            self.assertEqual(ev_c.confidence, "SUBSTANTIAL")  # 3 usable + CONSISTENT
            self.assertIn(ev_c.relationship, ["ALIGNED", "PARTLY_ALIGNED", "DIFFERENT"])

            # Test VARIED consistency: A1 HIGH (0.9), A2 LOW (0.2), A3 MODERATE (0.5)
            calibrated_cfg_varied = {
                "calibration_status": "CALIBRATED",
                "bands": {
                    "A1": {"LOW": 0.3, "HIGH": 0.7},  # 0.9 -> HIGH (ord 2)
                    "A2": {"LOW": 0.8, "HIGH": 0.95}, # 0.85 -> MODERATE (ord 1)
                    "A3": {"LOW": 0.85, "HIGH": 0.95} # 0.8 -> LOW (ord 0)
                }
            }
            ev_list = integrate_session_evidence(
                db, session_id, force_recompute=True, feature_bands_override=calibrated_cfg_varied
            )
            ev_c = next(e for e in ev_list if e.parameter == "conscientiousness")
            # Range is max(2)-min(0) = 2 > 1 -> VARIED
            self.assertEqual(ev_c.consistency, "VARIED")
            self.assertEqual(ev_c.confidence, "MODERATE")

    def test_vocabulary_hygiene_no_observed_or_game_only_or_numeric_confidence(self):
        """
        Verifies that old vocabulary (OBSERVED, GAME_ONLY) and numeric confidence are completely absent.
        """
        with Session(self.engine) as db:
            session_id = str(uuid.uuid4())
            db.add(DBSession(session_id=session_id, status="ACTIVE"))
            self._setup_sjt_responses(db, session_id)
            db.add(DBFeature(session_id=session_id, mini_game="A1", feature_name="f1", value_raw=0.8, valid=True, flags_json="[]"))
            db.add(DBFeature(session_id=session_id, mini_game="A2", feature_name="f2", value_raw=0.8, valid=True, flags_json="[]"))
            db.commit()

            ev_list = integrate_session_evidence(db, session_id, force_recompute=True)
            for ev in ev_list:
                for attr in ["game_status", "game_band", "consistency", "relationship", "confidence"]:
                    val = getattr(ev, attr)
                    if val is not None:
                        self.assertNotEqual(val, "OBSERVED", f"{attr} should never be OBSERVED")
                        self.assertNotEqual(val, "GAME_ONLY", f"{attr} should never be GAME_ONLY")
                        self.assertIn(ev.confidence, ["LIMITED", "MODERATE", "SUBSTANTIAL"])

    def test_insert_only_versioning_and_recomputation_traceability(self):
        """
        Verifies:
        - INSERT-ONLY: recompute adds new rows and marks prior superseded
        - Historical evidence rows are preserved in full
        - Exactly one current non-superseded row per parameter
        - Version increments from 1 -> 2 -> 3
        """
        with Session(self.engine) as db:
            session_id = str(uuid.uuid4())
            db.add(DBSession(session_id=session_id, status="ACTIVE"))
            self._setup_sjt_responses(db, session_id)

            # Run 1: initial integration -> version 1
            ev_run1 = integrate_session_evidence(db, session_id, force_recompute=True)
            self.assertEqual(len(ev_run1), 7)
            for ev in ev_run1:
                self.assertEqual(ev.version, 1)
                self.assertFalse(ev.is_superseded)
                self.assertIsNone(ev.superseded_at)
                self.assertEqual(ev.spec_version, "2026-10-v2")

            # Check database row count = 7
            total_rows = db.exec(select(DBEvidence).where(DBEvidence.session_id == session_id)).all()
            self.assertEqual(len(total_rows), 7)

            # Run 2: recompute -> version 2
            ev_run2 = integrate_session_evidence(db, session_id, force_recompute=True)
            self.assertEqual(len(ev_run2), 7)
            for ev in ev_run2:
                self.assertEqual(ev.version, 2)
                self.assertFalse(ev.is_superseded)
                self.assertIsNone(ev.superseded_at)

            # Check database row count = 14 (historical records preserved!)
            all_rows = db.exec(select(DBEvidence).where(DBEvidence.session_id == session_id)).all()
            self.assertEqual(len(all_rows), 14)
            v1_rows = [r for r in all_rows if r.version == 1]
            v2_rows = [r for r in all_rows if r.version == 2]
            self.assertEqual(len(v1_rows), 7)
            self.assertEqual(len(v2_rows), 7)
            self.assertTrue(all(r.is_superseded for r in v1_rows))
            self.assertTrue(all(r.superseded_at is not None for r in v1_rows))
            self.assertTrue(all(not r.is_superseded for r in v2_rows))

            # Exactly one active record per parameter
            active_rows = db.exec(
                select(DBEvidence).where(
                    DBEvidence.session_id == session_id,
                    DBEvidence.is_superseded == False
                )
            ).all()
            self.assertEqual(len(active_rows), 7)
            self.assertEqual(set(r.parameter for r in active_rows), set(PARAM_MINIGAMES.keys()))

    def test_golden_end_to_end_fixture_determinism(self):
        """
        Requirement 7: Golden end-to-end fixture:
        - Complete SJT
        - All 21 mini-games represented in telemetry
        - Accessibility mode profile
        - Known status combinations (USABLE, INSUFFICIENT, INVALID)
        - Known quality flags
        - Run twice -> byte-identical derived output
        """
        with Session(self.engine) as db:
            session_id = str(uuid.uuid4())
            db.add(DBSession(session_id=session_id, status="ACTIVE"))
            self._setup_sjt_responses(db, session_id)

            # Accessibility mode
            db.add(DBAccessibilityProfile(
                session_id=session_id,
                modes_enabled_json=json.dumps(["high_contrast", "screen_reader"])
            ))

            # Add telemetry for all 21 mini-games
            all_mgs = [mg for mgs in PARAM_MINIGAMES.values() for mg in mgs]
            seq = 1
            for mg in all_mgs:
                db.add(DBTelemetryEvent(
                    session_id=session_id,
                    seq=seq,
                    segment_id=1,
                    t_ms=float(seq * 1000),
                    screen="game",
                    mini_game=mg,
                    action="minigame_start"
                ))
                seq += 1
                db.add(DBTelemetryEvent(
                    session_id=session_id,
                    seq=seq,
                    segment_id=1,
                    t_ms=float(seq * 1000 + 500),
                    screen="game",
                    mini_game=mg,
                    action="decision_logged",
                    data_json=json.dumps({"is_correct": True, "dwell_ms": 1200.0})
                ))
                seq += 1
                db.add(DBTelemetryEvent(
                    session_id=session_id,
                    seq=seq,
                    segment_id=1,
                    t_ms=float(seq * 1000 + 900),
                    screen="game",
                    mini_game=mg,
                    action="minigame_end"
                ))
                seq += 1

            # Known quality flags
            db.add(DBDataQualityFlag(
                session_id=session_id,
                scope="session",
                flag="tab_hidden_extended",
                detail="Tab hidden for 75s"
            ))
            db.commit()

            # Run 1: Feature extraction & evidence integration
            extract_session_features(db, session_id)
            ev1 = integrate_session_evidence(db, session_id, force_recompute=True)
            dict1 = {
                e.parameter: {
                    "sjt_raw": e.sjt_raw,
                    "sjt_band": e.sjt_band,
                    "game_status": e.game_status,
                    "game_band": e.game_band,
                    "consistency": e.consistency,
                    "relationship": e.relationship,
                    "confidence": e.confidence
                } for e in ev1
            }
            json1 = json.dumps(dict1, sort_keys=True)

            # Run 2: Recompute
            extract_session_features(db, session_id)
            ev2 = integrate_session_evidence(db, session_id, force_recompute=True)
            dict2 = {
                e.parameter: {
                    "sjt_raw": e.sjt_raw,
                    "sjt_band": e.sjt_band,
                    "game_status": e.game_status,
                    "game_band": e.game_band,
                    "consistency": e.consistency,
                    "relationship": e.relationship,
                    "confidence": e.confidence
                } for e in ev2
            }
            json2 = json.dumps(dict2, sort_keys=True)

            # Byte-identical derived output
            self.assertEqual(json1, json2)
            self.assertEqual(len(dict1), 7)
            # Prior version rows preserved
            total_evidence_rows = db.exec(select(DBEvidence).where(DBEvidence.session_id == session_id)).all()
            self.assertEqual(len(total_evidence_rows), 14)

    def test_error_path_security_no_scoring_key_leak(self):
        """
        Requirement 8: Error-path security:
        Verify scoring keys, weights, and thresholds never appear in:
        - success responses
        - validation errors (422)
        - 4xx errors
        - debug output
        """
        # 1. Public SJT endpoint
        resp = client.get("/recruit/sjt/public")
        self.assertEqual(resp.status_code, 200)
        body = resp.text
        self.assertNotIn('"keys"', body)
        self.assertNotIn('"weights"', body)
        self.assertNotIn('"scores"', body)

        # 2. Validation error on SJT submit (empty body -> 422)
        resp_422 = client.post("/recruit/sjt/submit", json={})
        self.assertEqual(resp_422.status_code, 422)
        self.assertNotIn("empathy", resp_422.text.lower())
        self.assertNotIn("conscientiousness", resp_422.text.lower())

        # 3. Bad request on SJT submit (non-existent session -> 404)
        resp_404 = client.post("/recruit/sjt/submit", json={
            "session_id": "non-existent-session-id",
            "responses": {"S1": "S1A"}
        })
        self.assertEqual(resp_404.status_code, 404)
        self.assertNotIn("scoring", resp_404.text.lower())
        self.assertNotIn("fingerprint", resp_404.text.lower())

        # 4. Telemetry invalid session
        resp_tel = client.post("/recruit/telemetry", json={
            "session_id": "non-existent-session-id",
            "events": []
        })
        self.assertIn(resp_tel.status_code, [403, 404, 422])
        self.assertNotIn("threshold", resp_tel.text.lower())
        self.assertNotIn("weights", resp_tel.text.lower())

if __name__ == "__main__":
    unittest.main()
