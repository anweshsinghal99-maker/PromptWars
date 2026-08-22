from datetime import datetime, timedelta

DEMO_USER_PROFILE = {
    "name": "Anwesh Singhal",
    "university": "Thapar Institute of Engineering & Technology",
    "branch": "B.E. (DS & AI)",
    "semester": "Semester-I",
    "is_hosteller": True,
    "wake_time": "07:00",
    "sleep_time": "23:30",
    "daily_study_hours": 3.5,
    "break_duration_mins": 15,
    "current_cgpa": 8.8,
    "target_cgpa": 9.5,
    "attendance_goal_pct": 75.0,
    "study_style": "Deep Work",
    "chronotype": "Night learner",
    "target_skills": ["DSA", "Agentic AI", "Full Stack Web Development"],
    "career_goals": ["Tier-1 AI Tech Placement", "Autonomous Agent Systems Architect"],
    "fitness_goals": "Gym & Evening Running at 18:45 (Post-Class Recharge)",
    "max_study_hours": 6.0
}

DEMO_SUBJECTS = [
    {
        "code": "UES103",
        "name": "Programming for Problem Solving (C language)",
        "category": "ESC (Engineering Science Course)",
        "l_hours": 3, "t_hours": 0, "p_hours": 2, "credits": 4.0,
        "faculty_name": "Dr. Rohit Sharma",
        "classroom": "T105",
        "lab_room": "PL-2 (L008) LAB",
        "syllabus": "Computer Memory Hierarchy, Flowcharts, Control & Iterative Statements, Functions, Recursion (Tower of Hanoi), Arrays, Strings, Pointers & Dynamic Memory Allocation (malloc, free), Structures and Unions, File Handling streams in C.",
        "clos": [
            "Comprehend and analyze number systems, memory and compilation in C.",
            "Analyze control and iterative statements for algorithmic problem solving.",
            "Design and create programs involving arrays, strings, and dynamic pointers.",
            "Evaluate programming concepts based on structures, unions, and file handling."
        ],
        "textbooks": [
            "C Programming Language - Brian W. Kernighan & Dennis M. Ritchie (2nd ed)",
            "Programming in ANSI C - E. Balagurusamy (8th ed)",
            "Let Us C - Yashavant Kanetkar (16th ed)"
        ],
        "evaluation_scheme": {"MST": 30, "EST": 40, "Sessional": 30},
        "difficulty_score": 4.0
    },
    {
        "code": "UES013",
        "name": "Electrical and Electronics Engineering",
        "category": "ESC (Engineering Science Course)",
        "l_hours": 3, "t_hours": 1, "p_hours": 2, "credits": 4.5,
        "faculty_name": "Dr. Manpreet Singh",
        "classroom": "T105 / LT102",
        "lab_room": "B105/H221 LAB",
        "syllabus": "DC Circuits (Mesh/Node analysis, Thevenin, Norton, Superposition, Star-Delta), AC Circuits (Phasors, Resonance, 3-Phase power), Magnetic Circuits, Digital Logic Design (Boolean Algebra, K-Maps, MUX, Flip-Flops, Counters), Electronic Devices (Diode, BJT, SCR), Operational Amplifiers.",
        "clos": [
            "Apply network laws and theorems to solve complex DC circuits.",
            "Compute AC quantities with phasor representation and 3-phase power.",
            "Comprehend magnetic circuits and rotating machine operation.",
            "Design digital logic circuits using Boolean simplification and logic gates."
        ],
        "textbooks": [
            "Electrical and Electronic Technology - E. Hughes, I.M. Smith (10th ed)",
            "Basic Electrical Engineering - I.J. Nagrath & D.P. Kothari",
            "Electronic Devices & Circuit Theory - R.L. Boylestad (Pearson)"
        ],
        "evaluation_scheme": {"MST": 25, "EST": 45, "Sessional": 30},
        "difficulty_score": 4.5
    },
    {
        "code": "UMA022",
        "name": "Calculus for Engineers (Mathematics - I)",
        "category": "BSC (Basic Science Course)",
        "l_hours": 3, "t_hours": 1, "p_hours": 0, "credits": 3.5,
        "faculty_name": "Prof. S. K. Verma",
        "classroom": "T105 / LT102",
        "lab_room": "E311 (Tutorial Room)",
        "syllabus": "Partial Differentiation (Limits, Continuity, Chain Rule, Maxima/Minima), Multiple Integrals (Double/Triple Integrals, Polar coordinates), Sequences and Series (Convergence tests, Ratio/Root/Integral tests), Power Series & Taylor Expansions, Complex Analysis (Cauchy-Riemann equations, Analytic functions).",
        "clos": [
            "Examine functions of several variables and compute partial derivatives for engineering extrema.",
            "Evaluate multiple integrals in Cartesian and Polar coordinates for volume and flux.",
            "Determine convergence of infinite series and Taylor approximation error estimates.",
            "Test analyticity of complex functions using Cauchy-Riemann equations."
        ],
        "textbooks": [
            "Calculus and Analytic Geometry - G.B. Thomas & R.L. Finney (9th ed)",
            "Essential Calculus - James Stewart (6th ed)",
            "Complex Variables: Theory and Applications - H.S. Kasana"
        ],
        "evaluation_scheme": {"MST": 30, "EST": 45, "Sessional": 25},
        "difficulty_score": 4.2
    },
    {
        "code": "UCB009",
        "name": "Chemistry",
        "category": "BSC (Basic Science Course)",
        "l_hours": 3, "t_hours": 0, "p_hours": 2, "credits": 4.0,
        "faculty_name": "Dr. Ananya Ray",
        "classroom": "T105 / LT102",
        "lab_room": "CBTL(G253-A) LAB",
        "syllabus": "Atomic & Molecular Spectroscopy (UV-Vis, IR, Beer-Lambert's Law), Electrochemistry (Batteries, Corrosion protection, Conductometric titrations), Water Treatment & Analysis (Zeolite, Ion-Exchange, Reverse Osmosis), Fuels & Energy (Biodiesel, Octane/Cetane, Fuel cells), Polymers, Computers in Chemistry (SMILES chemical notation).",
        "clos": [
            "Recognize principles and applications of atomic and molecular spectroscopy.",
            "Explain modern batteries, electrochemistry, and corrosion mitigation.",
            "Apply water softening and reverse osmosis parameters in industrial contexts.",
            "Implement SMILES chemical structure interconversions."
        ],
        "textbooks": [
            "Engineering Chemistry - S. Vairam & S. Ramesh (Wiley)",
            "Engineering Chemistry - K.S. Maheswaramma & M. Chugh (Pearson)"
        ],
        "evaluation_scheme": {"MST": 30, "EST": 40, "Sessional": 30},
        "difficulty_score": 3.2
    },
    {
        "code": "UEN008",
        "name": "Energy and Environment",
        "category": "OTH (General/Multidisciplinary Course)",
        "l_hours": 2, "t_hours": 0, "p_hours": 0, "credits": 2.0,
        "faculty_name": "Dr. Vikas Goyal",
        "classroom": "T105",
        "lab_room": "N/A",
        "syllabus": "Sustainability Concepts & Climate Change, Air Pollution (Meteorology, Wind roses, Scrubbers/ESPs), Water Pollution & Wastewater Treatment Systems, Solid Waste Management (Incineration, Composting, Landfilling), Renewable Energy Resources (Biomass, Solar Thermal & PV).",
        "clos": [
            "Comprehend interdisciplinary environmental issues with reference to sustainability.",
            "Assess anthropogenic environmental impacts and apply mitigation strategies.",
            "Correlate conventional energy concerns with solar and biomass non-conventional technologies."
        ],
        "textbooks": [
            "Energy, Environment and Sustainability - S. Moaveni (Cengage)",
            "Environmental Studies - R. Rajagopalan (Oxford University Press)"
        ],
        "evaluation_scheme": {"MST": 30, "EST": 40, "Sessional": 30},
        "difficulty_score": 2.5
    },
    {
        "code": "UAI101",
        "name": "Foundation of Machine Intelligence: Concepts, Techniques and Applications",
        "category": "PCC (Professional Core Course)",
        "l_hours": 2, "t_hours": 0, "p_hours": 0, "credits": 2.0,
        "faculty_name": "Dr. Neha Taneja",
        "classroom": "T105",
        "lab_room": "N/A",
        "syllabus": "AI Essentials & History, Intelligent Agents and Environment Interaction (How agents perceive and act), Knowledge Representation & Logic Reasoning (Propositional, Predicate logic, Rule-based systems), Data Analysis Fundamentals, Machine Learning Essentials (Supervised, Unsupervised, Reinforcement, Neural Networks), Recent Advancements (Explainable AI, Generative AI, AI Safety).",
        "clos": [
            "Understand and describe fundamental AI concepts and intelligent agent architectures.",
            "Apply knowledge representation and data analysis techniques.",
            "Differentiate and implement core machine learning paradigms.",
            "Evaluate recent advancements in generative AI and ethical AI safety."
        ],
        "textbooks": [
            "Foundations of Machine Learning - M. Mohri, A. Rostamizadeh (MIT Press)",
            "Introduction to Machine Learning - E. Alpaydin (4th ed, MIT Press)"
        ],
        "evaluation_scheme": {"MST": 30, "EST": 40, "Sessional": 30},
        "difficulty_score": 3.8
    }
]

