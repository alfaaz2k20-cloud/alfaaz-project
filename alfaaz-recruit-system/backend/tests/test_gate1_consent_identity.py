import os
import sys
import unittest
import json
from unittest.mock import patch
from pathlib import Path

from fastapi import HTTPException
from sqlalchemy.exc import SQLAlchemyError
from sqlmodel import SQLModel, Session, create_engine, select

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "backend")))

from recruit_system.core.config import RECRUIT_CONSENT_COPY, _find_recruit_copy_blockers
from recruit_system.models.recruit import DBApplicantIdentity, DBConsentRecord, DBSession
from recruit_system.routers.recruit import ConsentRequest, IdentityRequest, submit_consent, submit_identity
from recruit_system.services.rate_limiter import (
    recruit_session_start_hour_limiter,
    recruit_session_start_limiter,
    recruit_session_start_minute_limiter,
)


class TestGate1ConsentIdentity(unittest.TestCase):
    def setUp(self):
        self.engine = create_engine("sqlite:///:memory:")
        SQLModel.metadata.create_all(self.engine)
        recruit_session_start_minute_limiter._requests.clear()
        recruit_session_start_hour_limiter._requests.clear()

    def test_declined_consent_creates_no_records(self):
        with Session(self.engine) as db:
            with self.assertRaises(HTTPException):
                submit_consent(
                    ConsentRequest(
                        choices={"research_telemetry": False},
                        confirmed_18_plus=True,
                    ),
                    db,
                )

            self.assertEqual(db.exec(select(DBSession)).all(), [])
            self.assertEqual(db.exec(select(DBConsentRecord)).all(), [])
            self.assertEqual(db.exec(select(DBApplicantIdentity)).all(), [])

    def test_identity_requires_existing_consent(self):
        with Session(self.engine) as db:
            with self.assertRaises(HTTPException) as error:
                submit_identity(
                    IdentityRequest(session_id="missing", full_name="Ada Lovelace", email="ada@example.com"),
                    db,
                )
            self.assertEqual(error.exception.status_code, 404)

            db.add(DBSession(session_id="unconsented"))
            db.commit()
            with self.assertRaises(HTTPException) as error:
                submit_identity(
                    IdentityRequest(session_id="unconsented", full_name="Ada Lovelace", email="ada@example.com"),
                    db,
                )
            self.assertEqual(error.exception.status_code, 403)

    def test_consent_precedes_identity(self):
        with Session(self.engine) as db:
            response = submit_consent(
                ConsentRequest(
                    choices={"research_telemetry": True},
                    confirmed_18_plus=True,
                ),
                db,
            )
            session_id = response["session_id"]

            self.assertIsNotNone(db.get(DBSession, session_id))
            consent = db.exec(select(DBConsentRecord).where(DBConsentRecord.session_id == session_id)).first()
            self.assertIsNotNone(consent)
            self.assertEqual(consent.consent_text_version, RECRUIT_CONSENT_COPY["version"])
            self.assertIsNone(db.get(DBApplicantIdentity, session_id))

            submit_identity(
                IdentityRequest(session_id=session_id, full_name="Ada Lovelace", email="ada@example.com"),
                db,
            )
            self.assertEqual(db.get(DBApplicantIdentity, session_id).email, "ada@example.com")

    def test_failed_consent_transaction_leaves_no_rows(self):
        with Session(self.engine) as db:
            with patch.object(db, "commit", side_effect=SQLAlchemyError("forced failure")):
                with self.assertRaises(SQLAlchemyError):
                    submit_consent(
                        ConsentRequest(
                            choices={"research_telemetry": True},
                            confirmed_18_plus=True,
                        ),
                        db,
                    )

            self.assertEqual(db.exec(select(DBSession)).all(), [])
            self.assertEqual(db.exec(select(DBConsentRecord)).all(), [])
            self.assertEqual(db.exec(select(DBApplicantIdentity)).all(), [])

    def test_session_start_rate_limit_is_shared_per_ip(self):
        request = type("Request", (), {"client": type("Client", (), {"host": "198.51.100.2"})()})()
        for _ in range(10):
            recruit_session_start_limiter(request)

        with self.assertRaises(HTTPException) as error:
            recruit_session_start_limiter(request)
        self.assertEqual(error.exception.status_code, 429)

    def test_consent_controls_are_unchecked_and_gated(self):
        js_path = Path(__file__).resolve().parents[2] / "frontend" / "src" / "recruit.js"
        if not js_path.exists():
            js_path = Path(__file__).resolve().parents[3] / "frontend" / "src" / "recruit.js"
        source = js_path.read_text(encoding="utf-8")
        self.assertNotIn('id="ageConfirm" required checked', source)
        self.assertNotIn('id="consentAgree" required checked', source)
        self.assertNotIn("telemetryConfirm", source)
        self.assertIn("const researchParticipationConsent = consentAgree.checked;", source)
        self.assertIn('aria-disabled="true"', source)

    def test_owner_approved_consent_copy_has_no_production_blockers(self):
        consent_path = Path(__file__).resolve().parents[1] / "config" / "copy" / "consent.json"
        consent_copy = json.loads(consent_path.read_text(encoding="utf-8"))
        blockers = _find_recruit_copy_blockers(consent_copy, "consent")

        self.assertEqual(blockers, [])
        self.assertEqual(consent_copy["version"], "2026-10-v1")
        self.assertTrue(consent_copy["age_confirmation"]["label"])
        self.assertTrue(consent_copy["research_participation"]["label"])


if __name__ == "__main__":
    unittest.main()
