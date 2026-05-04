from fastapi import APIRouter, Request, Depends, HTTPException
from app.services.curator import check_curator_rate_limit, get_groq_client, ALFAAZ_KNOWLEDGE
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
            messages=[
                {
                    "role": "system", 
                    "content": f"You are The Curator of the Alfaaz Collective. You act as a seasoned gallery curator and literary guide. Speak with clarity, elegance, and approachability. Do not be overly poetic or dramatic; convey simple messages directly to make the participant's life easier. Your knowledge:\n{ALFAAZ_KNOWLEDGE}\nKeep responses 3-5 sentences max. Never fabricate facts."
                },
                {"role": "user", "content": query.question}
            ],
            model="llama-3.3-70b-versatile",
            temperature=0.6,
        )
        return {"answer": response.choices[0].message.content}
    except Exception:
        return {"answer": "Our archives are temporarily unreachable. Please inquire again later."}