DEMO_TIMETABLE_SLOTS = [
    # MONDAY
    {"day_of_week": "Monday", "start_time": "08:50", "end_time": "09:40", "subject_code": "UES013", "subject_name": "Electrical & Electronics Engineering", "slot_type": "Lecture", "room": "T105", "batch": "All"},
    {"day_of_week": "Monday", "start_time": "09:40", "end_time": "10:30", "subject_code": "UMA022", "subject_name": "Calculus for Engineers", "slot_type": "Lecture", "room": "T105", "batch": "All"},
    {"day_of_week": "Monday", "start_time": "10:30", "end_time": "11:20", "subject_code": "UES103", "subject_name": "Programming for Problem Solving", "slot_type": "Lecture", "room": "T105", "batch": "All"},
    {"day_of_week": "Monday", "start_time": "11:20", "end_time": "13:00", "subject_code": "UES103", "subject_name": "Programming for Problem Solving Lab", "slot_type": "Practical", "room": "PL-2 (L008) LAB", "batch": "Group 1"},
    {"day_of_week": "Monday", "start_time": "15:30", "end_time": "17:10", "subject_code": "UCB009", "subject_name": "Chemistry Lab", "slot_type": "Practical", "room": "CBTL (G253-A) LAB", "batch": "Group 1"},
    {"day_of_week": "Monday", "start_time": "17:10", "end_time": "18:00", "subject_code": "UCB009", "subject_name": "Chemistry Lecture", "slot_type": "Lecture", "room": "LT102", "batch": "All"},
    {"day_of_week": "Monday", "start_time": "18:00", "end_time": "18:50", "subject_code": "UMA022", "subject_name": "Calculus for Engineers", "slot_type": "Lecture", "room": "LT102", "batch": "All"},

    # TUESDAY
    {"day_of_week": "Tuesday", "start_time": "08:00", "end_time": "08:50", "subject_code": "UMA022", "subject_name": "Calculus for Engineers", "slot_type": "Lecture", "room": "T105", "batch": "All"},
    {"day_of_week": "Tuesday", "start_time": "08:50", "end_time": "09:40", "subject_code": "UES013", "subject_name": "Electrical & Electronics Engineering", "slot_type": "Lecture", "room": "T105", "batch": "All"},
    {"day_of_week": "Tuesday", "start_time": "14:40", "end_time": "15:30", "subject_code": "UES103", "subject_name": "Programming for Problem Solving", "slot_type": "Lecture", "room": "T105", "batch": "All"},
    {"day_of_week": "Tuesday", "start_time": "15:30", "end_time": "16:20", "subject_code": "UCB009", "subject_name": "Chemistry Lecture", "slot_type": "Lecture", "room": "T105", "batch": "All"},
    {"day_of_week": "Tuesday", "start_time": "16:20", "end_time": "17:10", "subject_code": "UAI101", "subject_name": "Foundation of Machine Intelligence", "slot_type": "Lecture", "room": "T105", "batch": "All"},
    {"day_of_week": "Tuesday", "start_time": "17:10", "end_time": "18:00", "subject_code": "UES103", "subject_name": "Programming for Problem Solving", "slot_type": "Lecture", "room": "LT102", "batch": "All"},
    {"day_of_week": "Tuesday", "start_time": "18:00", "end_time": "18:50", "subject_code": "UCB009", "subject_name": "Chemistry Lecture", "slot_type": "Lecture", "room": "LT102", "batch": "All"},

    # WEDNESDAY
    {"day_of_week": "Wednesday", "start_time": "08:00", "end_time": "08:50", "subject_code": "UES013", "subject_name": "Electrical & Electronics Engineering", "slot_type": "Lecture", "room": "T105", "batch": "All"},
    {"day_of_week": "Wednesday", "start_time": "08:50", "end_time": "09:40", "subject_code": "UMA022", "subject_name": "Calculus for Engineers", "slot_type": "Lecture", "room": "T105", "batch": "All"},
    {"day_of_week": "Wednesday", "start_time": "15:30", "end_time": "16:20", "subject_code": "UCB009", "subject_name": "Chemistry Lecture", "slot_type": "Lecture", "room": "T105", "batch": "All"},
    {"day_of_week": "Wednesday", "start_time": "17:10", "end_time": "18:00", "subject_code": "UMA022", "subject_name": "Calculus for Engineers", "slot_type": "Lecture", "room": "LT102", "batch": "All"},
    {"day_of_week": "Wednesday", "start_time": "18:00", "end_time": "18:50", "subject_code": "UES103", "subject_name": "Programming for Problem Solving", "slot_type": "Lecture", "room": "LT102", "batch": "All"},

    # THURSDAY
    {"day_of_week": "Thursday", "start_time": "13:00", "end_time": "13:50", "subject_code": "UEN008", "subject_name": "Energy and Environment", "slot_type": "Lecture", "room": "T105", "batch": "All"},
    {"day_of_week": "Thursday", "start_time": "13:50", "end_time": "14:40", "subject_code": "UAI101", "subject_name": "Foundation of Machine Intelligence", "slot_type": "Lecture", "room": "T105", "batch": "All"},
    {"day_of_week": "Thursday", "start_time": "14:40", "end_time": "15:30", "subject_code": "UES103", "subject_name": "Programming for Problem Solving", "slot_type": "Lecture", "room": "T105", "batch": "All"},
    {"day_of_week": "Thursday", "start_time": "15:30", "end_time": "16:20", "subject_code": "UES013", "subject_name": "Electrical & Electronics Tutorial", "slot_type": "Tutorial", "room": "E311", "batch": "All"},
    {"day_of_week": "Thursday", "start_time": "16:20", "end_time": "17:10", "subject_code": "UMA022", "subject_name": "Calculus Tutorial", "slot_type": "Tutorial", "room": "E311", "batch": "All"},
    {"day_of_week": "Thursday", "start_time": "17:10", "end_time": "18:00", "subject_code": "UCB009", "subject_name": "Chemistry Lecture", "slot_type": "Lecture", "room": "LT102", "batch": "All"},
    {"day_of_week": "Thursday", "start_time": "18:00", "end_time": "18:50", "subject_code": "UMA022", "subject_name": "Calculus for Engineers", "slot_type": "Lecture", "room": "LT102", "batch": "All"},

    # FRIDAY
    {"day_of_week": "Friday", "start_time": "09:40", "end_time": "11:20", "subject_code": "UES013", "subject_name": "Electrical & Electronics Lab", "slot_type": "Practical", "room": "B105/H221 LAB", "batch": "Group 1"},
    {"day_of_week": "Friday", "start_time": "11:20", "end_time": "12:10", "subject_code": "UEN008", "subject_name": "Energy and Environment", "slot_type": "Lecture", "room": "T105", "batch": "All"},
    {"day_of_week": "Friday", "start_time": "12:10", "end_time": "13:00", "subject_code": "UCB009", "subject_name": "Chemistry Lecture", "slot_type": "Lecture", "room": "T105", "batch": "All"},
    {"day_of_week": "Friday", "start_time": "17:10", "end_time": "18:00", "subject_code": "UES013", "subject_name": "Electrical & Electronics Engineering", "slot_type": "Lecture", "room": "LT102", "batch": "All"},
    {"day_of_week": "Friday", "start_time": "18:00", "end_time": "18:50", "subject_code": "UES103", "subject_name": "Programming for Problem Solving", "slot_type": "Lecture", "room": "LT102", "batch": "All"}
]

