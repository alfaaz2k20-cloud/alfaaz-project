from fastapi import APIRouter, Request, Depends, HTTPException
from app.services.curator import build_curator_messages, check_curator_rate_limit, get_groq_client
from app.schemas.curator import PhantomQuery

# This replaces @app.post
router = APIRouter(prefix="/phantom", tags=["The Curator"])

@router.post("/ask")
def ask_phantom(query: PhantomQuery, request: Request, _=Depends(check_curator_rate_limit)):
    client = get_groq_client()
    if not client:
        return {"answer": "The Curator is currently unavailable."}
    try:
        response = client.chat.completions.create(
            messages=build_curator_messages(query.question, query.history),
            model="llama-3.3-70b-versatile",
            temperature=0.6,
            max_tokens=450,
        )
        return {"answer": response.choices[0].message.content}
    except Exception:
        return {"answer": "Our archives are temporarily unreachable. Please inquire again later."}
