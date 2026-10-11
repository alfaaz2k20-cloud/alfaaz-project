import os
import sys
import unittest
from fastapi import HTTPException
from sqlmodel import SQLModel, Session, create_engine, select

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "backend")))

from recruit_system.models.recruit import DBApplicantIdentity, DBConsentRecord, DBSession, DBInterviewBooking
from recruit_system.routers.recruit import (
    IdentityRequest,
    ScheduleInterviewRequest,
    submit_identity,
    get_interview_slots,
    schedule_interview,
    get_interview_booking,
)


class TestInterviewBooking(unittest.TestCase):
    def setUp(self):
        self.engine = create_engine("sqlite:///:memory:")
        SQLModel.metadata.create_all(self.engine)

    def _create_consented_session(self, db: Session, session_id: str = "sess-1", name: str = "Candidate Test", email: str = "candidate@example.com", phone: str = "+919876543210"):
        sess = DBSession(session_id=session_id, status="CONSENTED")
        db.add(sess)
        consent = DBConsentRecord(session_id=session_id, consent_text_version="2.0", confirmed_18_plus=True)
        db.add(consent)
        identity = DBApplicantIdentity(
            session_id=session_id,
            full_name=name,
            email=email,
            phone_or_contact=phone
        )
        db.add(identity)
        db.commit()
        return session_id

    def test_identity_with_whatsapp_number(self):
        with Session(self.engine) as db:
            sess = DBSession(session_id="sess-wa", status="CONSENTED")
            db.add(sess)
            db.add(DBConsentRecord(session_id="sess-wa", consent_text_version="2.0", confirmed_18_plus=True))
            db.commit()

            submit_identity(
                IdentityRequest(
                    session_id="sess-wa",
                    full_name="Amina Akhtar",
                    email="amina@example.com",
                    whatsapp_no="+91 9988776655"
                ),
                db
            )
            saved = db.get(DBApplicantIdentity, "sess-wa")
            self.assertIsNotNone(saved)
            self.assertEqual(saved.phone_or_contact, "+91 9988776655")

    def test_get_available_interview_slots(self):
        with Session(self.engine) as db:
            self._create_consented_session(db, "sess-1")
            res = get_interview_slots(db)
            self.assertIn("days", res)
            self.assertIsInstance(res["days"], list)
            self.assertGreater(len(res["days"]), 0)
            first_day = res["days"][0]
            self.assertIn("date", first_day)
            self.assertIn("times", first_day)
            self.assertGreater(len(first_day["times"]), 0)

    def test_schedule_and_retrieve_interview_booking(self):
        with Session(self.engine) as db:
            self._create_consented_session(db, "sess-booking", name="Zayd", email="zayd@example.com", phone="+919123456789")
            slots_res = get_interview_slots(db)
            first_day = slots_res["days"][0]
            target_date = first_day["date"]
            target_time = first_day["times"][0]
            target_display = f"{first_day['date_label']} at {target_time} IST"

            booking_res = schedule_interview(
                ScheduleInterviewRequest(
                    session_id="sess-booking",
                    slot_date=target_date,
                    slot_time=target_time,
                    slot_display=target_display
                ),
                db
            )
            self.assertEqual(booking_res["status"], "SUCCESS")
            self.assertIn("booking", booking_res)
            booking_data = booking_res["booking"]
            self.assertIn("whatsapp_notify_url", booking_data)
            self.assertIn("google_calendar_url", booking_data)
            self.assertEqual(booking_data["slot_date"], target_date)
            self.assertEqual(booking_data["slot_time"], target_time)

            # Retrieve booking
            retrieved = get_interview_booking("sess-booking", db)
            self.assertIsNotNone(retrieved["booking"])
            self.assertEqual(retrieved["booking"]["slot_date"], target_date)
            self.assertEqual(retrieved["booking"]["slot_time"], target_time)

    def test_slot_collision_prevents_duplicate_booking(self):
        with Session(self.engine) as db:
            self._create_consented_session(db, "cand-1", name="Candidate One", email="one@example.com")
            self._create_consented_session(db, "cand-2", name="Candidate Two", email="two@example.com")

            days = get_interview_slots(db)["days"]
            target_date = days[0]["date"]
            target_time = days[0]["times"][0]
            target_display = f"{days[0]['date_label']} at {target_time} IST"

            # Candidate 1 books the slot
            schedule_interview(
                ScheduleInterviewRequest(
                    session_id="cand-1",
                    slot_date=target_date,
                    slot_time=target_time,
                    slot_display=target_display
                ),
                db
            )

            # Candidate 2 tries to book the same slot -> 409 conflict
            with self.assertRaises(HTTPException) as ctx:
                schedule_interview(
                    ScheduleInterviewRequest(
                        session_id="cand-2",
                        slot_date=target_date,
                        slot_time=target_time,
                        slot_display=target_display
                    ),
                    db
                )
            self.assertEqual(ctx.exception.status_code, 409)

    def test_reschedule_by_same_candidate(self):
        with Session(self.engine) as db:
            self._create_consented_session(db, "cand-resched", name="Candidate Resched", email="resched@example.com")
            days = get_interview_slots(db)["days"]
            slot_date_1 = days[0]["date"]
            slot_time_1 = days[0]["times"][0]
            slot_date_2 = days[0]["date"]
            slot_time_2 = days[0]["times"][1]

            # Initial booking
            schedule_interview(
                ScheduleInterviewRequest(
                    session_id="cand-resched",
                    slot_date=slot_date_1,
                    slot_time=slot_time_1,
                    slot_display=f"{days[0]['date_label']} at {slot_time_1} IST"
                ),
                db
            )

            # Reschedule to second slot
            resched_res = schedule_interview(
                ScheduleInterviewRequest(
                    session_id="cand-resched",
                    slot_date=slot_date_2,
                    slot_time=slot_time_2,
                    slot_display=f"{days[0]['date_label']} at {slot_time_2} IST"
                ),
                db
            )
            self.assertEqual(resched_res["booking"]["slot_date"], slot_date_2)
            self.assertEqual(resched_res["booking"]["slot_time"], slot_time_2)