DEMO_ATTENDANCE = [
    {"subject_code": "UES103", "attended": 18, "total": 20, "target": 75.0},  # 90.0%
    {"subject_code": "UES013", "attended": 16, "total": 22, "target": 75.0},  # 72.7% (Danger!)
    {"subject_code": "UMA022", "attended": 21, "total": 24, "target": 75.0},  # 87.5%
    {"subject_code": "UCB009", "attended": 19, "total": 20, "target": 75.0},  # 95.0%
    {"subject_code": "UEN008", "attended": 10, "total": 12, "target": 75.0},  # 83.3%
    {"subject_code": "UAI101", "attended": 11, "total": 12, "target": 75.0}   # 91.6%
]

DEMO_ASSIGNMENTS = [
    {
        "subject_code": "UES103",
        "title": "C Programming: Dynamic Memory & File Handling Mini-Project",
        "description": "Implement a binary search tree student record database with file serialization and pointer arithmetic.",
        "days_from_now": 3,
        "priority": "High",
        "difficulty": "Hard",
        "estimated_hours": 5.0,
        "completion_pct": 35.0,
        "status": "doing",
        "subtasks": [
            {"id": "c-1", "day": "Day 1", "title": "Design struct memory layout & header file", "estimated_mins": 45, "is_done": True},
            {"id": "c-2", "day": "Day 2", "title": "Implement dynamic memory allocation (malloc/free) & node insertions", "estimated_mins": 90, "is_done": False},
            {"id": "c-3", "day": "Day 3", "title": "Write binary file read/write serialization and error handlers", "estimated_mins": 75, "is_done": False},
            {"id": "c-4", "day": "Day 4", "title": "Compile, test memory leaks, and generate final report", "estimated_mins": 40, "is_done": False}
        ]
    },
    {
        "subject_code": "UES013",
        "title": "Superposition & Norton's Theorem Circuit Simulation Report",
        "description": "Simulate and verify the 2-mesh circuit in Multisim/MATLAB and compare with theoretical nodal equations.",
        "days_from_now": 5,
        "priority": "High",
        "difficulty": "Medium",
        "estimated_hours": 3.5,
        "completion_pct": 60.0,
        "status": "doing",
        "subtasks": [
            {"id": "ee-1", "day": "Day 1", "title": "Solve analytical mesh & nodal matrix equations", "estimated_mins": 45, "is_done": True},
            {"id": "ee-2", "day": "Day 2", "title": "Run SPICE circuit simulation and record waveforms", "estimated_mins": 60, "is_done": True},
            {"id": "ee-3", "day": "Day 3", "title": "Draft conclusion and error percentage comparison table", "estimated_mins": 45, "is_done": False}
        ]
    },
    {
        "subject_code": "UCB009",
        "title": "UV-Vis Spectroscopy & Beer-Lambert Law Calibration Lab",
        "description": "Plot absorbance vs concentration graph and determine unknown solution molar absorptivity.",
        "days_from_now": 8,
        "priority": "Medium",
        "difficulty": "Easy",
        "estimated_hours": 2.0,
        "completion_pct": 0.0,
        "status": "pending",
        "subtasks": [
            {"id": "ch-1", "day": "Day 1", "title": "Plot spectrophotometer calibration curve in Python/Excel", "estimated_mins": 40, "is_done": False},
            {"id": "ch-2", "day": "Day 2", "title": "Calculate slope (molar extinction coeff) and format lab document", "estimated_mins": 35, "is_done": False}
        ]
    },
    {
        "subject_code": "UAI101",
        "title": "Search Agents & Propositional Logic Knowledge Base Implementation",
        "description": "Implement A* heuristic search and simple propositional resolution engine in Python.",
        "days_from_now": 12,
        "priority": "Medium",
        "difficulty": "Hard",
        "estimated_hours": 6.0,
        "completion_pct": 0.0,
        "status": "pending",
        "subtasks": [
            {"id": "ai-1", "day": "Day 1", "title": "Review agent environment & graph definition", "estimated_mins": 40, "is_done": False},
            {"id": "ai-2", "day": "Day 2", "title": "Code A* Priority Queue & Manhattan heuristic", "estimated_mins": 80, "is_done": False},
            {"id": "ai-3", "day": "Day 3", "title": "Build propositional logic resolution validator", "estimated_mins": 90, "is_done": False}
        ]
    }
]

