from typing import Dict, Any, List
from datetime import datetime
from app.services.demo_data import (
    DEMO_USER_PROFILE, DEMO_SUBJECTS, DEMO_TIMETABLE_SLOTS, 
    DEMO_ATTENDANCE, DEMO_ASSIGNMENTS, DEMO_SKILLS, DEMO_TIMELINE_EVENTS
)
from app.agents.attendance_agent import attendance_agent

class HandbookGeneratorAgent:
    """
    Agent 9: Handbook Generator
    Responsibilities:
    - Generates a complete 15-section, highly structured, executive Semester Handbook.
    - Synchronizes all modules (Syllabus, Timetable, Attendance, Assignments, Skills, Revision, Exams).
    - Formats content for interactive reading in UI and high-resolution PDF export.
    """

    def __init__(self):
        pass

    def generate_full_handbook(self, profile: Dict[str, Any] = None) -> Dict[str, Any]:
        p = profile or DEMO_USER_PROFILE
        now_str = datetime.utcnow().strftime("%B %d, %Y")
        att_summary = attendance_agent.get_full_summary()

        sections = [
            {
                "page_number": 1,
                "section_id": "overview",
                "title": "Section 1: Semester Executive Overview",
                "subtitle": f"{p['university']} • {p['branch']} • {p['semester']}",
                "content_markdown": (
                    f"### Welcome to your AI-Optimized Academic Blueprint\n\n"
                    f"This Semester Handbook is an autonomous operational plan tailored for **{p['name']}**. "
                    f"It integrates your **{len(DEMO_SUBJECTS)} academic courses**, **20.0 Total Credits**, "
                    f"daily timetable constraints, attendance thresholds, and placement preparation targets into a single harmonized schedule.\n\n"
                    f"- **Current CGPA:** `{p['current_cgpa']}` → **Target CGPA:** `{p['target_cgpa']}`\n"
                    f"- **Attendance Benchmark:** `{p['attendance_goal_pct']}% Minimum`\n"
                    f"- **Daily Study Budget:** `{p['daily_study_hours']} Hours ({p['study_style']})`\n"
                    f"- **Primary Career Focus:** `{', '.join(p['career_goals'])}`\n"
                ),
                "callouts": [
                    "🚀 Core Principle: The planner is the single source of truth. Every study session, assignment subtask, and revision cycle updates automatically."
                ],
                "tables": []
            },
            {
                "page_number": 2,
                "section_id": "subjects_matrix",
                "title": "Section 2: Subject Matrix & Credit Breakdown",
                "subtitle": "Complete Course Scheme & L-T-P Distribution",
                "content_markdown": (
                    "Below is your officially registered course scheme for **Semester-I (B.E. DS & AI)**, "
                    "including theoretical lectures, tutorial discussion hours, and laboratory hands-on sessions."
                ),
                "callouts": [
                    "💡 High-Credit Notice: UES013 (4.5 Cr) and UCB009/UES103 (4.0 Cr each) constitute over 60% of your total GPA weightage."
                ],
                "tables": [
                    {
                        "headers": ["Course Code", "Course Name", "Category", "L-T-P", "Credits", "Difficulty"],
                        "rows": [
                            [s["code"], s["name"], s["category"], f"{s['l_hours']}-{s['t_hours']}-{s['p_hours']}", str(s["credits"]), f"{s['difficulty_score']} / 5.0"]
                            for s in DEMO_SUBJECTS
                        ]
                    }
                ]
            },
            {
                "page_number": 3,
                "section_id": "faculty_locations",
                "title": "Section 3: Faculty & Classroom Directory",
                "subtitle": "Campus Venues, Laboratories & Tutorial Rooms",
                "content_markdown": (
                    "Locate your classes effortlessly. All lecture halls, science labs, and tutorial rooms are mapped to your daily schedule."
                ),
                "callouts": [
                    "📍 Quick Tip: Thursday tutorials take place in **E311 (Electronics Block)**, while Computer Labs are held in **PL-2 (Computer Center)**."
                ],
                "tables": [
                    {
                        "headers": ["Course Code", "Subject", "Lead Instructor", "Lecture Hall", "Practical Lab / Tutorial"],
                        "rows": [
                            [s["code"], s["name"], s["faculty_name"], s["classroom"], s["lab_room"]]
                            for s in DEMO_SUBJECTS
                        ]
                    }
                ]
            },
            {
                "page_number": 4,
                "section_id": "goals",
                "title": "Section 4: Academic & CGPA Goals",
                "subtitle": "Grade Targets, Weightages & Milestone Strategy",
                "content_markdown": (
                    f"To achieve your target **CGPA of {p['target_cgpa']}**, the minimum grade threshold across all 4.0+ credit courses is **A / A+**. "
                    f"Our evaluation algorithm allocates 30% of study time to continuous sessional mastery, 30% to Mid-Semester Tests (MST), and 40% to End-Semester Tests (EST)."
                ),
                "callouts": [
                    "🎯 Minimum Sessional Score: Target >= 26/30 in all lab reports and classroom quizzes to build an untouchable GPA safety buffer."
                ],
                "tables": [
                    {
                        "headers": ["Evaluation Component", "Weightage", "Target Score", "Preparation Strategy"],
                        "rows": [
                            ["Mid Semester Tests (MST)", "30%", ">= 27/30", "Early week 5 question bank drills and theorem derivations."],
                            ["End Semester Tests (EST)", "40%", ">= 36/40", "Comprehensive past 5-year paper solving & spaced repetition review."],
                            ["Internal Sessionals & Labs", "30%", ">= 28/30", "Timely code submissions, clean documentation, 100% lab attendance."]
                        ]
                    }
                ]
            },
            {
                "page_number": 5,
                "section_id": "textbooks",
                "title": "Section 5: Textbooks & Reference Literature",
                "subtitle": "Recommended Standard Academic Books",
                "content_markdown": (
                    "Official curriculum literature recommended by the Board of Studies (TIET 2024 Scheme):"
                ),
                "callouts": [],
                "tables": [
                    {
                        "headers": ["Course", "Primary Textbook", "Secondary Reference"],
                        "rows": [
                            ["UES103 (PPS)", "Kernighan & Ritchie: C Programming Language (2nd ed)", "Balagurusamy: Programming in ANSI C (8th ed)"],
                            ["UES013 (EEE)", "Hughes: Electrical & Electronic Technology (10th ed)", "Boylestad: Electronic Devices & Circuit Theory"],
                            ["UMA022 (Calculus)", "Thomas & Finney: Calculus & Analytic Geometry (9th ed)", "James Stewart: Essential Calculus (6th ed)"],
                            ["UCB009 (Chemistry)", "Vairam & Ramesh: Engineering Chemistry (Wiley)", "Maheswaramma: Engineering Chemistry (Pearson)"],
                            ["UEN008 (Environment)", "Moaveni: Energy, Environment & Sustainability", "Rajagopalan: Environmental Studies (OUP)"],
                            ["UAI101 (AI Foundation)", "Mohri et al.: Foundations of Machine Learning (MIT Press)", "Alpaydin: Intro to Machine Learning (MIT Press)"]
                        ]
                    }
                ]
            },
            {
                "page_number": 6,
                "section_id": "exam_timeline",
                "title": "Section 6: Exam Timeline & Key Milestones",
                "subtitle": "MST, EST, Lab Vivas & Hackathon Calendar",
                "content_markdown": (
                    "Chronological semester milestones synchronized with the institute academic calendar:"
                ),
                "callouts": [
                    "⚠️ Critical Window: October 12 - 18 is Mid-Sem exam week. All skill tracks automatically yield priority to academic review during this period."
                ],
                "tables": [
                    {
                        "headers": ["Milestone Event", "Date Span", "Focus Scope", "Status"],
                        "rows": [
                            [e["title"], e["date"], e["focus"], e["status"].upper()]
                            for e in DEMO_TIMELINE_EVENTS
                        ]
                    }
                ]
            },
            {
                "page_number": 7,
                "section_id": "weekly_timetable",
                "title": "Section 7: Master Weekly Timetable",
                "subtitle": "Synchronized Class Grid (Monday to Friday)",
                "content_markdown": (
                    "Your weekly academic footprint consisting of 24 contact hours across classrooms and labs."
                ),
                "callouts": [
                    "🗓️ Friday Highlight: Morning 09:40-11:20 Electrical Lab in B105, followed by Energy & Environment and Chemistry."
                ],
                "tables": [
                    {
                        "headers": ["Day", "08:00 - 10:30", "10:30 - 13:00", "13:00 - 16:20", "17:10 - 18:50"],
                        "rows": [
                            ["Monday", "UES013 (08:50), UMA022 (09:40)", "UES103 (10:30), Lab (11:20)", "CBTL Chem Lab (15:30)", "UCB009 (17:10), UMA022 (18:00)"],
                            ["Tuesday", "UMA022 (08:00), UES013 (08:50)", "Free Study Gap", "UES103 (14:40), UCB009, UAI101", "UES103 (17:10), UCB009 (18:00)"],
                            ["Wednesday", "UES013 (08:00), UMA022 (08:50)", "Deep Work Window", "UCB009 (15:30)", "UMA022 (17:10), UES103 (18:00)"],
                            ["Thursday", "Morning Skill Practice", "UEN008 (13:00), UAI101 (13:50)", "UES103 (14:40), EEE Tut, Calc Tut", "UCB009 (17:10), UMA022 (18:00)"],
                            ["Friday", "EEE Lab (09:40-11:20)", "UEN008 (11:20), UCB009 (12:10)", "Free Lab Recovery Gap", "UES013 (17:10), UES103 (18:00)"]
                        ]
                    }
                ]
            },
            {
                "page_number": 8,
                "section_id": "daily_routine",
                "title": "Section 8: Daily Circadian Routine",
                "subtitle": "Sleep, Meals, Classes, Study Blocks & Fitness",
                "content_markdown": (
                    f"Optimized for your **{p['chronotype']}** profile and hostel schedule:\n\n"
                    f"- **07:00 AM:** Wake-up, rehydrate, and quick review\n"
                    f"- **08:30 AM:** Mess Breakfast\n"
                    f"- **08:50 - 18:00:** University classes & lab practicals\n"
                    f"- **18:45 - 19:30:** {p['fitness_goals']}\n"
                    f"- **19:30 - 20:30:** Hostel Mess Dinner\n"
                    f"- **21:30 - 23:30:** **Deep Work Academic Focus Block (C & Electrical)**\n"
                    f"- **23:30 - 01:00:** **DSA & Agentic AI Skill Mastery**\n"
                    f"- **01:00 AM:** Sleep & recovery\n"
                ),
                "callouts": [
                    "🌙 Chronotype Advantage: Deep work blocks are positioned after 21:30 when campus noise is lowest and focus is peak."
                ],
                "tables": []
            },
            {
                "page_number": 9,
                "section_id": "attendance_strategy",
                "title": "Section 9: Attendance Strategy & Bunk Policy",
                "subtitle": "Safe Bunks, Danger Thresholds & Recovery Forecast",
                "content_markdown": (
                    f"Institute mandatory attendance is **75%**. Your current overall standing is **{att_summary['overall_percentage']}%** "
                    f"({att_summary['total_attended']}/{att_summary['total_held']} lectures attended).\n\n"
                    f"**Subject Attendance Breakdown:**"
                ),
                "callouts": [
                    f"🚨 Active Danger Warning: Electrical & Electronics (UES013) is currently at 72.7%. You must attend the next 2 lectures to cross the 75% safe zone."
                ],
                "tables": [
                    {
                        "headers": ["Course Code", "Subject Name", "Attended / Total", "Current %", "Safe Bunks", "Status"],
                        "rows": [
                            [d["subject_code"], d["subject_name"], f"{d['attended_classes']}/{d['total_classes']}", f"{d['current_percentage']}%", str(d["safe_bunks"]), "🚨 AT RISK" if d["danger_threshold"] else "✅ SAFE"]
                            for d in att_summary["subject_details"]
                        ]
                    }
                ]
            },
            {
                "page_number": 10,
                "section_id": "assignment_strategy",
                "title": "Section 10: Assignment Strategy & Auto-Split Schedule",
                "subtitle": "Deconstructed Milestones to Prevent Deadline Crunch",
                "content_markdown": (
                    "Rather than cramming the night before, the Assignment Agent auto-splits multi-hour projects into 40-90 minute daily tasks."
                ),
                "callouts": [
                    "📋 Rule of Thumb: Complete the 'Scope & Theory' subtask on the day an assignment is released."
                ],
                "tables": [
                    {
                        "headers": ["Assignment Title", "Subject", "Estimated Time", "Priority", "Status"],
                        "rows": [
                            [a["title"], a["subject_code"], f"{a['estimated_hours']} hrs", a["priority"], a["status"].upper()]
                            for a in DEMO_ASSIGNMENTS
                        ]
                    }
                ]
            },
            {
                "page_number": 11,
                "section_id": "skill_roadmap",
                "title": "Section 11: Non-Academic Skill Roadmap",
                "subtitle": "DSA, Agentic AI & Full Stack Career Tracks",
                "content_markdown": (
                    "These tracks run strictly in designated evening and weekend slots to ensure your academics remain undisturbed."
                ),
                "callouts": [
                    "⚡ Industry Readiness: Completing the NeetCode 150 + Agentic AI state graphs puts you in the top 1% of 1st-year engineering students."
                ],
                "tables": [
                    {
                        "headers": ["Skill Track", "Weekly Allocation", "Hours Completed", "Current Milestone"],
                        "rows": [
                            [s["name"], f"{s['target_hours_per_week']} hrs/wk", f"{s['total_hours_completed']} hrs", s["roadmap_milestones"][s["current_milestone_index"]]["title"]]
                            for s in DEMO_SKILLS
                        ]
                    }
                ]
            },
            {
                "page_number": 12,
                "section_id": "revision_plan",
                "title": "Section 12: Spaced Repetition Revision Plan",
                "subtitle": "Ebbinghaus Forgetting Curve Schedule (1, 3, 7, 14 Days)",
                "content_markdown": (
                    "Spaced retrieval ensures maximum long-term synaptic consolidation so you do not have to re-learn entire syllabi before MST/EST."
                ),
                "callouts": [
                    "🧠 Spaced Repetition Rule: 20 minutes of review on Day 1 + Day 3 + Day 7 replaces 6 hours of stressful cramming before exams."
                ],
                "tables": [
                    {
                        "headers": ["Interval", "Concept / Topic", "Target Course", "Cognitive Focus"],
                        "rows": [
                            ["1-Day Review", "C Recursion & Stack Frames", "UES103", "Recall function call mechanics and base case conditions."],
                            ["3-Day Review", "Double Integrals in Polar Coords", "UMA022", "Re-derive Jacobian transformation r dr dθ without notes."],
                            ["7-Day Review", "Thevenin & Norton Equivalence", "UES013", "Solve 2 unattempted complex circuit problems."],
                            ["14-Day Review", "Spectroscopy & Beer-Lambert Law", "UCB009", "Review spectrophotometer equations and error calibration."]
                        ]
                    }
                ]
            },
            {
                "page_number": 13,
                "section_id": "emergency_buffer",
                "title": "Section 13: Emergency Catch-Up & Buffer Days",
                "subtitle": "Contingency Protocols for Illness, Hackathons & Travel",
                "content_markdown": (
                    "Every Saturday afternoon (14:00 - 17:00) is designated as an **Autonomous Buffer Window**.\n\n"
                    "- If all weekly assignment subtasks and spaced revisions are on schedule, this window is awarded as free guilt-free leisure.\n"
                    "- If illness, unexpected university events, or hackathons disrupt the week, the buffer slot absorbs the deficit without shifting weekday sleep."
                ),
                "callouts": [
                    "🛡️ Burnout Prevention: Never borrow sleep time to catch up. Use the designated Saturday buffer window."
                ],
                "tables": []
            },
            {
                "page_number": 14,
                "section_id": "exam_checklist",
                "title": "Section 14: Exam Week Checklist & Sprint Strategy",
                "subtitle": "7-Day Tactical Checklist for MST & EST",
                "content_markdown": (
                    "### T-Minus 7 Days to Exam Sprint:\n"
                    "1. **T-7:** Consolidate all textbook CLO summaries into a 2-page cheat sheet.\n"
                    "2. **T-5:** Solve previous 3 years' question papers under 2-hour timed conditions.\n"
                    "3. **T-3:** Review all marked tutorial problem errors with your study group.\n"
                    "4. **T-2:** Run flashcard formulas (Calculus partial integrals, EEE circuit laws).\n"
                    "5. **T-1:** Pack stationary, approved non-programmable calculator, student ID; sleep by 23:00."
                ),
                "callouts": [
                    "📝 Exam Hall Rule: Read all questions for 5 minutes before writing; attempt highest credit/mark questions first."
                ],
                "tables": []
            },
            {
                "page_number": 15,
                "section_id": "motivation_summary",
                "title": "Section 15: One-Page Motivation & Closing Creed",
                "subtitle": "Consistency Trumps Intensity",
                "content_markdown": (
                    f"### Dear {p['name']},\n\n"
                    f"Excellence in engineering and artificial intelligence is not an act of sudden brilliance—it is the compounded return on consistent daily habits.\n\n"
                    f"> *\"We are what we repeatedly do. Excellence, then, is not an act, but a habit.\"*\n\n"
                    f"You have an optimized schedule, a structured attendance safety net, active spaced repetition, and an autonomous copilot in your corner. "
                    f"Stick to the plan, protect your sleep, execute one day at a time, and finish this semester with the **{p['target_cgpa']} CGPA** you deserve.\n\n"
                    f"**Generated by Semester Copilot • {now_str}**"
                ),
                "callouts": [
                    "⭐ Believe in the compound effect of small, deliberate efforts."
                ],
                "tables": []
            }
        ]

        return {
            "university": p["university"],
            "program": p["branch"],
            "semester": p["semester"],
            "student_name": p["name"],
            "generated_at": now_str,
            "sections": sections
        }

handbook_agent = HandbookGeneratorAgent()
