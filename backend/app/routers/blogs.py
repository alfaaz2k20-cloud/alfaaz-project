import secrets
from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.blog import DBBlog
import json

# Schemas
from app.schemas.blog import BlogGenerateRequest

# Services
from app.services.curator import get_groq_client
from app.services.cdn import sync_notices_to_cloudinary

router = APIRouter(prefix="/blogs", tags=["Blogs"])

@router.get("/")
def get_all_blogs(db: Session = Depends(get_db)):
    blogs = db.query(DBBlog).filter(DBBlog.is_published == True).order_by(DBBlog.created_at.desc()).all()
    return [{"id": b.id, "title": b.title, "excerpt": b.excerpt, "created_at": b.created_at.isoformat()} for b in blogs]

@router.get("/{id}")
def get_single_blog(id: int, db: Session = Depends(get_db)):
    blog = db.query(DBBlog).filter(DBBlog.id == id, DBBlog.is_published == True).first()
    if not blog:
        raise HTTPException(status_code=404, detail="Article not found.")
    return {"id": blog.id, "title": blog.title, "content": blog.content, "created_at": blog.created_at.isoformat()}

@router.post("/generate")
def generate_blog_article(data: BlogGenerateRequest, db: Session = Depends(get_db), authorization: str = Header(None)):
    from app.core.config import PHANTOM_SECRET_TOKEN as EXPECTED_TOKEN
    
    if not EXPECTED_TOKEN:
        print("[CURATOR ERROR] PHANTOM_SECRET_TOKEN not configured in environment.")
        raise HTTPException(status_code=500, detail="PHANTOM_SECRET_TOKEN not configured.")
        
    token = None
    if authorization and authorization.startswith("Bearer "):
        token = authorization.split(" ", 1)[1]

    if not token or not secrets.compare_digest(token, EXPECTED_TOKEN):
        print("[CURATOR ERROR] Unauthorized access attempt to /blogs/generate.")
        raise HTTPException(status_code=403, detail="Unauthorized Curator Access")

    # Services
    from app.services.curator import generate_curator_essay

    active_topic = data.topic if data.topic else (
        "Explore a profound intersection between Kashmiri cultural heritage and global movements in "
        "art, photography, film, philosophy, or literature. Focus on a specific, authentic, and scholarly "
        "topic that resonates with local identity while connecting to a broader human narrative."
    )

    try:
        result = generate_curator_essay(active_topic)
        new_blog = DBBlog(
            title=result.get("title", "Untitled Reflection"), 
            excerpt=result.get("excerpt", ""),
            content=result.get("content", ""), 
            is_published=True
        )

        
        db.add(new_blog)
        db.commit()
        
        # Sync to CDN
        try:
            sync_notices_to_cloudinary(db)
        except Exception as se:
            print(f"[CURATOR WARNING] CDN Sync failed but blog was saved: {se}")
            
        return {"status": "SUCCESS", "message": "Autonomous research published."}
        
    except Exception as e:
        print(f"[CURATOR CRITICAL] Generation failed: {e}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"The Curator failed to generate the article: {str(e)}")
