import pytest
from app.agents.parser_agent import parser_agent
from app.agents.knowledge_agent import knowledge_agent
from app.agents.planner_agent import planner_agent
from app.agents.attendance_agent import attendance_agent
from app.agents.assignment_agent import assignment_agent
from app.agents.study_agent import study_agent
from app.agents.revision_agent import revision_agent
from app.agents.skill_agent import skill_agent
from app.agents.handbook_agent import handbook_agent
from app.agents.chat_agent import chat_copilot_agent

def test_agent_1_parser():
    sample_text = """
    SEMESTER-I
    Course Code Course Name CODE L T P Cr
    1. UCB009 Chemistry BSC 3 0 2 4
    2. UES103 Programming for Problem Solving ESC 3 0 2 4
    """
    res = parser_agent.extract_structured_semester_data(sample_text, "test.txt")
    assert res["parsing_status"] == "SUCCESS"
    assert res["detected_subjects_count"] >= 2

def test_agent_2_knowledge_builder():
    graph = knowledge_agent.build_knowledge_graph()
    assert "subjects" in graph
    assert "day_schedule" in graph
    assert "Monday" in graph["day_schedule"]
    assert graph["total_credits"] >= 15.0

def test_agent_3_planner():
    routine = planner_agent.generate_daily_routine()
    assert len(routine) >= 5
    free_slots = planner_agent.compute_free_slots_for_day("Monday")
    assert isinstance(free_slots, list)

def test_agent_4_attendance():
    # Test safe bunks: 18 / 20 with 75% target -> 18/24 = 75%, so floor((18 - 15) / 0.75) = 4
    res = attendance_agent.calculate_subject_metrics({"subject_code": "UES103", "attended": 18, "total": 20, "target": 75.0})
    assert res["current_percentage"] == 90.0
    assert res["safe_bunks"] >= 3
    assert not res["danger_threshold"]

    # Test danger threshold: 16 / 22 with 75% target -> 72.7%
    danger_res = attendance_agent.calculate_subject_metrics({"subject_code": "UES013", "attended": 16, "total": 22, "target": 75.0})
    assert danger_res["current_percentage"] == 72.7
    assert danger_res["danger_threshold"] is True
    assert danger_res["classes_needed_for_target"] >= 1

    # Test bunk simulation
    sim = attendance_agent.simulate_bunk("UES103", 2)
    assert sim["simulated_percentage"] < 90.0

def test_agent_5_assignment():
    subtasks = assignment_agent.auto_decompose_assignment("Project", "Build RAG agent", "Hard", 6.0, 4)
    assert len(subtasks) == 4

def test_agent_6_study_planner():
    sessions = study_agent.generate_daily_study_sessions()
    assert len(sessions) >= 2

def test_agent_7_revision():
    revisions = revision_agent.generate_spaced_repetition_schedule()
    assert len(revisions) >= 4
    intervals = [r["interval_type"] for r in revisions]
    assert "1-Day" in intervals
    assert "7-Day" in intervals

def test_agent_8_skills():
    skills = skill_agent.get_skill_tracks()
    assert len(skills) >= 2
    resources = skill_agent.get_recommended_resources()
    assert len(resources) >= 5

def test_agent_9_handbook():
    hb = handbook_agent.generate_full_handbook()
    assert len(hb["sections"]) == 15
    assert hb["sections"][0]["section_id"] == "overview"
    assert hb["sections"][14]["section_id"] == "motivation_summary"

def test_agent_10_chat_copilot():
    # Where is my class
    res = chat_copilot_agent.process_query("Where is my class?")
    assert "📍" in res["reply"]

    # Can I skip
    res_bunk = chat_copilot_agent.process_query("Can I skip Chemistry?")
    assert "Attendance" in res_bunk["reply"] or "Safe" in res_bunk["reply"] or "bunk" in res_bunk["reply"]

    # Today's schedule
    res_sched = chat_copilot_agent.process_query("Today's schedule", context_day="Monday")
    assert "Monday" in res_sched["reply"]
