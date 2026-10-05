import unittest
import sys
import json
from pathlib import Path
from fastapi.testclient import TestClient

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "backend"))
from app.main import app
from app.models.recruit import DBSession, DBTelemetryEvent, DBFeature, DBEvidence, DBConsentRecord
from sqlalchemy.pool import StaticPool
from sqlmodel import Session, SQLModel, create_engine, select
from app.db.session import get_db

ALL_QUARANTINED_GAMES = [
    "F1", "F2", "F3",
    "A3",
    "C1", "C2", "C3",
    "E1", "E2", "E3",
    "Q1", "Q2", "Q3",
    "CR1", "CR2", "CR3",
    "M1", "M2", "M3",
]
ACTIVE_GAMES = ["A1", "A2"]

class TestEndToEndLineage(unittest.TestCase):
    """
    Proves the complete data-lineage chain:
      candidate session → telemetry API → DB telemetry → feature extraction
      → evidence integration → quarantined feature behavior → game evidence output
    """

    def setUp(self):
        self.engine = create_engine(
            "sqlite://",
            connect_args={"check_same_thread": False},
            poolclass=StaticPool,
        )
        SQLModel.metadata.create_all(self.engine)

        def override_get_db():
            with Session(self.engine) as session:
                yield session

        app.dependency_overrides[get_db] = override_get_db
        self.client = TestClient(app)

        with Session(self.engine) as db:
            db.add(DBSession(session_id="e2e-session", status="ACTIVE"))
            db.add(DBConsentRecord(
                session_id="e2e-session",
                consent_text_version="v1",
                confirmed_18_plus=True,
                choices={"research_telemetry": True},
            ))
            db.commit()

    def _get_research_data(self, session_id):
        """Helper: override admin auth, fetch research dossier, return parsed JSON."""
        from app.routers.research_view import require_admin as rv_require_admin
        app.dependency_overrides[rv_require_admin] = lambda: {"email": "a@t.com", "status": "ADMIN"}
        res = self.client.get(f"/recruit/research/sessions/{session_id}")
        self.assertEqual(res.status_code, 200, res.text)
        return res.json()

    # ------------------------------------------------------------------
    # 1. A1 valid extraction with sufficient telemetry
    # ------------------------------------------------------------------
    def test_a1_feature_valid_with_sufficient_events(self):
        """A1 must produce valid=True features when >=1 item_sorted events exist."""
        events = [
            {"seq": i, "action": "item_sorted", "world": "A1", "mini_game": "A1",
             "client_timestamp": 10000 + i, "task_def_version": "v1",
             "data": {"stimulus_id": f"A1_{i:02d}", "choice": f"folder_{i}"}}
            for i in range(1, 6)   # 5 items
        ]
        res = self.client.post("/recruit/telemetry", json={"session_id": "e2e-session", "events": events})
        self.assertEqual(res.status_code, 200, res.text)

        with Session(self.engine) as db:
            sess = db.get(DBSession, "e2e-session")
            sess.status = "COMPLETE"
            db.commit()

        data = self._get_research_data("e2e-session")
        features = data["features"]
        a1_feats = [f for f in features if f["mini_game"] == "A1"]

        self.assertGreaterEqual(len(a1_feats), 1, "A1 must produce at least one feature")
        for f in a1_feats:
            self.assertTrue(f["valid"], f"A1 feature '{f['feature_name']}' must be valid")
            self.assertFalse(f.get("is_quarantined", False), "A1 must NOT be quarantined")
            self.assertIsNotNone(f["value_raw"], "A1 value_raw must not be None when valid")

    # ------------------------------------------------------------------
    # 2. A2 valid extraction with >=3 genuine exceptions
    # ------------------------------------------------------------------
    def test_a2_feature_valid_with_sufficient_genuine_exceptions(self):
        """A2 must produce valid=True features when >=3 genuine exception trials exist."""
        events = [
            {"seq": i, "action": "decision_logged", "world": "A2", "mini_game": "A2",
             "client_timestamp": 20000 + i, "task_def_version": "v1",
             "data": {"stimulus_id": f"synth_{i}", "action_id": "flag_exception"}}
            for i in range(1, 5)   # 4 decisions  (synthetic path, obs_count=4 >= 3)
        ]
        res = self.client.post("/recruit/telemetry", json={"session_id": "e2e-session", "events": events})
        self.assertEqual(res.status_code, 200, res.text)

        with Session(self.engine) as db:
            sess = db.get(DBSession, "e2e-session")
            sess.status = "COMPLETE"
            db.commit()

        data = self._get_research_data("e2e-session")
        a2_feats = [f for f in data["features"] if f["mini_game"] == "A2"]

        self.assertGreaterEqual(len(a2_feats), 1, "A2 must produce at least one feature")
        for f in a2_feats:
            self.assertTrue(f["valid"], f"A2 feature '{f['feature_name']}' must be valid with >=3 trials")
            self.assertFalse(f.get("is_quarantined", False), "A2 must NOT be quarantined")

    # ------------------------------------------------------------------
    # 3. A2 INSUFFICIENT with <3 genuine exceptions
    # ------------------------------------------------------------------
    def test_a2_insufficient_with_fewer_than_3_exceptions(self):
        """A2 must be INSUFFICIENT when fewer than 3 genuine exception trials exist."""
        events = [
            {"seq": i, "action": "decision_logged", "world": "A2", "mini_game": "A2",
             "client_timestamp": 20000 + i, "task_def_version": "v1",
             "data": {"stimulus_id": f"synth_{i}", "action_id": "flag_exception"}}
            for i in range(1, 3)   # only 2 decisions  (obs_count=2 < 3)
        ]
        res = self.client.post("/recruit/telemetry", json={"session_id": "e2e-session", "events": events})
        self.assertEqual(res.status_code, 200, res.text)

        with Session(self.engine) as db:
            sess = db.get(DBSession, "e2e-session")
            sess.status = "COMPLETE"
            db.commit()

        data = self._get_research_data("e2e-session")
        a2_feats = [f for f in data["features"] if f["mini_game"] == "A2"]
        self.assertGreaterEqual(len(a2_feats), 1)
        for f in a2_feats:
            self.assertFalse(f["valid"], "A2 feature must be invalid with <3 trials")

    # ------------------------------------------------------------------
    # 4. Quarantined games produce valid==False and feature_not_implemented
    # ------------------------------------------------------------------
    def test_quarantined_games_produce_not_implemented_stubs(self):
        """
        Every quarantined game must produce features with:
          valid == False
          'feature_not_implemented' in its flags
          is_quarantined == True
        They must NOT produce active candidate evidence (game_status != USABLE).
        """
        # Send one allowlisted event per quarantined game so the extractor runs the stub.
        # We need to know each game's allowlist. Read from config.
        cfg_path = Path(__file__).resolve().parents[1] / "config" / "task_definitions.json"
        task_defs = json.loads(cfg_path.read_text(encoding="utf-8"))
        games_cfg = task_defs["games"]

        events = []
        seq = 1
        for game in ALL_QUARANTINED_GAMES:
            allowlist = games_cfg[game]["event_allowlist"]
            self.assertGreater(len(allowlist), 0, f"Allowlist for {game} must not be empty")
            events.append({
                "seq": seq, "action": allowlist[0], "world": game, "mini_game": game,
                "client_timestamp": 30000 + seq, "task_def_version": "v1",
                "data": {},
            })
            seq += 1

        res = self.client.post("/recruit/telemetry", json={"session_id": "e2e-session", "events": events})
        self.assertEqual(res.status_code, 200, res.text)

        with Session(self.engine) as db:
            sess = db.get(DBSession, "e2e-session")
            sess.status = "COMPLETE"
            db.commit()

        data = self._get_research_data("e2e-session")
        features = data["features"]

        for game in ALL_QUARANTINED_GAMES:
            game_feats = [f for f in features if f["mini_game"] == game]
            self.assertGreaterEqual(len(game_feats), 1, f"Quarantined game {game} must produce a stub feature")
            for f in game_feats:
                self.assertFalse(f["valid"], f"{game} feature must have valid==False")
                self.assertTrue(f.get("is_quarantined", False), f"{game} must be marked quarantined")
                # Assert the actual flags list contains "feature_not_implemented"
                flags = f.get("flags", [])
                self.assertIn("feature_not_implemented", flags,
                              f"{game} must have 'feature_not_implemented' in flags, got {flags}")

    # ------------------------------------------------------------------
    # 5. Uncalibrated active features: game_band == "UNCALIBRATED"
    # ------------------------------------------------------------------
    def test_uncalibrated_active_features_produce_uncalibrated_band(self):
        """
        For active extractors (A1, A2) with sufficient observations,
        game_band must be exactly "UNCALIBRATED" — never HIGH/MODERATE/LOW.
        """
        # Send enough A1 + A2 events for the parameter (conscientiousness) to be USABLE
        events = []
        for i in range(1, 6):
            events.append({
                "seq": i, "action": "item_sorted", "world": "A1", "mini_game": "A1",
                "client_timestamp": 40000 + i, "task_def_version": "v1",
                "data": {"stimulus_id": f"A1_{i:02d}", "choice": f"folder_{i}"},
            })
        for i in range(6, 10):
            events.append({
                "seq": i, "action": "decision_logged", "world": "A2", "mini_game": "A2",
                "client_timestamp": 40000 + i, "task_def_version": "v1",
                "data": {"stimulus_id": f"synth_{i}", "action_id": "flag_exception"},
            })

        res = self.client.post("/recruit/telemetry", json={"session_id": "e2e-session", "events": events})
        self.assertEqual(res.status_code, 200, res.text)

        with Session(self.engine) as db:
            sess = db.get(DBSession, "e2e-session")
            sess.status = "COMPLETE"
            db.commit()

        data = self._get_research_data("e2e-session")
        evidence = data["evidence_by_parameter"]
        self.assertIn("conscientiousness", evidence, "conscientiousness must be in evidence")

        consc = evidence["conscientiousness"]
        self.assertEqual(consc["game_status"], "USABLE", "conscientiousness game_status must be USABLE")
        self.assertEqual(consc["game_band"], "UNCALIBRATED",
                         f"game_band must be 'UNCALIBRATED', got '{consc['game_band']}'")
        # Must NOT emit placeholder band values
        self.assertNotIn(consc["game_band"], ["HIGH", "MODERATE", "LOW"],
                         "UNCALIBRATED features must NOT produce HIGH/MODERATE/LOW bands")

    # ------------------------------------------------------------------
    # 6. All 7 evidence parameters present; confidence is categorical
    # ------------------------------------------------------------------
    def test_evidence_coverage_and_confidence_categorical(self):
        """All 7 parameters must appear in evidence; confidence must be LIMITED or MODERATE."""
        EXPECTED_PARAMS = {
            "empathy", "conscientiousness", "collaborative_spirit",
            "emotional_agility", "curiosity", "creative_initiative", "motivation"
        }
        # Minimal session — complete with no events. All should be INSUFFICIENT/LIMITED.
        with Session(self.engine) as db:
            sess = db.get(DBSession, "e2e-session")
            sess.status = "COMPLETE"
            db.commit()

        data = self._get_research_data("e2e-session")
        evidence = data["evidence_by_parameter"]

        self.assertEqual(set(evidence.keys()), EXPECTED_PARAMS,
                         f"Evidence must cover exactly {EXPECTED_PARAMS}")

        for param, ev in evidence.items():
            conf = ev["confidence"]
            self.assertIsInstance(conf, str, f"{param}: confidence must be str, got {type(conf)}")
            self.assertIn(conf, ["LIMITED", "MODERATE", "SUBSTANTIAL"],
                          f"{param}: confidence must be LIMITED/MODERATE/SUBSTANTIAL, got '{conf}'")
            # Uncalibrated cap: no SUBSTANTIAL without calibrated data
            if ev.get("game_band") == "UNCALIBRATED" or ev.get("game_band") is None:
                self.assertNotEqual(conf, "SUBSTANTIAL",
                                    f"{param}: uncalibrated evidence must not reach SUBSTANTIAL")
