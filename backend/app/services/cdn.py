import json
import cloudinary
import cloudinary.uploader
from io import BytesIO
from sqlalchemy.orm import Session
from app.models.event import DBEvent, DBEventRegistration
from app.models.exhibition import DBExhibition
from app.core.config import CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
from app.models.blog import DBBlog

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
        # --- Events ---
        events = db.query(DBEvent).filter(DBEvent.registration_open == True).all()
        events_data = []
        for e in events:
            count = db.query(DBEventRegistration).filter(DBEventRegistration.event_id == e.id).count()
            events_data.append({
                "name": e.name,
                "event_date": str(e.event_date) if e.event_date else None,
                "description": e.description,
                "capacity": e.capacity,
                "spots_left": (e.capacity - count) if e.capacity > 0 else None,
                "full": (e.capacity > 0 and count >= e.capacity)
            })

        # --- Exhibition ---
        config = db.query(DBExhibition).filter(DBExhibition.is_active == True).first()
        exhibition_data = None
        if config:
            exhibition_data = {
                "is_open": True,
                "title": config.title,
                "date_text": config.date_text,
                "about_text": config.about_text,
                "venue": config.venue,
                "tnc_pdf_url": config.tnc_pdf_url,
                "registration_fee": config.registration_fee,
                "payment_instructions": config.payment_instructions,
                "payment_qr_url": config.payment_qr_url
            }

        # --- Latest Blog ---
        latest_blog = db.query(DBBlog).filter(DBBlog.is_published == True).order_by(DBBlog.created_at.desc()).first()
        blog_data = None
        if latest_blog:
            blog_data = {
                "id": latest_blog.id,
                "title": latest_blog.title,
                "excerpt": latest_blog.excerpt,
                "created_at": str(latest_blog.created_at) if latest_blog.created_at else None
            }

        # --- Construct Final JSON ---
        notices_json = {
            "events": events_data,
            "exhibition": exhibition_data,
            "latest_blog": blog_data  
        }
        
        json_str = json.dumps(notices_json, indent=2, ensure_ascii=False)

        # FIX 1: BytesIO (not StringIO) — Cloudinary SDK requires bytes
        file_obj = BytesIO(json_str.encode('utf-8'))

        result = cloudinary.uploader.upload(
            file_obj,
            resource_type="raw",
            public_id="notices.json",
            folder="alfaaz",
            overwrite=True,
            invalidate=True   # FIX 2: Purges CDN edge cache immediately
        )

        print(f"[CLOUDINARY] notices.json synced: {result.get('secure_url')}")
        return result.get('secure_url')

    except Exception as e:
        print(f"[CLOUDINARY] Sync failed: {e}")
        import traceback
        traceback.print_exc()