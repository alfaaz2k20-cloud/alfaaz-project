from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.blog import DBBlog

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