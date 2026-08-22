from typing import Dict, Any, List
from app.services.demo_data import DEMO_SKILLS

class SkillPlannerAgent:
    """
    Agent 8: Skill Planner & Resource Recommendation Engine
    Responsibilities:
    - Analyzes student career & skill goals (DSA, Agentic AI, FullStack, etc.).
    - Maps out structured, milestone-driven technical learning roadmaps.
    - Allocates free evening & weekend study hours strictly without conflicting with academic courses.
    - Curates 100% free high-quality learning resources (NeetCode, MIT OCW, Roadmap.sh, LangChain Docs).
    """

    def __init__(self):
        pass

    def get_skill_tracks(self) -> List[Dict[str, Any]]:
        tracks = []
        for i, s in enumerate(DEMO_SKILLS):
            milestones = s["roadmap_milestones"]
            completed_count = sum(1 for m in milestones if m.get("status") == "completed")
            pct = round((completed_count / len(milestones)) * 100.0, 1) if milestones else 0.0

            tracks.append({
                "id": i + 1,
                "name": s["name"],
                "category": s["category"],
                "target_hours_per_week": s["target_hours_per_week"],
                "total_hours_completed": s["total_hours_completed"],
                "roadmap_milestones": milestones,
                "curated_resources": s["curated_resources"],
                "current_milestone_index": s["current_milestone_index"],
                "progress_percentage": pct
            })
        return tracks

    def get_recommended_resources(self, topic: str = "") -> List[Dict[str, Any]]:
        all_resources = []
        for s in DEMO_SKILLS:
            for r in s.get("curated_resources", []):
                all_resources.append({**r, "skill": s["name"]})
        
        # Additional curated global repositories
        global_resources = [
            {"title": "CS50 Introduction to Computer Science (Harvard)", "url": "https://cs50.harvard.edu/x/", "platform": "edX / Harvard", "is_free": True, "skill": "Computer Science Core"},
            {"title": "NPTEL: Programming, Data Structures and Algorithms in Python", "url": "https://nptel.ac.in/courses/106106145", "platform": "NPTEL", "is_free": True, "skill": "DSA & Python"},
            {"title": "Full Stack Open (University of Helsinki)", "url": "https://fullstackopen.com/en/", "platform": "Univ. of Helsinki", "is_free": True, "skill": "Full Stack Web Development"},
            {"title": "Model Context Protocol (MCP) Quickstart & Specs", "url": "https://modelcontextprotocol.io/", "platform": "Anthropic Official", "is_free": True, "skill": "Agentic AI"},
            {"title": "Deep Learning Specialization (Andrew Ng)", "url": "https://www.coursera.org/specializations/deep-learning", "platform": "Coursera / DeepLearning.AI", "is_free": True, "skill": "Machine Learning"}
        ]
        return all_resources + global_resources

skill_agent = SkillPlannerAgent()
