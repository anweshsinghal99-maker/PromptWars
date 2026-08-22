from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any
from app.schemas.schemas import AssignmentResponse, AssignmentBase
from app.agents.assignment_agent import assignment_agent

router = APIRouter(prefix="/assignments", tags=["Assignments & Kanban"])

@router.get("/", response_model=List[AssignmentResponse])
def get_assignments():
    """
    Returns all active assignments with their auto-split subtasks.
    """
    return assignment_agent.get_all_assignments()

@router.post("/auto-split")
def auto_split_assignment(req: Dict[str, Any]):
    """
    Auto-deconstructs a raw assignment topic into daily manageable chunks.
    """
    title = req.get("title", "Course Project")
    description = req.get("description", "")
    difficulty = req.get("difficulty", "Medium")
    est_hours = float(req.get("estimated_hours", 4.0))
    days = int(req.get("days_available", 4))
    subtasks = assignment_agent.auto_decompose_assignment(title, description, difficulty, est_hours, days)
    return {"title": title, "subtasks": subtasks}
