from typing import Dict, Any, List
from app.agents.knowledge_agent import knowledge_agent
from app.services.demo_data import DEMO_USER_PROFILE, DEMO_TIMETABLE_SLOTS

class PlannerAgent:
    """
    Agent 3: Planner Agent (The Brain)
    Responsibilities:
    - Generates master semester roadmap.
    - Synchronizes daily and weekly study blocks with academic timetable.
    - Computes free slots, buffer days, exam prep slots, and circadian sleep-wake schedule.
    - Enforces student preferences (Pomodoro vs Deep Work, Morning vs Night learner).
    """

    def __init__(self):
        pass

    def generate_daily_routine(self, profile: Dict[str, Any] = None) -> List[Dict[str, Any]]:
        profile = profile or DEMO_USER_PROFILE
        wake = profile.get("wake_time", "07:00")
        sleep = profile.get("sleep_time", "23:30")
        chronotype = profile.get("chronotype", "Night learner")
        study_style = profile.get("study_style", "Deep Work")

        if chronotype == "Morning learner":
            routine = [
                {"time": wake, "activity": "Wake up, Hydration & Morning Sunlight", "category": "Wellness"},
                {"time": "07:30 - 08:30", "activity": "High-Energy Deep Study (Challenging Subjects / Calculus)", "category": "Academic Study"},
                {"time": "08:30 - 09:00", "activity": "Hostel Breakfast (Mess O/K)", "category": "Meal"},
                {"time": "09:00 - 17:00", "activity": "Academic Classes, Lectures & Practical Labs", "category": "Classes"},
                {"time": "17:30 - 18:30", "activity": "Fitness / Gym / Evening Walk", "category": "Fitness"},
                {"time": "19:00 - 20:30", "activity": "Skill Roadmap (DSA / Agentic AI Practice)", "category": "Skill Development"},
                {"time": "20:30 - 21:30", "activity": "Hostel Dinner & Social Connection", "category": "Meal"},
                {"time": "21:30 - 22:30", "activity": "Spaced Repetition Review & Next Day Prep", "category": "Revision"},
                {"time": sleep, "activity": "Wind-down & Sleep", "category": "Rest"}
            ]
        else: # Night learner default
            routine = [
                {"time": wake, "activity": "Wake up, Cold Water & Quick Stretch", "category": "Wellness"},
                {"time": "07:30 - 08:30", "activity": "Hostel Breakfast & Quick CLO Review", "category": "Meal"},
                {"time": "08:50 - 17:00", "activity": "Core Academic Classes, Labs & Tutorials", "category": "Classes"},
                {"time": "17:10 - 18:50", "activity": "Late Afternoon Theory Class / Problem Solving", "category": "Classes"},
                {"time": "19:00 - 20:00", "activity": "Evening Gym / Cardio Recharge", "category": "Fitness"},
                {"time": "20:00 - 21:00", "activity": "Hostel Dinner (Mess Timings)", "category": "Meal"},
                {"time": "21:30 - 23:30", "activity": "Deep Work Peak: Dynamic Programming & C Projects", "category": "Academic Study"},
                {"time": "23:30 - 01:00", "activity": "Skill Building & LangGraph Agentic AI Modules", "category": "Skill Development"},
                {"time": sleep, "activity": "Wind-down & Circadian Sleep", "category": "Rest"}
            ]
        return routine

    def compute_free_slots_for_day(self, day: str, timetable_slots: List[Dict[str, Any]] = None) -> List[Dict[str, Any]]:
        slots = timetable_slots or DEMO_TIMETABLE_SLOTS
        day_classes = [s for s in slots if s.get("day_of_week", "").lower() == day.lower()]
        
        # Standard day working hours: 08:00 to 20:00
        # Determine free windows
        occupied_times = []
        for c in day_classes:
            occupied_times.append((c["start_time"], c["end_time"]))
        
        # Simplified available slot finder
        candidate_slots = [
            {"start": "08:00", "end": "08:50", "name": "Early Morning Window"},
            {"start": "13:00", "end": "14:40", "name": "Mid-day Free Gap"},
            {"start": "16:20", "end": "17:10", "name": "Late Afternoon Window"},
            {"start": "19:00", "end": "21:00", "name": "Prime Evening Study Block"},
            {"start": "21:30", "end": "23:30", "name": "Night Deep Work Window"}
        ]
        
        free_windows = []
        for cand in candidate_slots:
            is_occupied = False
            for start, end in occupied_times:
                # check overlap
                if not (cand["end"] <= start or cand["start"] >= end):
                    is_occupied = True
                    break
            if not is_occupied:
                free_windows.append({
                    "start_time": cand["start"],
                    "end_time": cand["end"],
                    "suggested_use": "DSA / Spaced Revision" if "Night" in cand["name"] or "Evening" in cand["name"] else "Lunch / Buffer Rest"
                })
        return free_windows

    def generate_full_weekly_plan(self, profile: Dict[str, Any] = None) -> Dict[str, Any]:
        days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        weekly_plan = {}
        for day in days:
            free = self.compute_free_slots_for_day(day) if day not in ["Saturday", "Sunday"] else [
                {"start_time": "10:00", "end_time": "13:00", "suggested_use": "Weekend Hackathon / Project Milestone"},
                {"start_time": "15:00", "end_time": "18:00", "suggested_use": "Weekly Spaced Repetition (All Subjects)"},
                {"start_time": "20:00", "end_time": "22:00", "suggested_use": "Skill Roadmap: Agentic AI / LangGraph"}
            ]
            weekly_plan[day] = {
                "academic_classes": knowledge_agent.get_day_classes(day),
                "free_and_study_slots": free
            }
        return weekly_plan

planner_agent = PlannerAgent()
