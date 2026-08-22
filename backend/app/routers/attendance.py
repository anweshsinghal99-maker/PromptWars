from fastapi import APIRouter, HTTPException
from typing import Dict, Any
from app.schemas.schemas import AttendanceSummaryResponse, BunkSimulationRequest, BunkSimulationResponse
from app.agents.attendance_agent import attendance_agent

router = APIRouter(prefix="/attendance", tags=["Attendance & Bunk Agent"])

@router.get("/summary", response_model=AttendanceSummaryResponse)
def get_attendance_summary():
    """
    Returns subject-wise attendance stats, safe bunks, danger flags, and recovery needs.
    """
    return attendance_agent.get_full_summary()

@router.post("/simulate-bunk", response_model=BunkSimulationResponse)
def simulate_bunk_scenario(req: BunkSimulationRequest):
    """
    Predicts attendance % and remaining safe bunks if the student skips X classes.
    """
    return attendance_agent.simulate_bunk(req.subject_code, req.skips_planned)
