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
        
    if not authorization or not authorization.startswith("Bearer ") or authorization.split(" ")[1] != EXPECTED_TOKEN:
        print(f"[CURATOR ERROR] Unauthorized access attempt with token: {authorization[:15] if authorization else 'None'}...")
        raise HTTPException(status_code=403, detail="Unauthorized Curator Access")

    client = get_groq_client()
    if not client:
        print("[CURATOR ERROR] Groq client not initialized.")
        raise HTTPException(status_code=500, detail="Curator AI not configured.")

    active_topic = data.topic if data.topic else (
        "Explore a profound intersection between Kashmiri cultural heritage and global movements in "
        "art, photography, film, philosophy, or literature. Focus on a specific, authentic, and scholarly "
        "topic that resonates with local identity while connecting to a broader human narrative."
    )
    
    system_prompt = """You are the Curator for the Alfaaz Collective, a scholarly and poetic voice dedicated to high-fidelity research in art, film, and philosophy.
    TASK: Generate a deeply detailed, authentic, and evocative journal article.
    TONE: Grounded, native (Kashmiri/Regional focus), yet globally aware and academically rigorous.
    
    STRUCTURE:
    1. Introduction: Hook the reader with a specific cultural or historical observation.
    2. Deep Dive: 3-4 detailed sections exploring the topic through multiple lenses (e.g., historical, psychological, or visual).
    3. The Local-Global Bridge: Explicitly connect regional kashmiri nuances to international artistic or philosophical currents.
    4. References: A concluding section listing authentic scholarly works, historical texts, or artistic movements cited.

    CRITICAL CONSTRAINTS:
    - MUST be a strictly valid JSON object.
    - All keys/values wrapped in double quotes.
    - "content" is HTML (use single quotes for attributes).
    - Do NOT include newlines (\\n) inside JSON strings; use <br> or <p> tags instead.
    
    JSON structure: {"title": "...", "excerpt": "...", "content": "<h2>...</h2><p>...</p><h3>References</h3><ul><li>...</li></ul>"}"""

    try:
        response = client.chat.completions.create(
            messages=[{"role": "system", "content": system_prompt},
                      {"role": "user", "content": f"Topic: {active_topic}"}],
            model="llama-3.3-70b-versatile",
            response_format={"type": "json_object"},
            temperature=0.8,
            max_tokens=4096
        )
        
        raw_content = response.choices[0].message.content
        try:
            result = json.loads(raw_content)
        except json.JSONDecodeError as je:
            print(f"[CURATOR ERROR] JSON Decode Failed: {je}")
            print(f"[CURATOR ERROR] Raw Output: {raw_content}")
            raise HTTPException(status_code=500, detail="The Curator produced an unreadable manuscript.")

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