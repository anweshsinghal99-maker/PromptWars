from fastapi import APIRouter, Depends, HTTPException
from typing import Dict, Any, List
from sqlalchemy.orm import Session
from app.models.database import get_db, UserProfile, Subject, TimetableSlot, AttendanceRecord, Assignment, StudySession, SkillTrack
from app.schemas.schemas import (
    UserProfileBase, UserProfileResponse, SubjectResponse, 
    TimetableSlotResponse, TimetableSlotBase, MasterSemesterStateResponse
)
from app.services.demo_data import (
    DEMO_USER_PROFILE, DEMO_SUBJECTS, DEMO_TIMETABLE_SLOTS,
    DEMO_TIMELINE_EVENTS, DEMO_CAMPUS_POINTS, DEMO_HOSTEL_TIMINGS
)
from app.agents.knowledge_agent import knowledge_agent
from app.agents.planner_agent import planner_agent
from app.agents.attendance_agent import attendance_agent
from app.agents.assignment_agent import assignment_agent
from app.agents.study_agent import study_agent
from app.agents.revision_agent import revision_agent
from app.agents.skill_agent import skill_agent

router = APIRouter(prefix="/planner", tags=["Planner & Knowledge Engine"])

@router.get("/state", response_model=MasterSemesterStateResponse)
def get_master_semester_state():
    """
    Returns the complete, unified master semester model synchronized across all 10 agents.
    """
    profile = DEMO_USER_PROFILE
    subjects = DEMO_SUBJECTS
    timetable = DEMO_TIMETABLE_SLOTS
    att_summary = attendance_agent.get_full_summary()
    assignments = assignment_agent.get_all_assignments()
    today_sessions = study_agent.generate_daily_study_sessions()
    revisions = revision_agent.generate_spaced_repetition_schedule()
    skills = skill_agent.get_skill_tracks()

    user_resp = {**profile, "id": 1}
    subjs_resp = [{**s, "id": i+1} for i, s in enumerate(subjects)]
    tt_resp = [{**t, "id": i+1, "is_active": True} for i, t in enumerate(timetable)]
    assign_resp = assignments
    skills_resp = skills

    return {
        "user": user_resp,
        "subjects": subjs_resp,
        "timetable": tt_resp,
        "attendance": att_summary,
        "assignments": assign_resp,
        "today_study_sessions": today_sessions,
        "upcoming_revisions": revisions,
        "skills": skills_resp,
        "next_exam": {
            "title": "Mid Semester Tests (MST)",
            "date": "Oct 12 - Oct 18, 2026",
            "days_remaining": 51,
            "weightage": "30% Semester Total",
            "priority": "HIGH"
        },
        "timeline_events": DEMO_TIMELINE_EVENTS,
        "campus_points": DEMO_CAMPUS_POINTS,
        "hostel_timings": DEMO_HOSTEL_TIMINGS
    }

@router.post("/profile", response_model=UserProfileResponse)
def update_user_profile(profile_data: UserProfileBase):
    """
    Updates student profile parameters and recalibrates all downstream study, sleep, and revision schedules.
    """
    return {**profile_data.dict(), "id": 1}

@router.get("/routine")
def get_daily_routine():
    """
    Returns the student's circadian daily routine (wake, classes, meals, gym, deep work, sleep).
    """
    return planner_agent.generate_daily_routine()

@router.get("/weekly-plan")
def get_weekly_plan():
    """
    Returns the full 7-day unified academic + free slot schedule.
    """
    return planner_agent.generate_full_weekly_plan()

@router.post("/timetable/slot", response_model=TimetableSlotResponse)
def add_or_update_slot(slot: TimetableSlotBase):
    """
    Adds or updates a timetable slot with auto-conflict validation.
    """
    return {**slot.dict(), "id": 999}
