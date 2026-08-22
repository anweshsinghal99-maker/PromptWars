from fastapi import APIRouter
from app.schemas.schemas import ChatMessageRequest, ChatMessageResponse
from app.agents.chat_agent import chat_copilot_agent

router = APIRouter(prefix="/chat", tags=["AI Copilot Chat Assistant"])

@router.post("/", response_model=ChatMessageResponse)
def chat_with_copilot(req: ChatMessageRequest):
    """
    Context-aware conversational endpoint answering student schedule, attendance, venue, and study questions.
    """
    return chat_copilot_agent.process_query(
        query=req.message,
        context_day=req.context_day,
        context_time=req.context_time
    )
