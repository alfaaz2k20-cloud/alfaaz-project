import logging
from fastapi import APIRouter, Request, Depends
from app.services.curator import ask_curator_ai, check_curator_rate_limit
from app.schemas.curator import PhantomQuery

logger = logging.getLogger("app.curator")

# Retain /phantom prefix for full backward-compatibility with deployed clients
router = APIRouter(prefix="/phantom", tags=["Curator AI"])

@router.post("/ask")
def ask_curator_endpoint(query: PhantomQuery, request: Request, _=Depends(check_curator_rate_limit)):
    """
    Primary conversational endpoint for Curator AI.
    Answers inquiries across visitor widget and dashboard terminal.
    """
    try:
        answer = ask_curator_ai(query.question, query.history)
        return {"answer": answer}
    except Exception as e:
        logger.error("Curator AI request processing error: %s", e, exc_info=True)
        return {"answer": "The Curator is temporarily contemplating in quiet reflection. Please inquire again momentarily."}
