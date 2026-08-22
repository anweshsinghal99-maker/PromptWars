export interface UserProfile {
  id?: number;
  name: string;
  university: string;
  branch: string;
  semester: string;
  is_hosteller: boolean;
  wake_time: string;
  sleep_time: string;
  daily_study_hours: number;
  break_duration_mins: number;
  current_cgpa: number;
  target_cgpa: number;
  attendance_goal_pct: number;
  study_style: string; // "Pomodoro" | "Deep Work" | "Revision Cycles"
  chronotype: string;  // "Morning learner" | "Night learner"
  target_skills: string[];
  career_goals: string[];
  fitness_goals: string;
  max_study_hours: number;
}

export interface Subject {
  id: number;
  code: string;
  name: string;
  category: string;
  l_hours: number;
  t_hours: number;
  p_hours: number;
  credits: number;
  faculty_name: string;
  classroom: string;
  lab_room: string;
  syllabus: string;
  clos: string[];
  textbooks: string[];
  evaluation_scheme: Record<string, number>;
  difficulty_score: number;
}

export interface TimetableSlot {
  id: number;
  day_of_week: string; // "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday"
  start_time: string;
  end_time: string;
  subject_code: string;
  subject_name: string;
  slot_type: string; // "Lecture" | "Tutorial" | "Practical"
  room: string;
  batch?: string;
  is_active?: boolean;
}

export interface AttendanceDetail {
  subject_code: string;
  subject_name: string;
  attended_classes: number;
  total_classes: number;
  current_percentage: number;
  target_percentage: number;
  safe_bunks: number;
  danger_threshold: boolean;
  classes_needed_for_target: number;
}

export interface AttendanceSummary {
  overall_percentage: number;
  total_attended: number;
  total_held: number;
  target_percentage: number;
  at_risk_count: number;
  subject_details: AttendanceDetail[];
}

export interface SubtaskItem {
  id: string;
  day: string;
  title: string;
  estimated_mins: number;
  is_done: boolean;
}

export interface Assignment {
  id: number;
  subject_code: string;
  title: string;
  description: string;
  deadline: string;
  priority: "High" | "Medium" | "Low";
  difficulty: "Easy" | "Medium" | "Hard";
  estimated_hours: number;
  completion_pct: number;
  status: "pending" | "doing" | "completed";
  subtasks: SubtaskItem[];
}

export interface StudySession {
  id: number;
  date_str: string;
  day_of_week: string;
  start_time: string;
  end_time: string;
  subject_code: string;
  topic: string;
  session_type: string;
  is_completed: boolean;
  pomodoro_intervals: number;
}

export interface RevisionItem {
  id: number;
  subject_code: string;
  topic: string;
  original_learned_date: string;
  interval_type: string;
  scheduled_date: string;
  status: "pending" | "completed" | "skipped";
}

export interface SkillMilestone {
  title: string;
  description: string;
  est_hours: number;
  status: "pending" | "in_progress" | "completed";
}

export interface ResourceItem {
  title: string;
  url: string;
  platform: string;
  is_free: boolean;
  skill?: string;
}

export interface SkillTrack {
  id: number;
  name: string;
  category: string;
  target_hours_per_week: number;
  total_hours_completed: number;
  roadmap_milestones: SkillMilestone[];
  curated_resources: ResourceItem[];
  current_milestone_index: number;
  progress_percentage: number;
}

export interface HandbookSection {
  page_number: number;
  section_id: string;
  title: string;
  subtitle: string;
  content_markdown: string;
  callouts: string[];
  tables: Array<{
    headers: string[];
    rows: string[][];
  }>;
}

export interface SemesterHandbook {
  university: string;
  program: string;
  semester: string;
  student_name: string;
  generated_at: string;
  sections: HandbookSection[];
}

export interface MasterSemesterState {
  user: UserProfile;
  subjects: Subject[];
  timetable: TimetableSlot[];
  attendance: AttendanceSummary;
  assignments: Assignment[];
  today_study_sessions: StudySession[];
  upcoming_revisions: RevisionItem[];
  skills: SkillTrack[];
  next_exam: {
    title: string;
    date: string;
    days_remaining: number;
    weightage: string;
    priority: string;
  };
  timeline_events: Array<{
    week: string;
    title: string;
    status: string;
    date: string;
    focus: string;
  }>;
  campus_points: Array<{
    name: string;
    type: string;
    location: string;
    desc: string;
  }>;
  hostel_timings: {
    hostel_name: string;
    curfew_time: string;
    night_out_gatepass_rule: string;
    mess_schedule: Record<string, string>;
    study_room_rules: string;
  };
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  action_type?: string;
  quick_suggestions?: string[];
}
