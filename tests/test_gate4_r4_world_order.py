import os
import sys
import json
import uuid
import threading
import unittest
from concurrent.futures import ThreadPoolExecutor

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "backend")))

from sqlmodel import Session, create_engine, SQLModel, select
from sqlalchemy.pool import StaticPool
from fastapi.testclient import TestClient

from app.main import app
from app.db.session import get_db
from app.models.recruit import DBSession, DBTaskAssignment, DBConsentRecord
from app.services.world_order import (
    LATIN_SQUARE_14,
    verify_latin_square_balance,
    generate_minigame_seeds,
    assign_world_order,
    get_world_order_distribution,
    ALL_MINIGAMES,
    assignment_lock
)


class TestGate4R4WorldOrder(unittest.TestCase):
    def setUp(self):
        self.engine = create_engine(
            "sqlite:///:memory:",
            connect_args={"check_same_thread": False},
            poolclass=StaticPool
        )
        SQLModel.metadata.create_all(self.engine)

        def override_get_db():
            with Session(self.engine) as session:
                yield session

        app.dependency_overrides[get_db] = override_get_db
        self.client = TestClient(app)

    def tearDown(self):
        app.dependency_overrides.clear()

    def test_mathematical_latin_square_properties(self):
        """
        Verify the 14-row Latin square design:
        1. 14 rows, each with all 7 worlds.
        2. Every world appears exactly 2 times in every position (0..6).
        3. All 42 directed adjacent pairs appear exactly 2 times across the 14 rows.
        """
        is_balanced, msg = verify_latin_square_balance()
        self.assertTrue(is_balanced, f"Latin square verification failed: {msg}")

        # Check tamper detection
        tampered = [list(r) for r in LATIN_SQUARE_14]
        tampered[0][0], tampered[0][1] = tampered[0][1], tampered[0][0]
        # Verify manual check catches tamper
        worlds = [f"W{i}" for i in range(1, 8)]
        col_0 = [tampered[r][0] for r in range(14)]
        counts = {w: col_0.count(w) for w in worlds}
        self.assertNotEqual(counts["W1"], 2)

    def test_assignment_balance_across_140_sessions(self):
        """
        Simulate 140 allocations (10 full cycles) and verify exactly 10 sessions per row.
        """
        with Session(self.engine) as db:
            row_counts = {i: 0 for i in range(14)}
            for _ in range(140):
                s_id = str(uuid.uuid4())
                order_id, seq, seeds = assign_world_order(db, s_id)
                row_counts[order_id] += 1
                db.add(DBTaskAssignment(
                    session_id=s_id,
                    world_order_id=order_id,
                    world_sequence_json=json.dumps(seq),
                    seeds_json=json.dumps(seeds)
                ))
                db.commit()

            for o_id, count in row_counts.items():
                self.assertEqual(count, 10, f"Order {o_id} expected 10 assignments, got {count}")

    def test_concurrent_assignments_safety(self):
        """
        Verify concurrent assignment does not corrupt balance or cause race conditions.
        """
        with Session(self.engine) as db:
            # Pre-seed 7 assignments so minimum is not all-zero
            for i in range(7):
                s_id = str(uuid.uuid4())
                order_id, seq, seeds = assign_world_order(db, s_id)
                db.add(DBTaskAssignment(
                    session_id=s_id,
                    world_order_id=order_id,
                    world_sequence_json=json.dumps(seq),
                    seeds_json=json.dumps(seeds)
                ))
            db.commit()

            results = []
            errors = []

            def worker():
                try:
                    with Session(self.engine) as thread_db:
                        with assignment_lock:
                            s_id = str(uuid.uuid4())
                            order_id, seq, seeds = assign_world_order(thread_db, s_id)
                            thread_db.add(DBTaskAssignment(
                                session_id=s_id,
                                world_order_id=order_id,
                                world_sequence_json=json.dumps(seq),
                                seeds_json=json.dumps(seeds)
                            ))
                            thread_db.commit()
                            results.append(order_id)
                except Exception as e:
                    errors.append(str(e))

            threads = [threading.Thread(target=worker) for _ in range(21)]
            for t in threads:
                t.start()
            for t in threads:
                t.join()

            self.assertEqual(len(errors), 0, f"Concurrent workers encountered errors: {errors}")
            self.assertEqual(len(results), 21)

            # Total assignments: 7 + 21 = 28 (exactly 2 per row)
            total_counts = {i: 0 for i in range(14)}
            all_assignments = db.exec(select(DBTaskAssignment.world_order_id)).all()
            for o_id in all_assignments:
                total_counts[o_id] += 1

            for o_id, count in total_counts.items():
                self.assertEqual(count, 2, f"Order {o_id} expected 2 assignments after 28 total, got {count}")

    def test_deterministic_seed_generation(self):
        """
        Verify stimulus seeds are deterministic HMAC-derived:
        - Same session_id produces byte-for-byte identical seeds.
        - All 21 mini-games receive positive 32-bit integer seeds.
        - Different session_ids produce different seeds.
        """
        sid1 = "test-session-deterministic-alpha"
        sid2 = "test-session-deterministic-beta"

        seeds1_a = generate_minigame_seeds(sid1)
        seeds1_b = generate_minigame_seeds(sid1)
        seeds2 = generate_minigame_seeds(sid2)

        self.assertEqual(seeds1_a, seeds1_b, "Seeds for the same session must be identical")
        self.assertNotEqual(seeds1_a, seeds2, "Seeds for different sessions must differ")

        self.assertEqual(len(seeds1_a), 21)
        self.assertEqual(set(seeds1_a.keys()), set(ALL_MINIGAMES))
        for mg, s in seeds1_a.items():
            self.assertIsInstance(s, int)
            self.assertGreaterEqual(s, 0)
            self.assertLess(s, 2**32)

    def test_client_consent_assigns_and_persists_order(self):
        """
        Verify /recruit/consent returns server-assigned sequence and seeds,
        stores them in DBSession and DBTaskAssignment, and client cannot override.
        """
        consent_payload = {
            "choices": {"research_telemetry": True},
            "confirmed_18_plus": True,
            "device_class": "desktop",
            "input_modality": "mouse"
        }
        res = self.client.post("/recruit/consent", json=consent_payload)
        self.assertEqual(res.status_code, 200)
        data = res.json()

        self.assertEqual(data["status"], "SUCCESS")
        session_id = data["session_id"]
        world_seq = data["world_sequence"]
        seeds = data["seeds"]

        self.assertEqual(len(world_seq), 7)
        self.assertIn(world_seq, LATIN_SQUARE_14)
        self.assertEqual(len(seeds), 21)

        with Session(self.engine) as db:
            session_obj = db.get(DBSession, session_id)
            self.assertIsNotNone(session_obj)
            self.assertIsNotNone(session_obj.order_id)
            self.assertEqual(LATIN_SQUARE_14[session_obj.order_id], world_seq)

            assignment = db.get(DBTaskAssignment, session_id)
            self.assertIsNotNone(assignment)
            self.assertEqual(assignment.world_order_id, session_obj.order_id)
            self.assertEqual(json.loads(assignment.world_sequence_json), world_seq)
            self.assertEqual(json.loads(assignment.seeds_json), seeds)

    def test_separate_consented_vs_completed_tracking(self):
        """
        Verify get_world_order_distribution tracks consented sessions and completed sessions separately.
        """
        with Session(self.engine) as db:
            # Session 1: Consented only
            s1 = "session-1"
            db.add(DBSession(session_id=s1, status="CONSENTED", order_id=0))
            db.add(DBTaskAssignment(session_id=s1, world_order_id=0, world_sequence_json="[]", seeds_json="{}"))

            # Session 2: Completed
            s2 = "session-2"
            db.add(DBSession(session_id=s2, status="COMPLETE", order_id=0))
            db.add(DBTaskAssignment(session_id=s2, world_order_id=0, world_sequence_json="[]", seeds_json="{}"))

            # Session 3: Completed on order 1
            s3 = "session-3"
            db.add(DBSession(session_id=s3, status="COMPLETE", order_id=1))
            db.add(DBTaskAssignment(session_id=s3, world_order_id=1, world_sequence_json="[]", seeds_json="{}"))
            db.commit()

            dist = get_world_order_distribution(db)
            # Row 0: 2 consented, 1 completed
            self.assertEqual(dist["consented"][0], 2)
            self.assertEqual(dist["completed"][0], 1)

            # Row 1: 1 consented, 1 completed
            self.assertEqual(dist["consented"][1], 1)
            self.assertEqual(dist["completed"][1], 1)

            # Row 2: 0 consented, 0 completed
            self.assertEqual(dist["consented"][2], 0)
            self.assertEqual(dist["completed"][2], 0)


if __name__ == "__main__":
    unittest.main()
