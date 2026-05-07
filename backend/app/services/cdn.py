import json
import cloudinary
import cloudinary.uploader
from sqlalchemy.orm import Session
from app.models.event import DBEvent, DBEventRegistration
from app.models.exhibition import DBExhibition
from app.core.config import CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET

if CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET:
    cloudinary.config(
        cloud_name=CLOUDINARY_CLOUD_NAME,
        api_key=CLOUDINARY_API_KEY,
        api_secret=CLOUDINARY_API_SECRET,
        secure=True
    )
    print("[CLOUDINARY] Configured successfully")

def sync_notices_to_cloudinary(db: Session):
    """Upload current notices to Cloudinary CDN when admin saves changes."""
    if not CLOUDINARY_API_SECRET:
        print("[CLOUDINARY] Skipping sync - credentials not set")
        return

    try:
        events = db.query(DBEvent).filter(DBEvent.registration_open == True).all()
        events_data = []
        for e in events:
            count = db.query(DBEventRegistration).filter(DBEventRegistration.event_id == e.id).count()
            events_data.append({
                "name": e.name,
                "event_date": e.event_date,
                "description": e.description,
                "capacity": e.capacity,
                "spots_left": (e.capacity - count) if e.capacity > 0 else None,
                "full": (e.capacity > 0 and count >= e.capacity)
            })

        config = db.query(DBExhibition).filter(DBExhibition.is_active == True).first()
        exhibition_data = None
        if config:
            exhibition_data = {
                "is_open": True,  # Replaces config.is_open since the model uses is_active now
                "title": config.title,
                "date_text": config.date_text,
                "about_text": config.about_text
            }

        notices_json = {"events": events_data, "exhibition": exhibition_data}
        json_str = json.dumps(notices_json, indent=2)

        result = cloudinary.uploader.upload(
            json_str,
            resource_type="raw",
            public_id="notices.json",
            folder="alfaaz",
            overwrite=True
        )
        print(f"[CLOUDINARY] notices.json synced: {result.get('secure_url')}")

    except Exception as e:
        print(f"[CLOUDINARY] Sync failed: {e}")