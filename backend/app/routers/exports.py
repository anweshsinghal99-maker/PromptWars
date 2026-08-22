from fastapi import APIRouter, Response
from typing import Dict, Any, List
from app.schemas.schemas import SemesterHandbookResponse
from app.agents.handbook_agent import handbook_agent
from app.agents.skill_agent import skill_agent
from app.services.ics_service import ics_service
from app.services.demo_data import DEMO_TIMETABLE_SLOTS

router = APIRouter(prefix="/exports", tags=["Exports & Handbook"])

@router.get("/handbook", response_model=SemesterHandbookResponse)
def get_semester_handbook():
    """
    Returns the complete 15-section structured semester handbook.
    """
    return handbook_agent.generate_full_handbook()

@router.get("/calendar.ics")
def download_calendar_ics():
    """
    Generates a standard RFC 5545 .ics calendar feed for Google Calendar, Apple Calendar, and Outlook.
    """
    ics_content = ics_service.generate_calendar_ics(DEMO_TIMETABLE_SLOTS, user_name="Anwesh Singhal")
    return Response(
        content=ics_content,
        media_type="text/calendar",
        headers={"Content-Disposition": "attachment; filename=semester_copilot_timetable.ics"}
    )

@router.get("/resources")
def get_learning_resources():
    """
    Returns curated free documentation, NPTEL, MIT OCW, LeetCode, and Roadmap.sh learning hubs.
    """
    return skill_agent.get_recommended_resources()
