import os
import re
from typing import Dict, Any, List, Optional
from datetime import datetime
from app.services.demo_data import (
    DEMO_USER_PROFILE, DEMO_SUBJECTS, DEMO_TIMETABLE_SLOTS, 
    DEMO_ATTENDANCE, DEMO_ASSIGNMENTS, DEMO_CAMPUS_POINTS
)
from app.agents.attendance_agent import attendance_agent
from app.agents.study_agent import study_agent
from app.services.gemini_service import gemini_service

class ChatCopilotAgent:
    """
    Agent 10: AI Chat Copilot
    Answers questions accurately based on the student's unified semester model:
    - "Where is my class?"
    - "Today's schedule"
    - "Remaining assignments"
    - "Next exam"
    - "Can I skip tomorrow?"
    - "When should I revise DSA?"
    - "What should I study tonight?"
    """

    def __init__(self):
        pass

    def process_query(self, query: str, context_day: Optional[str] = None, context_time: Optional[str] = None) -> Dict[str, Any]:
        q = query.strip().lower()
        now = datetime.now()
        day_name = context_day or now.strftime("%A")
        if day_name not in ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]:
            day_name = "Monday"

        # 1. "Where is my class?" / Location queries
        if any(k in q for k in ["where", "classroom", "room", "venue", "location", "hall", "lab"]):
            matched_subj = None
            for s in DEMO_SUBJECTS:
                if s["code"].lower() in q or s["name"].lower() in q or ("calculus" in q and "UMA" in s["code"]) or ("chem" in q and "UCB" in s["code"]) or ("ee" in q and "UES013" in s["code"]) or ("program" in q and "UES103" in s["code"]):
                    matched_subj = s
                    break

            if matched_subj:
                reply = (
                    f"📍 **{matched_subj['name']} ({matched_subj['code']})**\n\n"
                    f"• **Lecture Hall:** `{matched_subj['classroom']}`\n"
                    f"• **Practical / Tutorial:** `{matched_subj['lab_room']}`\n"
                    f"• **Faculty:** {matched_subj['faculty_name']}\n\n"
                    f"💡 *Navigation Note:* T105 is situated on the 1st Floor of Block A (Tan Building), while PL-2 is inside the Computer Center ground floor."
                )
                return {
                    "reply": reply,
                    "action_type": "LOCATION_LOOKUP",
                    "action_data": {"subject": matched_subj["code"], "room": matched_subj["classroom"]},
                    "quick_suggestions": ["Today's full schedule", "Can I skip this lecture?", "What should I study tonight?"]
                }
            else:
                today_slots = [s for s in DEMO_TIMETABLE_SLOTS if s["day_of_week"].lower() == day_name.lower()]
                if today_slots:
                    slot_list = "\n".join([f"• `{s['start_time']}-{s['end_time']}`: **{s['subject_name']}** at `{s['room']}` ({s['slot_type']})" for s in today_slots[:3]])
                    reply = f"📍 **Class venues for {day_name}:**\n\n{slot_list}\n\nAll lecture halls (T105, LT102) and Labs (PL-2, CBTL, B105) are active."
                else:
                    reply = f"📍 It's {day_name}! No university lectures scheduled today. Quiet study halls are open in the **Central Library** 24/7."
                return {
                    "reply": reply,
                    "action_type": "LOCATION_LOOKUP",
                    "action_data": {"day": day_name},
                    "quick_suggestions": ["Show campus map points", "What assignments are due?", "Safe bunk status"]
                }

        # 2. "Today's schedule" / Timetable queries
        if any(k in q for k in ["today's schedule", "schedule", "classes today", "timetable", "routine", "what class", "today"]):
            today_slots = [s for s in DEMO_TIMETABLE_SLOTS if s["day_of_week"].lower() == day_name.lower()]
            if today_slots:
                lines = [f"• **{s['start_time']} - {s['end_time']}**: {s['subject_name']} ({s['subject_code']}) — Room `{s['room']}` [{s['slot_type']}]" for s in today_slots]
                reply = f"🗓️ **Schedule for {day_name} ({len(today_slots)} classes):**\n\n" + "\n".join(lines) + "\n\n💡 Next class begins at the scheduled slot."
            else:
                reply = f"🗓️ **Schedule for {day_name}:**\nNo academic lectures today! It's an optimal day for project milestones, DSA practice, and spaced revision."
            
            return {
                "reply": reply,
                "action_type": "TIMETABLE_LOOKUP",
                "action_data": {"day": day_name, "count": len(today_slots)},
                "quick_suggestions": ["Can I skip Friday?", "What should I study tonight?", "Show attendance"]
            }

        # 3. "Can I skip / bunk?" / Attendance queries
        if any(k in q for k in ["skip", "bunk", "miss", "attendance", "safe bunk", "can i bunk"]):
            target_code = None
            for s in DEMO_SUBJECTS:
                if s["code"].lower() in q or ("chem" in q and "UCB" in s["code"]) or ("calc" in q and "UMA" in s["code"]) or ("ee" in q and "UES013" in s["code"]) or ("program" in q and "UES103" in s["code"]):
                    target_code = s["code"]
                    break

            if target_code:
                sim = attendance_agent.simulate_bunk(target_code, 1)
                reply = f"📊 **Attendance Analysis for {target_code}:**\n\n{sim['status_message']}"
            else:
                summary = attendance_agent.get_full_summary()
                at_risk = [d for d in summary["subject_details"] if d["danger_threshold"]]
                safe_list = [f"• **{d['subject_name']} ({d['subject_code']})**: {d['current_percentage']}% ({d['safe_bunks']} safe bunks)" for d in summary["subject_details"] if not d["danger_threshold"]]
                
                reply = f"📊 **Overall Attendance: {summary['overall_percentage']}% (Target: 75%)**\n\n"
                if at_risk:
                    reply += f"🚨 **ATTENTION - Below 75% Threshold:**\n"
                    for r in at_risk:
                        reply += f"• **{r['subject_name']} ({r['subject_code']})**: Current `{r['current_percentage']}%` — Must attend next **{r['classes_needed_for_target']} lectures**!\n"
                    reply += "\n"
                reply += "✅ **Safe Subjects:**\n" + "\n".join(safe_list[:4])

            return {
                "reply": reply,
                "action_type": "BUNK_CALCULATION",
                "action_data": {"overall": 86.8},
                "quick_suggestions": ["Simulate skipping 2 Chemistry classes", "When is next exam?", "Today's schedule"]
            }

        # 4. "What should I study tonight?" / Study sessions
        if any(k in q for k in ["study tonight", "study", "what to study", "session", "deep work", "pomodoro"]):
            sessions = study_agent.generate_daily_study_sessions()
            lines = [f"• **{s['start_time']} - {s['end_time']}** [{s['session_type']}]: **{s['subject_code']}** — *{s['topic']}*" for s in sessions]
            reply = (
                f"🧠 **Recommended Tonight Study Plan ({DEMO_USER_PROFILE['study_style']} Mode):**\n\n"
                + "\n".join(lines)
                + f"\n\n⚡ Calibrated for your {DEMO_USER_PROFILE['chronotype']} chronotype and target CGPA of {DEMO_USER_PROFILE['target_cgpa']}."
            )
            return {
                "reply": reply,
                "action_type": "STUDY_RECOMMENDATION",
                "action_data": {"sessions": sessions},
                "quick_suggestions": ["Start Pomodoro Timer", "Review upcoming assignments", "When should I revise DSA?"]
            }

        # 5. "Remaining assignments" / Deadlines
        if any(k in q for k in ["assignment", "deadline", "homework", "project", "tasks", "due"]):
            lines = [f"• **{a['title']}** ({a['subject_code']}) — Due in `{a.get('days_from_now', 3)} days` | Priority: `{a['priority']}` [{a['status'].upper()}]" for a in DEMO_ASSIGNMENTS]
            reply = f"📋 **Active Assignments & Projects ({len(DEMO_ASSIGNMENTS)} total):**\n\n" + "\n".join(lines) + "\n\n💡 Each assignment has been auto-split into daily sub-tasks in your Assignment Kanban."
            return {
                "reply": reply,
                "action_type": "ASSIGNMENTS_LOOKUP",
                "action_data": {"count": len(DEMO_ASSIGNMENTS)},
                "quick_suggestions": ["Open Kanban Board", "What should I study tonight?", "Safe bunk status"]
            }

        # 6. "Next exam" / Exam countdown
        if any(k in q for k in ["exam", "mst", "est", "test", "countdown", "mid sem", "end sem"]):
            reply = (
                "🎯 **Upcoming Examination Milestones:**\n\n"
                "• **Mid Semester Tests (MST):** `October 12 – October 18` (~50 days away) • **Weightage: 30%**\n"
                "• **End Semester Tests (EST):** `December 01 – December 15` • **Weightage: 40-45%**\n"
                "• **Internal Sessional/Lab Evaluations:** Ongoing weekly (30% weightage)\n\n"
                "💡 Spaced repetition schedules are actively aligning subject flashcards for the MST sprint."
            )
            return {
                "reply": reply,
                "action_type": "EXAM_LOOKUP",
                "action_data": {"next_exam": "MST", "date": "Oct 12-18"},
                "quick_suggestions": ["Exam checklist", "Today's schedule", "What to study tonight?"]
            }

        # 7. "When should I revise DSA?" / Skills
        if any(k in q for k in ["dsa", "skill", "agentic", "full stack", "career", "revise dsa"]):
            reply = (
                "🚀 **Skill Roadmap Allocation (Non-Academic Buffer):**\n\n"
                "• **DSA & CP:** Scheduled daily **23:45 - 00:45** (Night slot). Current milestone: *Trees & Graph Traversals (DFS/BFS)*.\n"
                "• **Agentic AI & LLMs (UCS714 Prep):** Scheduled Saturday **20:00 - 22:00**. Current milestone: *Tool Calling & MCP Protocol*.\n"
                "• **Full Stack Web Dev:** Scheduled Sunday **10:00 - 13:00**.\n\n"
                "⚡ None of these slots overlap with your university lectures or laboratory sessions."
            )
            return {
                "reply": reply,
                "action_type": "SKILL_LOOKUP",
                "action_data": {"skill": "DSA"},
                "quick_suggestions": ["Open NeetCode roadmap", "Today's schedule", "Can I skip tomorrow?"]
            }

        # Check if Gemini can augment answer
        system_context = f"Student is {DEMO_USER_PROFILE['name']} in {DEMO_USER_PROFILE['branch']} at {DEMO_USER_PROFILE['university']}. 6 courses: UES103, UES013, UMA022, UCB009, UEN008, UAI101."
        ai_resp = gemini_service.generate_chat_response(query, system_context)
        if ai_resp:
            return {
                "reply": ai_resp,
                "action_type": "AI_ENHANCED",
                "quick_suggestions": ["Where is my class?", "Can I skip tomorrow?", "What should I study tonight?", "Next exam date"]
            }

        # General intelligent assistant fallback
        reply = (
            f"🤖 **Semester Copilot Assistant**\n\n"
            f"I have your entire semester model synchronized (Timetable, Syllabi, Attendance, Assignments, and Study Plans).\n\n"
            f"You can ask me anything such as:\n"
            f"• *\"Where is my class right now?\"*\n"
            f"• *\"Can I skip tomorrow's Chemistry class?\"*\n"
            f"• *\"What should I study tonight?\"*\n"
            f"• *\"Show my remaining assignments and deadlines\"*\n"
            f"• *\"When is my next exam?\"*"
        )
        return {
            "reply": reply,
            "action_type": "GENERAL",
            "quick_suggestions": ["Where is my class?", "Can I skip tomorrow?", "What should I study tonight?", "Next exam date"]
        }

chat_copilot_agent = ChatCopilotAgent()