DEMO_SKILLS = [
    {
        "name": "DSA & Competitive Programming",
        "category": "Core Placement Skills",
        "target_hours_per_week": 6.0,
        "total_hours_completed": 34.0,
        "current_milestone_index": 2,
        "roadmap_milestones": [
            {"title": "Arrays, Two Pointers & Sliding Window", "description": "Master Kadane's, Dutch National Flag, Trapping Rain Water", "est_hours": 12.0, "status": "completed"},
            {"title": "Binary Search & Recursion Fundamentals", "description": "Rotated sorted array search, recursive backtracking", "est_hours": 14.0, "status": "completed"},
            {"title": "Trees & Graph Traversals (DFS/BFS)", "description": "LCA, Diameter, Topological Sort, Dijkstra algorithm", "est_hours": 20.0, "status": "in_progress"},
            {"title": "Dynamic Programming (1D & 2D Grids)", "description": "0/1 Knapsack, Longest Common Subsequence, Coin Change", "est_hours": 25.0, "status": "pending"}
        ],
        "curated_resources": [
            {"title": "NeetCode 150 DSA Roadmap (Free)", "url": "https://neetcode.io/roadmap", "platform": "NeetCode", "is_free": True},
            {"title": "MIT 6.006 Introduction to Algorithms", "url": "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/", "platform": "MIT OCW", "is_free": True},
            {"title": "LeetCode Curated Blind 75", "url": "https://leetcode.com/problem-list/top-interview-questions/", "platform": "LeetCode", "is_free": True}
        ]
    },
    {
        "name": "Agentic AI & LLM Engineering (UCS714 Prep)",
        "category": "AI Specialization",
        "target_hours_per_week": 5.0,
        "total_hours_completed": 18.5,
        "current_milestone_index": 1,
        "roadmap_milestones": [
            {"title": "LLM Prompt Engineering & Chain-of-Thought", "description": "ReAct prompting, few-shot tuning, system metaprompts", "est_hours": 10.0, "status": "completed"},
            {"title": "Tool Calling, Structured Output & MCP Protocols", "description": "Model Context Protocol, function calling, agent state graphs", "est_hours": 15.0, "status": "in_progress"},
            {"title": "Multi-Agent Orchestration with LangGraph", "description": "Cyclic supervisor-worker graphs, reflection loops", "est_hours": 20.0, "status": "pending"},
            {"title": "Vector Databases & Hybrid RAG Architectures", "description": "Chunking strategies, FAISS/Chroma, rerankers", "est_hours": 18.0, "status": "pending"}
        ],
        "curated_resources": [
            {"title": "LangChain & LangGraph Official Documentation", "url": "https://python.langchain.com/docs/langgraph/", "platform": "Official Docs", "is_free": True},
            {"title": "DeepLearning.AI Multi-Agent Systems Course", "url": "https://www.deeplearning.ai/short-courses/", "platform": "DeepLearning.AI", "is_free": True},
            {"title": "Google Gemini API Cookbook", "url": "https://github.com/google-gemini/cookbook", "platform": "Official Docs", "is_free": True}
        ]
    },
    {
        "name": "Full Stack Web Development (Next.js + FastAPI)",
        "category": "Engineering Stack",
        "target_hours_per_week": 4.0,
        "total_hours_completed": 28.0,
        "current_milestone_index": 3,
        "roadmap_milestones": [
            {"title": "Modern JavaScript/TypeScript & React Hooks", "description": "State machines, custom hooks, effect lifecycles", "est_hours": 15.0, "status": "completed"},
            {"title": "TailwindCSS & Modern UI Component Systems", "description": "Glassmorphism, animations, responsive design", "est_hours": 10.0, "status": "completed"},
            {"title": "FastAPI, Pydantic & SQLAlchemy Relational DBs", "description": "Async endpoints, ORM relationships, migrations", "est_hours": 15.0, "status": "completed"},
            {"title": "Full Stack Production Deployment & Docker", "description": "Docker Compose, CI/CD pipelines, SSL & caching", "est_hours": 12.0, "status": "in_progress"}
        ],
        "curated_resources": [
            {"title": "Roadmap.sh Full Stack Developer Roadmap", "url": "https://roadmap.sh/full-stack", "platform": "Roadmap.sh", "is_free": True},
            {"title": "FastAPI Official Interactive Tutorial", "url": "https://fastapi.tiangolo.com/tutorial/", "platform": "Official Docs", "is_free": True},
            {"title": "FreeCodeCamp Modern Full Stack Web Development", "url": "https://www.freecodecamp.org/", "platform": "FreeCodeCamp", "is_free": True}
        ]
    }
]

