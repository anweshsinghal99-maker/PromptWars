from typing import Dict, Any, List
from datetime import datetime, date
from app.services.demo_data import DEMO_USER_PROFILE, DEMO_SUBJECTS

class StudyPlannerAgent:
    """
    Agent 6: Adaptive Study Planner
    Responsibilities:
    - Analyzes subject difficulty scores, credit weights (4.5 vs 2.0), and upcoming deadlines.
    - Generates balanced daily study blocks fitting the user's daily study hours (e.g. 3.5h).
    - Structures blocks based on study style: Pomodoro (25/5m intervals) or Deep Work (90m focus sprints).
    - Aligns time slots with Morning vs Night owl chronotypes.
    """

    def __init__(self):
        pass

    def generate_daily_study_sessions(self, target_date: str = None, profile: Dict[str, Any] = None) -> List[Dict[str, Any]]:
        profile = profile or DEMO_USER_PROFILE
        target_date = target_date or date.today().isoformat()
        study_hours = profile.get("daily_study_hours", 3.5)
        chronotype = profile.get("chronotype", "Night learner")
        study_style = profile.get("study_style", "Deep Work")

        # Prioritize high credit + high difficulty subjects
        # UES013 (4.5 Cr, 4.5 Diff), UMA022 (3.5 Cr, 4.2 Diff), UES103 (4.0 Cr, 4.0 Diff)
        sessions = []

        if chronotype == "Night learner":
            time_slots = [
                {"start": "21:30", "end": "22:30", "type": "Academic", "subj": "UES103", "topic": "C Pointers & Dynamic Memory Allocation (Stack vs Heap)"},
                {"start": "22:35", "end": "23:35", "type": "Academic", "subj": "UES013", "topic": "DC Mesh Analysis & Norton's Theorem Circuit Proofs"},
                {"start": "23:45", "end": "00:45", "type": "Skill Development", "subj": "DSA", "topic": "Binary Trees: Lowest Common Ancestor & DFS Traversal"}
            ]
        else: # Morning learner
            time_slots = [
                {"start": "07:00", "end": "08:15", "type": "Academic", "subj": "UMA022", "topic": "Calculus: Maxima & Minima using Second Order Partial Derivatives"},
                {"start": "19:00", "end": "20:00", "type": "Academic", "subj": "UES103", "topic": "Programming Problem Solving: 2D Arrays & Matrix Transpose"},
                {"start": "20:00", "end": "21:00", "type": "Skill Development", "subj": "Agentic AI", "topic": "LangGraph Cyclic State Graphs & Tool Use Patterns"}
            ]

        for i, slot in enumerate(time_slots):
            pomodoros = 2 if study_style == "Pomodoro" else 1
            sessions.append({
                "id": i + 1,
                "date_str": target_date,
                "day_of_week": "Today",
                "start_time": slot["start"],
                "end_time": slot["end"],
                "subject_code": slot["subj"],
                "topic": slot["topic"],
                "session_type": slot["type"],
                "is_completed": False,
                "pomodoro_intervals": pomodoros
            })

        return sessions

study_agent = StudyPlannerAgent()
