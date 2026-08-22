from typing import Dict, Any, List
from datetime import datetime, timedelta
from app.services.demo_data import DEMO_ASSIGNMENTS

class AssignmentAgent:
    """
    Agent 5: Assignment Agent
    Responsibilities:
    - Track assignments, deadlines, priority, and difficulty.
    - Automatically decompose large assignments into daily actionable sub-tasks.
    - Balance workload across remaining days until deadline.
    - Provide Kanban board lifecycle (pending -> doing -> completed).
    """

    def __init__(self):
        pass

    def auto_decompose_assignment(self, title: str, description: str, difficulty: str, estimated_hours: float, days_available: int = 4) -> List[Dict[str, Any]]:
        """
        Deconstructs an assignment topic into logical daily subtasks.
        """
        days_available = max(2, min(days_available, 6))
        subtasks = []

        mins_total = int(estimated_hours * 60)
        daily_mins = mins_total // days_available

        subtask_templates = [
            ("Day 1: Scope & Theory Architecture", "Review CLOs, read required textbook sections, and formulate initial skeleton/outline."),
            ("Day 2: Implementation & Core Mechanics", "Code the primary algorithms / draft main equations and solve test problems."),
            ("Day 3: Verification & Edge Cases", "Run test cases, verify numerical bounds, review against evaluation rubric."),
            ("Day 4: Final Documentation & Submission Prep", "Format document, compile source code/charts, review plagiarism and submit.")
        ]

        for i in range(days_available):
            day_num = i + 1
            if i < len(subtask_templates):
                t_name, t_desc = subtask_templates[i]
            else:
                t_name = f"Day {day_num}: Milestone Refinement"
                t_desc = f"Continue detailed progress and review of {title}."

            subtasks.append({
                "id": f"sub-{day_num}-{int(datetime.utcnow().timestamp())}",
                "day": f"Day {day_num}",
                "title": f"{t_name} - {t_desc}",
                "estimated_mins": daily_mins,
                "is_done": False
            })

        return subtasks

    def get_all_assignments(self) -> List[Dict[str, Any]]:
        assignments = []
        now = datetime.utcnow()
        for a in DEMO_ASSIGNMENTS:
            deadline = now + timedelta(days=a.get("days_from_now", 3))
            assignments.append({
                "id": len(assignments) + 1,
                "subject_code": a["subject_code"],
                "title": a["title"],
                "description": a["description"],
                "deadline": deadline.isoformat(),
                "priority": a["priority"],
                "difficulty": a["difficulty"],
                "estimated_hours": a["estimated_hours"],
                "completion_pct": a["completion_pct"],
                "status": a["status"],
                "subtasks": a["subtasks"]
            })
        return assignments

assignment_agent = AssignmentAgent()