DEMO_TIMELINE_EVENTS = [
    {"week": "Week 1-2", "title": "Semester Kickoff & Foundation", "status": "completed", "date": "Aug 1-14", "focus": "Course scheme review, lab batch allotment, environment setup"},
    {"week": "Week 3-6", "title": "Core Module Deep Dive & Project Formation", "status": "active", "date": "Aug 15 - Sep 15", "focus": "C Pointers, Norton's theorem, Partial differentiation, AI agents intro"},
    {"week": "Week 7-8", "title": "Mid Semester Tests (MST)", "status": "upcoming", "date": "Oct 12 - Oct 18", "focus": "MST Exams (30% total semester weightage) across all 6 subjects"},
    {"week": "Week 9-11", "title": "Post-MST Hackathon & Lab Evaluations", "status": "upcoming", "date": "Oct 19 - Nov 15", "focus": "Tech fest, Sessional evaluations, Project milestone reviews"},
    {"week": "Week 12-14", "title": "Advanced Syllabi & Pre-EST Spaced Revision", "status": "upcoming", "date": "Nov 16 - Nov 30", "focus": "Complex analysis, SMILES chemistry, File handling, Buffer days"},
    {"week": "Week 15-16", "title": "End Semester Tests (EST)", "status": "upcoming", "date": "Dec 1 - Dec 15", "focus": "Final Theory Exams (40-45% weightage) + Final SGPA calculation"}
]

