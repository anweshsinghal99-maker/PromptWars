from typing import Dict, Any, List
from app.services.demo_data import (
    DEMO_SUBJECTS, DEMO_TIMETABLE_SLOTS, DEMO_CAMPUS_POINTS, 
    DEMO_HOSTEL_TIMINGS, DEMO_TIMELINE_EVENTS
)

class KnowledgeBuilderAgent:
    """
    Agent 2: Knowledge Builder
    Responsibilities:
    - Ingest structured documents from Agent 1 (Course scheme, Timetable, Calendar, Rules, Map).
    - Construct a unified Knowledge Graph / Semester Model.
    - Resolve references across entities (e.g. mapping Course Code -> Room -> Timetable -> Lab Schedule).
    - Provide queryable graph interfaces for all downstream agents.
    """

    def __init__(self):
        self.graph = {}

    def build_knowledge_graph(
        self,
        subjects: List[Dict[str, Any]] = None,
        timetable_slots: List[Dict[str, Any]] = None,
        campus_points: List[Dict[str, Any]] = None,
        hostel_rules: Dict[str, Any] = None,
        timeline_events: List[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        subjects = subjects or DEMO_SUBJECTS
        timetable_slots = timetable_slots or DEMO_TIMETABLE_SLOTS
        campus_points = campus_points or DEMO_CAMPUS_POINTS
        hostel_rules = hostel_rules or DEMO_HOSTEL_TIMINGS
        timeline_events = timeline_events or DEMO_TIMELINE_EVENTS

        # Subject Lookup index
        subject_map = {s["code"]: s for s in subjects}

        # Day wise timetable index
        day_schedule = {
            "Monday": [], "Tuesday": [], "Wednesday": [], "Thursday": [], "Friday": []
        }
        for slot in timetable_slots:
            day = slot.get("day_of_week", "Monday")
            if day in day_schedule:
                # enrich slot with subject metadata
                code = slot.get("subject_code")
                subj_meta = subject_map.get(code, {})
                enriched_slot = {
                    **slot,
                    "credits": subj_meta.get("credits", 4.0),
                    "faculty": subj_meta.get("faculty_name", "Prof. Faculty"),
                    "difficulty_score": subj_meta.get("difficulty_score", 3.5),
                    "category": subj_meta.get("category", "Core")
                }
                day_schedule[day].append(enriched_slot)

        # Sort slots by start_time
        for day in day_schedule:
            day_schedule[day] = sorted(day_schedule[day], key=lambda x: x["start_time"])

        # Construct unified graph
        self.graph = {
            "version": "2.0",
            "subjects": subject_map,
            "day_schedule": day_schedule,
            "campus_points": campus_points,
            "hostel_rules": hostel_rules,
            "timeline_events": timeline_events,
            "total_credits": sum(s.get("credits", 0) for s in subjects),
            "total_weekly_lectures": len(timetable_slots)
        }
        return self.graph

    def get_subject(self, code: str) -> Dict[str, Any]:
        return self.graph.get("subjects", {}).get(code, {})

    def get_day_classes(self, day: str) -> List[Dict[str, Any]]:
        return self.graph.get("day_schedule", {}).get(day, [])

knowledge_agent = KnowledgeBuilderAgent()
