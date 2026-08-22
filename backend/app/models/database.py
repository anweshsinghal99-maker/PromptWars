import json
from datetime import datetime
from sqlalchemy import create_engine, Column, Integer, String, Float, Boolean, Text, DateTime, ForeignKey
from sqlalchemy.orm import declarative_base, sessionmaker, relationship
from app.config import settings

engine = create_engine(
    settings.DATABASE_URL, 
    connect_args={"check_same_thread": False} if "sqlite" in settings.DATABASE_URL else {}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class UserProfile(Base):
    __tablename__ = "user_profiles"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), default="Anwesh Singhal")
    university = Column(String(150), default="Thapar Institute of Engineering & Technology")
    branch = Column(String(100), default="B.E. Data Science & AI")
    semester = Column(String(20), default="Semester-I")
    is_hosteller = Column(Boolean, default=True)
    wake_time = Column(String(10), default="07:00")
    sleep_time = Column(String(10), default="23:30")
    daily_study_hours = Column(Float, default=3.5)
    break_duration_mins = Column(Integer, default=15)
    current_cgpa = Column(Float, default=8.8)
    target_cgpa = Column(Float, default=9.5)
    attendance_goal_pct = Column(Float, default=80.0)
    study_style = Column(String(50), default="Deep Work") # Pomodoro, Deep Work, Revision Cycles
    chronotype = Column(String(50), default="Night learner") # Morning learner, Night learner
    target_skills = Column(Text, default="[\"DSA\", \"Agentic AI\", \"Full Stack Web Development\"]")
    career_goals = Column(Text, default="[\"Tier-1 AI Tech Placement\", \"Open Source AI Architect\"]")
    fitness_goals = Column(String(100), default="Daily 45 min Gym & Cardio at 18:30")
    max_study_hours = Column(Float, default=6.0)
    created_at = Column(DateTime, default=datetime.utcnow)

class Subject(Base):
    __tablename__ = "subjects"

    id = Column(Integer, primary_key=True, index=True)
    code = Column(String(20), unique=True, index=True)
    name = Column(String(150))
    category = Column(String(50), default="Core") # BSC, ESC, PCC, HSS, etc.
    l_hours = Column(Integer, default=3)
    t_hours = Column(Integer, default=0)
    p_hours = Column(Integer, default=2)
    credits = Column(Float, default=4.0)
    faculty_name = Column(String(100), default="Prof. Faculty")
    classroom = Column(String(50), default="T105")
    lab_room = Column(String(50), default="PL-2")
    syllabus = Column(Text, default="")
    clos = Column(Text, default="[]") # Course Learning Outcomes (JSON)
    textbooks = Column(Text, default="[]") # List of books (JSON)
    evaluation_scheme = Column(Text, default="{\"MST\": 30, \"EST\": 40, \"Sessional\": 30}")
    difficulty_score = Column(Float, default=3.5) # 1 to 5 scale
    created_at = Column(DateTime, default=datetime.utcnow)

class TimetableSlot(Base):
    __tablename__ = "timetable_slots"

    id = Column(Integer, primary_key=True, index=True)
    day_of_week = Column(String(20), index=True) # Monday, Tuesday, Wednesday, Thursday, Friday
    start_time = Column(String(10)) # "08:00", "08:50", "11:20"
    end_time = Column(String(10))   # "08:50", "09:40", "13:00"
    subject_code = Column(String(20), index=True)
    subject_name = Column(String(150))
    slot_type = Column(String(30), default="Lecture") # Lecture, Tutorial, Practical
    room = Column(String(50), default="T105")
    batch = Column(String(20), default="All")
    is_active = Column(Boolean, default=True)

class AttendanceRecord(Base):
    __tablename__ = "attendance_records"

    id = Column(Integer, primary_key=True, index=True)
    subject_code = Column(String(20), unique=True, index=True)
    attended_classes = Column(Integer, default=18)
    total_classes = Column(Integer, default=20)
    target_percentage = Column(Float, default=75.0)
    updated_at = Column(DateTime, default=datetime.utcnow)

class Assignment(Base):
    __tablename__ = "assignments"

    id = Column(Integer, primary_key=True, index=True)
    subject_code = Column(String(20), index=True)
    title = Column(String(200))
    description = Column(Text, default="")
    deadline = Column(DateTime)
    priority = Column(String(20), default="High") # High, Medium, Low
    difficulty = Column(String(20), default="Medium") # Easy, Medium, Hard
    estimated_hours = Column(Float, default=4.0)
    completion_pct = Column(Float, default=0.0)
    status = Column(String(30), default="pending") # pending, doing, completed
    subtasks = Column(Text, default="[]") # JSON list of auto-split daily subtasks
    created_at = Column(DateTime, default=datetime.utcnow)

class StudySession(Base):
    __tablename__ = "study_sessions"

    id = Column(Integer, primary_key=True, index=True)
    date_str = Column(String(20), index=True) # YYYY-MM-DD
    day_of_week = Column(String(20))
    start_time = Column(String(10)) # "19:00"
    end_time = Column(String(10))   # "20:30"
    subject_code = Column(String(20))
    topic = Column(String(200))
    session_type = Column(String(40), default="Academic") # Academic, Spaced Revision, Skill Development, Lab Prep, Exam Prep
    is_completed = Column(Boolean, default=False)
    pomodoro_intervals = Column(Integer, default=2)

class RevisionSchedule(Base):
    __tablename__ = "revision_schedules"

    id = Column(Integer, primary_key=True, index=True)
    subject_code = Column(String(20), index=True)
    topic = Column(String(200))
    original_learned_date = Column(String(20))
    interval_type = Column(String(20)) # "1-Day", "3-Day", "7-Day", "14-Day", "Pre-Exam", "Final-Sprint"
    scheduled_date = Column(String(20), index=True)
    status = Column(String(20), default="pending") # pending, completed, skipped

class SkillTrack(Base):
    __tablename__ = "skill_tracks"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True)
    category = Column(String(50), default="Technical")
    target_hours_per_week = Column(Float, default=5.0)
    total_hours_completed = Column(Float, default=12.0)
    roadmap_milestones = Column(Text, default="[]") # JSON array of milestones
    curated_resources = Column(Text, default="[]") # JSON array of free links/docs
    current_milestone_index = Column(Integer, default=0)

class DocumentUpload(Base):
    __tablename__ = "document_uploads"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String(255))
    file_type = Column(String(50))
    category = Column(String(50)) # Timetable, Syllabus, Calendar, HostelRules, CampusMap
    raw_text = Column(Text, default="")
    parsed_summary = Column(Text, default="")
    created_at = Column(DateTime, default=datetime.utcnow)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def init_db():
    Base.metadata.create_all(bind=engine)