DEMO_CAMPUS_POINTS = [
    {"name": "T105 (Tan Building)", "type": "Lecture Hall", "location": "Block A, 1st Floor", "desc": "Main lecture hall for Calculus, Chemistry, PPS & AI"},
    {"name": "LT102 (Lecture Theatre 102)", "type": "Lecture Theatre", "location": "Academic Complex West", "desc": "Evening lectures (17:10 & 18:00 slots)"},
    {"name": "E311 (Electronics Block)", "type": "Tutorial Room", "location": "Block E, 3rd Floor", "desc": "Thursday Tutorials (Electrical & Calculus)"},
    {"name": "PL-2 / L008 LAB", "type": "Computer Lab", "location": "Computer Center, Ground Floor", "desc": "Programming for Problem Solving C Labs"},
    {"name": "CBTL / G253-A LAB", "type": "Science Lab", "location": "Chemistry Block, Ground Floor", "desc": "Chemistry & Spectroscopy Practical Lab"},
    {"name": "B105 / H221 LAB", "type": "Engineering Lab", "location": "Electrical Sciences Wing", "desc": "Electrical & Electronics Hardware Lab"},
    {"name": "Central Library", "type": "Study Zone", "location": "Campus Center", "desc": "24/7 Quiet Reading Hall with High-Speed Wi-Fi"},
    {"name": "Student Canteen / Cafeteria", "type": "Food & Leisure", "location": "Near Sports Complex", "desc": "Open 08:00 - 22:30 daily"}
]

DEMO_HOSTEL_TIMINGS = {
    "hostel_name": "Hostel O / Hostel K",
    "curfew_time": "20:30 (8:30 PM)",
    "night_out_gatepass_rule": "Biometric + Warden e-pass required after 20:30",
    "mess_schedule": {
        "breakfast": "07:30 - 09:00 AM",
        "lunch": "12:30 - 14:30 PM",
        "snacks": "17:00 - 18:00 PM",
        "dinner": "19:30 - 21:30 PM"
    },
    "study_room_rules": "Silent zone 22:00 - 06:00, High speed LAN ports active"
}
