import { MasterSemesterState } from './types';

export const INITIAL_DEMO_STATE: MasterSemesterState = {
  user: {
    id: 1,
    name: "Anwesh Singhal",
    university: "Thapar Institute of Engineering & Technology",
    branch: "B.E. (DS & AI)",
    semester: "Semester-I",
    is_hosteller: true,
    wake_time: "07:00",
    sleep_time: "23:30",
    daily_study_hours: 3.5,
    break_duration_mins: 15,
    current_cgpa: 8.8,
    target_cgpa: 9.5,
    attendance_goal_pct: 75.0,
    study_style: "Deep Work",
    chronotype: "Night learner",
    target_skills: ["DSA", "Agentic AI", "Full Stack Web Development"],
    career_goals: ["Tier-1 AI Tech Placement", "Autonomous Agent Systems Architect"],
    fitness_goals: "Gym & Evening Running at 18:45 (Post-Class Recharge)",
    max_study_hours: 6.0
  },
  subjects: [
    {
      id: 1,
      code: "UES103",
      name: "Programming for Problem Solving (C language)",
      category: "ESC",
      l_hours: 3, t_hours: 0, p_hours: 2, credits: 4.0,
      faculty_name: "Dr. Rohit Sharma",
      classroom: "T105",
      lab_room: "PL-2 (L008) LAB",
      syllabus: "Memory Hierarchy, Control Statements, Recursion (Tower of Hanoi), Arrays, Strings, Pointers & Dynamic Allocation, Structures/Unions, File Streams.",
      clos: [
        "Comprehend and analyze number systems and memory compilation in C.",
        "Design programs involving arrays, strings, and dynamic pointers.",
        "Implement structures, unions, and file stream serialization."
      ],
      textbooks: ["Kernighan & Ritchie: C Programming Language (2nd ed)", "Balagurusamy: ANSI C (8th ed)"],
      evaluation_scheme: { "MST": 30, "EST": 40, "Sessional": 30 },
      difficulty_score: 4.0
    },
    {
      id: 2,
      code: "UES013",
      name: "Electrical and Electronics Engineering",
      category: "ESC",
      l_hours: 3, t_hours: 1, p_hours: 2, credits: 4.5,
      faculty_name: "Dr. Manpreet Singh",
      classroom: "T105 / LT102",
      lab_room: "B105/H221 LAB",
      syllabus: "DC Circuits (Mesh/Node, Thevenin, Norton, Superposition), AC Phasors & 3-Phase Power, Magnetic Circuits, Digital Logic & K-Maps, BJT & Op-Amps.",
      clos: [
        "Apply network laws and theorems to solve DC/AC circuits.",
        "Analyze 3-phase power and magnetic circuits.",
        "Design combinational and sequential digital circuits."
      ],
      textbooks: ["Hughes: Electrical and Electronic Technology (10th ed)", "Nagrath & Kothari: Basic EE"],
      evaluation_scheme: { "MST": 25, "EST": 45, "Sessional": 30 },
      difficulty_score: 4.5
    },
    {
      id: 3,
      code: "UMA022",
      name: "Calculus for Engineers (Mathematics - I)",
      category: "BSC",
      l_hours: 3, t_hours: 1, p_hours: 0, credits: 3.5,
      faculty_name: "Prof. S. K. Verma",
      classroom: "T105 / LT102",
      lab_room: "E311 Tutorial",
      syllabus: "Partial Differentiation, Multiple Integrals (Double/Triple, Polar Coordinates), Infinite Series Convergence, Taylor Series, Complex Analysis.",
      clos: [
        "Compute partial derivatives and find maxima/minima.",
        "Evaluate double & triple integrals in polar and cartesian coordinates.",
        "Test analyticity of complex functions with Cauchy-Riemann equations."
      ],
      textbooks: ["Thomas & Finney: Calculus & Analytic Geometry (9th ed)", "Stewart: Essential Calculus"],
      evaluation_scheme: { "MST": 30, "EST": 45, "Sessional": 25 },
      difficulty_score: 4.2
    },
    {
      id: 4,
      code: "UCB009",
      name: "Chemistry",
      category: "BSC",
      l_hours: 3, t_hours: 0, p_hours: 2, credits: 4.0,
      faculty_name: "Dr. Ananya Ray",
      classroom: "T105 / LT102",
      lab_room: "CBTL(G253-A) LAB",
      syllabus: "UV-Vis/IR Spectroscopy, Modern Batteries & Corrosion, Water Softening (Zeolite, Ion Exchange, RO), Alternative Fuels, SMILES Notation.",
      clos: [
        "Recognize spectroscopy principles and Beer-Lambert calibrations.",
        "Explain battery chemistry and industrial water treatment.",
        "Execute SMILES chemical structure representations."
      ],
      textbooks: ["Vairam & Ramesh: Engineering Chemistry (Wiley)", "Maheswaramma: Engineering Chemistry"],
      evaluation_scheme: { "MST": 30, "EST": 40, "Sessional": 30 },
      difficulty_score: 3.2
    },
    {
      id: 5,
      code: "UEN008",
      name: "Energy and Environment",
      category: "OTH",
      l_hours: 2, t_hours: 0, p_hours: 0, credits: 2.0,
      faculty_name: "Dr. Vikas Goyal",
      classroom: "T105",
      lab_room: "N/A",
      syllabus: "Sustainability & Climate Change, Air & Water Pollution Control, Municipal Solid Waste Management, Non-Conventional Solar & Biomass Energy.",
      clos: [
        "Assess anthropogenic impacts on global ecosystems.",
        "Analyze renewable solar and thermal conversion technologies."
      ],
      textbooks: ["Moaveni: Energy, Environment & Sustainability", "Rajagopalan: Environmental Studies"],
      evaluation_scheme: { "MST": 30, "EST": 40, "Sessional": 30 },
      difficulty_score: 2.5
    },
    {
      id: 6,
      code: "UAI101",
      name: "Foundation of Machine Intelligence",
      category: "PCC",
      l_hours: 2, t_hours: 0, p_hours: 0, credits: 2.0,
      faculty_name: "Dr. Neha Taneja",
      classroom: "T105",
      lab_room: "N/A",
      syllabus: "Intelligent Agents & Environments, Propositional/Predicate Logic Reasoning, Machine Learning Essentials (Supervised/Unsupervised/RL), Explainable AI.",
      clos: [
        "Formulate intelligent agent perceptual cycles and state spaces.",
        "Implement propositional logic inference algorithms.",
        "Differentiate deep learning paradigms and AI safety guidelines."
      ],
      textbooks: ["Mohri et al.: Foundations of Machine Learning", "Alpaydin: Intro to Machine Learning"],
      evaluation_scheme: { "MST": 30, "EST": 40, "Sessional": 30 },
      difficulty_score: 3.8
    }
  ],
  timetable: [
    // MONDAY
    { id: 1, day_of_week: "Monday", start_time: "08:50", end_time: "09:40", subject_code: "UES013", subject_name: "Electrical & Electronics Engineering", slot_type: "Lecture", room: "T105" },
    { id: 2, day_of_week: "Monday", start_time: "09:40", end_time: "10:30", subject_code: "UMA022", subject_name: "Calculus for Engineers", slot_type: "Lecture", room: "T105" },
    { id: 3, day_of_week: "Monday", start_time: "10:30", end_time: "11:20", subject_code: "UES103", subject_name: "Programming for Problem Solving", slot_type: "Lecture", room: "T105" },
    { id: 4, day_of_week: "Monday", start_time: "11:20", end_time: "13:00", subject_code: "UES103", subject_name: "Programming for Problem Solving Lab", slot_type: "Practical", room: "PL-2 (L008) LAB" },
    { id: 5, day_of_week: "Monday", start_time: "15:30", end_time: "17:10", subject_code: "UCB009", subject_name: "Chemistry Lab", slot_type: "Practical", room: "CBTL (G253-A) LAB" },
    { id: 6, day_of_week: "Monday", start_time: "17:10", end_time: "18:00", subject_code: "UCB009", subject_name: "Chemistry Lecture", slot_type: "Lecture", room: "LT102" },
    { id: 7, day_of_week: "Monday", start_time: "18:00", end_time: "18:50", subject_code: "UMA022", subject_name: "Calculus for Engineers", slot_type: "Lecture", room: "LT102" },

    // TUESDAY
    { id: 8, day_of_week: "Tuesday", start_time: "08:00", end_time: "08:50", subject_code: "UMA022", subject_name: "Calculus for Engineers", slot_type: "Lecture", room: "T105" },
    { id: 9, day_of_week: "Tuesday", start_time: "08:50", end_time: "09:40", subject_code: "UES013", subject_name: "Electrical & Electronics Engineering", slot_type: "Lecture", room: "T105" },
    { id: 10, day_of_week: "Tuesday", start_time: "14:40", end_time: "15:30", subject_code: "UES103", subject_name: "Programming for Problem Solving", slot_type: "Lecture", room: "T105" },
    { id: 11, day_of_week: "Tuesday", start_time: "15:30", end_time: "16:20", subject_code: "UCB009", subject_name: "Chemistry Lecture", slot_type: "Lecture", room: "T105" },
    { id: 12, day_of_week: "Tuesday", start_time: "16:20", end_time: "17:10", subject_code: "UAI101", subject_name: "Foundation of Machine Intelligence", slot_type: "Lecture", room: "T105" },
    { id: 13, day_of_week: "Tuesday", start_time: "17:10", end_time: "18:00", subject_code: "UES103", subject_name: "Programming for Problem Solving", slot_type: "Lecture", room: "LT102" },
    { id: 14, day_of_week: "Tuesday", start_time: "18:00", end_time: "18:50", subject_code: "UCB009", subject_name: "Chemistry Lecture", slot_type: "Lecture", room: "LT102" },

    // WEDNESDAY
    { id: 15, day_of_week: "Wednesday", start_time: "08:00", end_time: "08:50", subject_code: "UES013", subject_name: "Electrical & Electronics Engineering", slot_type: "Lecture", room: "T105" },
    { id: 16, day_of_week: "Wednesday", start_time: "08:50", end_time: "09:40", subject_code: "UMA022", subject_name: "Calculus for Engineers", slot_type: "Lecture", room: "T105" },
    { id: 17, day_of_week: "Wednesday", start_time: "15:30", end_time: "16:20", subject_code: "UCB009", subject_name: "Chemistry Lecture", slot_type: "Lecture", room: "T105" },
    { id: 18, day_of_week: "Wednesday", start_time: "17:10", end_time: "18:00", subject_code: "UMA022", subject_name: "Calculus for Engineers", slot_type: "Lecture", room: "LT102" },
    { id: 19, day_of_week: "Wednesday", start_time: "18:00", end_time: "18:50", subject_code: "UES103", subject_name: "Programming for Problem Solving", slot_type: "Lecture", room: "LT102" },

    // THURSDAY
    { id: 20, day_of_week: "Thursday", start_time: "13:00", end_time: "13:50", subject_code: "UEN008", subject_name: "Energy and Environment", slot_type: "Lecture", room: "T105" },
    { id: 21, day_of_week: "Thursday", start_time: "13:50", end_time: "14:40", subject_code: "UAI101", subject_name: "Foundation of Machine Intelligence", slot_type: "Lecture", room: "T105" },
    { id: 22, day_of_week: "Thursday", start_time: "14:40", end_time: "15:30", subject_code: "UES103", subject_name: "Programming for Problem Solving", slot_type: "Lecture", room: "T105" },
    { id: 23, day_of_week: "Thursday", start_time: "15:30", end_time: "16:20", subject_code: "UES013", subject_name: "Electrical & Electronics Tutorial", slot_type: "Tutorial", room: "E311" },
    { id: 24, day_of_week: "Thursday", start_time: "16:20", end_time: "17:10", subject_code: "UMA022", subject_name: "Calculus Tutorial", slot_type: "Tutorial", room: "E311" },
    { id: 25, day_of_week: "Thursday", start_time: "17:10", end_time: "18:00", subject_code: "UCB009", subject_name: "Chemistry Lecture", slot_type: "Lecture", room: "LT102" },
    { id: 26, day_of_week: "Thursday", start_time: "18:00", end_time: "18:50", subject_code: "UMA022", subject_name: "Calculus for Engineers", slot_type: "Lecture", room: "LT102" },

    // FRIDAY
    { id: 27, day_of_week: "Friday", start_time: "09:40", end_time: "11:20", subject_code: "UES013", subject_name: "Electrical & Electronics Lab", slot_type: "Practical", room: "B105/H221 LAB" },
    { id: 28, day_of_week: "Friday", start_time: "11:20", end_time: "12:10", subject_code: "UEN008", subject_name: "Energy and Environment", slot_type: "Lecture", room: "T105" },
    { id: 29, day_of_week: "Friday", start_time: "12:10", end_time: "13:00", subject_code: "UCB009", subject_name: "Chemistry Lecture", slot_type: "Lecture", room: "T105" },
    { id: 30, day_of_week: "Friday", start_time: "17:10", end_time: "18:00", subject_code: "UES013", subject_name: "Electrical & Electronics Engineering", slot_type: "Lecture", room: "LT102" },
    { id: 31, day_of_week: "Friday", start_time: "18:00", end_time: "18:50", subject_code: "UES103", subject_name: "Programming for Problem Solving", slot_type: "Lecture", room: "LT102" }
  ],
  attendance: {
    overall_percentage: 86.8,
    total_attended: 95,
    total_held: 108,
    target_percentage: 75.0,
    at_risk_count: 1,
    subject_details: [
      { subject_code: "UES103", subject_name: "Programming for Problem Solving", attended_classes: 18, total_classes: 20, current_percentage: 90.0, target_percentage: 75.0, safe_bunks: 4, danger_threshold: false, classes_needed_for_target: 0 },
      { subject_code: "UES013", subject_name: "Electrical & Electronics Engineering", attended_classes: 16, total_classes: 22, current_percentage: 72.7, target_percentage: 75.0, safe_bunks: 0, danger_threshold: true, classes_needed_for_target: 2 },
      { subject_code: "UMA022", subject_name: "Calculus for Engineers", attended_classes: 21, total_classes: 24, current_percentage: 87.5, target_percentage: 75.0, safe_bunks: 4, danger_threshold: false, classes_needed_for_target: 0 },
      { subject_code: "UCB009", subject_name: "Chemistry", attended_classes: 19, total_classes: 20, current_percentage: 95.0, target_percentage: 75.0, safe_bunks: 5, danger_threshold: false, classes_needed_for_target: 0 },
      { subject_code: "UEN008", subject_name: "Energy and Environment", attended_classes: 10, total_classes: 12, current_percentage: 83.3, target_percentage: 75.0, safe_bunks: 1, danger_threshold: false, classes_needed_for_target: 0 },
      { subject_code: "UAI101", subject_name: "Foundation of Machine Intelligence", attended_classes: 11, total_classes: 12, current_percentage: 91.6, target_percentage: 75.0, safe_bunks: 2, danger_threshold: false, classes_needed_for_target: 0 }
    ]
  },
  assignments: [
    {
      id: 1,
      subject_code: "UES103",
      title: "C Programming: Binary Tree & File Serialization Project",
      description: "Implement a student record indexing database using dynamic struct pointers and binary file streams.",
      deadline: new Date(Date.now() + 3 * 86400000).toISOString(),
      priority: "High",
      difficulty: "Hard",
      estimated_hours: 5.0,
      completion_pct: 35.0,
      status: "doing",
      subtasks: [
        { id: "c-1", day: "Day 1", title: "Design struct memory layout & header definitions", estimated_mins: 45, is_done: true },
        { id: "c-2", day: "Day 2", title: "Implement dynamic allocation (malloc/free) & node insertions", estimated_mins: 90, is_done: false },
        { id: "c-3", day: "Day 3", title: "Write binary file read/write serialization and error handlers", estimated_mins: 75, is_done: false },
        { id: "c-4", day: "Day 4", title: "Compile, test memory leaks, and generate final report", estimated_mins: 40, is_done: false }
      ]
    },
    {
      id: 2,
      subject_code: "UES013",
      title: "Superposition & Norton's Theorem Circuit Simulation Report",
      description: "Simulate and verify the 2-mesh circuit in SPICE/MATLAB and compare with theoretical nodal equations.",
      deadline: new Date(Date.now() + 5 * 86400000).toISOString(),
      priority: "High",
      difficulty: "Medium",
      estimated_hours: 3.5,
      completion_pct: 60.0,
      status: "doing",
      subtasks: [
        { id: "ee-1", day: "Day 1", title: "Solve analytical mesh & nodal matrix equations", estimated_mins: 45, is_done: true },
        { id: "ee-2", day: "Day 2", title: "Run SPICE circuit simulation and record waveforms", estimated_mins: 60, is_done: true },
        { id: "ee-3", day: "Day 3", title: "Draft conclusion and error percentage comparison table", estimated_mins: 45, is_done: false }
      ]
    },
    {
      id: 3,
      subject_code: "UCB009",
      title: "UV-Vis Spectroscopy & Beer-Lambert Law Calibration Lab",
      description: "Plot absorbance vs concentration graph and determine unknown solution molar absorptivity.",
      deadline: new Date(Date.now() + 8 * 86400000).toISOString(),
      priority: "Medium",
      difficulty: "Easy",
      estimated_hours: 2.0,
      completion_pct: 0.0,
      status: "pending",
      subtasks: [
        { id: "ch-1", day: "Day 1", title: "Plot spectrophotometer calibration curve in Python/Excel", estimated_mins: 40, is_done: false },
        { id: "ch-2", day: "Day 2", title: "Calculate slope (molar extinction coeff) and format lab document", estimated_mins: 35, is_done: false }
      ]
    },
    {
      id: 4,
      subject_code: "UAI101",
      title: "Search Agents & Propositional Logic Resolution Engine",
      description: "Implement A* heuristic search and simple propositional resolution engine in Python.",
      deadline: new Date(Date.now() + 12 * 86400000).toISOString(),
      priority: "Medium",
      difficulty: "Hard",
      estimated_hours: 6.0,
      completion_pct: 0.0,
      status: "pending",
      subtasks: [
        { id: "ai-1", day: "Day 1", title: "Review agent environment & state transition graph", estimated_mins: 40, is_done: false },
        { id: "ai-2", day: "Day 2", title: "Code A* Priority Queue & Manhattan distance heuristic", estimated_mins: 80, is_done: false },
        { id: "ai-3", day: "Day 3", title: "Build propositional logic resolution validator", estimated_mins: 90, is_done: false }
      ]
    }
  ],
  today_study_sessions: [
    { id: 1, date_str: new Date().toISOString().split('T')[0], day_of_week: "Today", start_time: "21:30", end_time: "22:30", subject_code: "UES103", topic: "C Pointers & Dynamic Memory Allocation (Stack vs Heap)", session_type: "Academic Deep Work", is_completed: false, pomodoro_intervals: 2 },
    { id: 2, date_str: new Date().toISOString().split('T')[0], day_of_week: "Today", start_time: "22:35", end_time: "23:35", subject_code: "UES013", topic: "DC Mesh Analysis & Norton's Theorem Circuit Proofs", session_type: "Academic Deep Work", is_completed: false, pomodoro_intervals: 2 },
    { id: 3, date_str: new Date().toISOString().split('T')[0], day_of_week: "Today", start_time: "23:45", end_time: "00:45", subject_code: "DSA", topic: "Binary Trees: Lowest Common Ancestor & DFS Traversal", session_type: "Skill Mastery", is_completed: false, pomodoro_intervals: 2 }
  ],
  upcoming_revisions: [
    { id: 1, subject_code: "UES103", topic: "Recursion & Tower of Hanoi Stack Call Dynamics", original_learned_date: "Yesterday", interval_type: "1-Day Review", scheduled_date: "Today", status: "completed" },
    { id: 2, subject_code: "UMA022", topic: "Double Integrals & Polar Coordinate Transformations", original_learned_date: "3 Days ago", interval_type: "3-Day Review", scheduled_date: "Tomorrow", status: "pending" },
    { id: 3, subject_code: "UES013", topic: "Thevenin Equivalent & Star-Delta Transformations", original_learned_date: "7 Days ago", interval_type: "7-Day Review", scheduled_date: "In 2 Days", status: "pending" },
    { id: 4, subject_code: "UCB009", topic: "Beer-Lambert Law & Spectrophotometry Calibration", original_learned_date: "14 Days ago", interval_type: "14-Day Review", scheduled_date: "In 4 Days", status: "pending" }
  ],
  skills: [
    {
      id: 1,
      name: "DSA & Competitive Programming",
      category: "Core Placement Skills",
      target_hours_per_week: 6.0,
      total_hours_completed: 34.0,
      current_milestone_index: 2,
      progress_percentage: 50.0,
      roadmap_milestones: [
        { title: "Arrays, Two Pointers & Sliding Window", description: "Master Kadane's, Dutch National Flag, Trapping Rain Water", est_hours: 12.0, status: "completed" },
        { title: "Binary Search & Recursion Fundamentals", description: "Rotated sorted array search, recursive backtracking", est_hours: 14.0, status: "completed" },
        { title: "Trees & Graph Traversals (DFS/BFS)", description: "LCA, Diameter, Topological Sort, Dijkstra algorithm", est_hours: 20.0, status: "in_progress" },
        { title: "Dynamic Programming (1D & 2D Grids)", description: "0/1 Knapsack, Longest Common Subsequence, Coin Change", est_hours: 25.0, status: "pending" }
      ],
      curated_resources: [
        { title: "NeetCode 150 DSA Roadmap (Free)", url: "https://neetcode.io/roadmap", platform: "NeetCode", is_free: true },
        { title: "MIT 6.006 Introduction to Algorithms", url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/", platform: "MIT OCW", is_free: true },
        { title: "LeetCode Blind 75 Sheet", url: "https://leetcode.com/problem-list/top-interview-questions/", platform: "LeetCode", is_free: true }
      ]
    },
    {
      id: 2,
      name: "Agentic AI & LLM Engineering (UCS714 Prep)",
      category: "AI Specialization",
      target_hours_per_week: 5.0,
      total_hours_completed: 18.5,
      current_milestone_index: 1,
      progress_percentage: 30.0,
      roadmap_milestones: [
        { title: "LLM Prompt Engineering & Chain-of-Thought", description: "ReAct prompting, few-shot tuning, system metaprompts", est_hours: 10.0, status: "completed" },
        { title: "Tool Calling, Structured Output & MCP Protocols", description: "Model Context Protocol, function calling, agent state graphs", est_hours: 15.0, status: "in_progress" },
        { title: "Multi-Agent Orchestration with LangGraph", description: "Cyclic supervisor-worker graphs, reflection loops", est_hours: 20.0, status: "pending" },
        { title: "Vector Databases & Hybrid RAG Architectures", description: "Chunking strategies, FAISS/Chroma, rerankers", est_hours: 18.0, status: "pending" }
      ],
      curated_resources: [
        { title: "LangChain & LangGraph Official Documentation", url: "https://python.langchain.com/docs/langgraph/", platform: "Official Docs", is_free: true },
        { title: "DeepLearning.AI Multi-Agent Systems Course", url: "https://www.deeplearning.ai/short-courses/", platform: "DeepLearning.AI", is_free: true },
        { title: "Google Gemini API Cookbook", url: "https://github.com/google-gemini/cookbook", platform: "Official Docs", is_free: true }
      ]
    },
    {
      id: 3,
      name: "Full Stack Web Development (Next.js + FastAPI)",
      category: "Engineering Stack",
      target_hours_per_week: 4.0,
      total_hours_completed: 28.0,
      current_milestone_index: 3,
      progress_percentage: 75.0,
      roadmap_milestones: [
        { title: "Modern JavaScript/TypeScript & React Hooks", description: "State machines, custom hooks, effect lifecycles", est_hours: 15.0, status: "completed" },
        { title: "TailwindCSS & Modern UI Component Systems", description: "Glassmorphism, animations, responsive design", est_hours: 10.0, status: "completed" },
        { title: "FastAPI, Pydantic & SQLAlchemy Relational DBs", description: "Async endpoints, ORM relationships, migrations", est_hours: 15.0, status: "completed" },
        { title: "Full Stack Production Deployment & Docker", description: "Docker Compose, CI/CD pipelines, SSL & caching", est_hours: 12.0, status: "in_progress" }
      ],
      curated_resources: [
        { title: "Roadmap.sh Full Stack Developer Roadmap", url: "https://roadmap.sh/full-stack", platform: "Roadmap.sh", is_free: true },
        { title: "FastAPI Official Interactive Tutorial", url: "https://fastapi.tiangolo.com/tutorial/", platform: "Official Docs", is_free: true },
        { title: "FreeCodeCamp Modern Full Stack Web Development", url: "https://www.freecodecamp.org/", platform: "FreeCodeCamp", is_free: true }
      ]
    }
  ],
  next_exam: {
    title: "Mid Semester Tests (MST)",
    date: "Oct 12 – Oct 18, 2026",
    days_remaining: 51,
    weightage: "30% Semester Total",
    priority: "HIGH"
  },
  timeline_events: [
    { week: "Week 1-2", title: "Semester Kickoff & Foundation", status: "completed", date: "Aug 1-14", focus: "Course scheme review, lab batch allotment, environment setup" },
    { week: "Week 3-6", title: "Core Module Deep Dive & Project Formation", status: "active", date: "Aug 15 - Sep 15", focus: "C Pointers, Norton's theorem, Partial differentiation, AI agents intro" },
    { week: "Week 7-8", title: "Mid Semester Tests (MST)", status: "upcoming", date: "Oct 12 - Oct 18", focus: "MST Exams (30% total semester weightage) across all 6 subjects" },
    { week: "Week 9-11", title: "Post-MST Hackathon & Lab Evaluations", status: "upcoming", date: "Oct 19 - Nov 15", focus: "Tech fest, Sessional evaluations, Project milestone reviews" },
    { week: "Week 12-14", title: "Advanced Syllabi & Pre-EST Spaced Revision", status: "upcoming", date: "Nov 16 - Nov 30", focus: "Complex analysis, SMILES chemistry, File handling, Buffer days" },
    { week: "Week 15-16", title: "End Semester Tests (EST)", status: "upcoming", date: "Dec 1 - Dec 15", focus: "Final Theory Exams (40-45% weightage) + Final SGPA calculation" }
  ],
  campus_points: [
    { name: "T105 (Tan Building)", type: "Lecture Hall", location: "Block A, 1st Floor", desc: "Main lecture hall for Calculus, Chemistry, PPS & AI" },
    { name: "LT102 (Lecture Theatre 102)", type: "Lecture Theatre", location: "Academic Complex West", desc: "Evening lectures (17:10 & 18:00 slots)" },
    { name: "E311 (Electronics Block)", type: "Tutorial Room", location: "Block E, 3rd Floor", desc: "Thursday Tutorials (Electrical & Calculus)" },
    { name: "PL-2 / L008 LAB", type: "Computer Lab", location: "Computer Center, Ground Floor", desc: "Programming for Problem Solving C Labs" },
    { name: "CBTL / G253-A LAB", type: "Science Lab", location: "Chemistry Block, Ground Floor", desc: "Chemistry & Spectroscopy Practical Lab" },
    { name: "B105 / H221 LAB", type: "Engineering Lab", location: "Electrical Sciences Wing", desc: "Electrical & Electronics Hardware Lab" },
    { name: "Central Library", type: "Study Zone", location: "Campus Center", desc: "24/7 Quiet Reading Hall with High-Speed Wi-Fi" },
    { name: "Student Canteen / Cafeteria", type: "Food & Leisure", location: "Near Sports Complex", desc: "Open 08:00 - 22:30 daily" }
  ],
  hostel_timings: {
    hostel_name: "Hostel O / Hostel K",
    curfew_time: "20:30 (8:30 PM)",
    night_out_gatepass_rule: "Biometric + Warden e-pass required after 20:30",
    mess_schedule: {
      "Breakfast": "07:30 - 09:00 AM",
      "Lunch": "12:30 - 14:30 PM",
      "Snacks": "17:00 - 18:00 PM",
      "Dinner": "19:30 - 21:30 PM"
    },
    study_room_rules: "Silent zone 22:00 - 06:00, High speed LAN ports active"
  }
};
