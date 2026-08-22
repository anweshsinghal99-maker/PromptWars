from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional, Dict, Any
from datetime import datetime

class UserProfileBase(BaseModel):
    name: str = "Anwesh Singhal"
    university: str = "Thapar Institute of Engineering & Technology"
    branch: str = "B.E. Data Science & AI"
    semester: str = "Semester-I"
    is_hosteller: bool = True
    wake_time: str = "07:00"
    sleep_time: str = "23:30"
    daily_study_hours: float = 3.5
    break_duration_mins: int = 15
    current_cgpa: float = 8.8
    target_cgpa: float = 9.5
    attendance_goal_pct: float = 80.0
    study_style: str = "Deep Work" # Pomodoro, Deep Work, Revision Cycles
    chronotype: str = "Night learner" # Morning learner, Night learner
    target_skills: List[str] = ["DSA", "Agentic AI", "Full Stack Web Development"]
    career_goals: List[str] = ["Tier-1 AI Tech Placement", "Autonomous Agent Systems Architect"]
    fitness_goals: str = "Daily 45 min Gym & Cardio at 18:30"
    max_study_hours: float = 6.0

class UserProfileResponse(UserProfileBase):
    id: int
    created_at: Optional[datetime] = None
    model_config = ConfigDict(from_attributes=True)

class SubjectBase(BaseModel):
    code: str
    name: str
    category: str = "Core"
    l_hours: int = 3
    t_hours: int = 0
    p_hours: int = 2
    credits: float = 4.0
    faculty_name: str = "Prof. Faculty"
    classroom: str = "T105"
    lab_room: str = "PL-2"
    syllabus: str = ""
    clos: List[str] = []
    textbooks: List[str] = []
    evaluation_scheme: Dict[str, Any] = {"MST": 30, "EST": 40, "Sessional": 30}
    difficulty_score: float = 3.5

class SubjectResponse(SubjectBase):
    id: int
    model_config = ConfigDict(from_attributes=True)

class TimetableSlotBase(BaseModel):
    day_of_week: str
    start_time: str
    end_time: str
    subject_code: str
    subject_name: str
    slot_type: str = "Lecture"
    room: str = "T105"
    batch: str = "All"
    is_active: bool = True

class TimetableSlotResponse(TimetableSlotBase):
    id: int
    model_config = ConfigDict(from_attributes=True)

class AttendanceDetail(BaseModel):
    subject_code: str
    subject_name: str
    attended_classes: int
    total_classes: int
    current_percentage: float
    target_percentage: float
    safe_bunks: int
    danger_threshold: bool
    classes_needed_for_target: int
    projected_percentage_after_skips: float = 0.0

class AttendanceSummaryResponse(BaseModel):
    overall_percentage: float
    total_attended: int
    total_held: int
    target_percentage: float
    at_risk_count: int
    subject_details: List[AttendanceDetail]

class BunkSimulationRequest(BaseModel):
    subject_code: str
    skips_planned: int = Field(ge=0, le=20, default=1)

class BunkSimulationResponse(BaseModel):
    subject_code: str
    current_percentage: float
    simulated_percentage: float
    new_safe_bunks: int
    is_safe: bool
    status_message: str

class SubtaskItem(BaseModel):
    id: str
    day: str
    title: str
    estimated_mins: int
    is_done: bool = False

class AssignmentBase(BaseModel):
    subject_code: str
    title: str
    description: str = ""
    deadline: datetime
    priority: str = "High"
    difficulty: str = "Medium"
    estimated_hours: float = 4.0
    completion_pct: float = 0.0
    status: str = "pending"
    subtasks: List[SubtaskItem] = []

class AssignmentResponse(AssignmentBase):
    id: int
    model_config = ConfigDict(from_attributes=True)

class StudySessionResponse(BaseModel):
    id: int
    date_str: str
    day_of_week: str
    start_time: str
    end_time: str
    subject_code: str
    topic: str
    session_type: str
    is_completed: bool
    pomodoro_intervals: int
    model_config = ConfigDict(from_attributes=True)

class RevisionItemResponse(BaseModel):
    id: int
    subject_code: str
    topic: str
    original_learned_date: str
    interval_type: str
    scheduled_date: str
    status: str
    model_config = ConfigDict(from_attributes=True)

class SkillMilestone(BaseModel):
    title: str
    description: str
    est_hours: float
    status: str = "pending"

class ResourceItem(BaseModel):
    title: str
    url: str
    platform: str
    is_free: bool = True

class SkillTrackResponse(BaseModel):
    id: int
    name: str
    category: str
    target_hours_per_week: float
    total_hours_completed: float
    roadmap_milestones: List[SkillMilestone]
    curated_resources: List[ResourceItem]
    current_milestone_index: int
    progress_percentage: float = 0.0
    model_config = ConfigDict(from_attributes=True)

class SemesterHandbookSection(BaseModel):
    page_number: int
    section_id: str
    title: str
    subtitle: str
    content_markdown: str
    callouts: List[str] = []
    tables: List[Dict[str, Any]] = []

class SemesterHandbookResponse(BaseModel):
    university: str
    program: str
    semester: str
    student_name: str
    generated_at: str
    sections: List[SemesterHandbookSection]

class ChatMessageRequest(BaseModel):
    message: str = Field(min_length=1, max_length=1000)
    context_day: Optional[str] = None
    context_time: Optional[str] = None

class ChatMessageResponse(BaseModel):
    reply: str
    action_type: Optional[str] = None
    action_data: Optional[Dict[str, Any]] = None
    quick_suggestions: List[str] = []

class AgentStatusInfo(BaseModel):
    agent_id: str
    name: str
    status: str = "ONLINE"
    latency_ms: float = 1.2
    description: str

class MasterSemesterStateResponse(BaseModel):
    user: UserProfileResponse
    subjects: List[SubjectResponse]
    timetable: List[TimetableSlotResponse]
    attendance: AttendanceSummaryResponse
    assignments: List[AssignmentResponse]
    today_study_sessions: List[StudySessionResponse]
    upcoming_revisions: List[RevisionItemResponse]
    skills: List[SkillTrackResponse]
    next_exam: Dict[str, Any]
    timeline_events: List[Dict[str, Any]]
    campus_points: List[Dict[str, Any]]
    hostel_timings: Dict[str, Any]
    active_agents: List[AgentStatusInfo] = []
