import { MasterSemesterState, ChatMessage, SemesterHandbook, AttendanceSummary, UserProfile } from './types';
import { INITIAL_DEMO_STATE } from './demoData';

const API_BASE = '/api';

export const api = {
  async getMasterState(): Promise<MasterSemesterState> {
    try {
      const res = await fetch(`${API_BASE}/planner/state`);
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn("Backend not reached, using hydrated local store:", e);
    }
    return INITIAL_DEMO_STATE;
  },

  async updateProfile(profile: UserProfile): Promise<UserProfile> {
    try {
      const res = await fetch(`${API_BASE}/planner/profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn("Update profile local fallback");
    }
    return profile;
  },

  async simulateBunk(subject_code: string, skips: number) {
    try {
      const res = await fetch(`${API_BASE}/attendance/simulate-bunk`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject_code, skips_planned: skips })
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn("Bunk simulation local fallback");
    }
    // Local fallback calculation
    const subj = INITIAL_DEMO_STATE.attendance.subject_details.find(s => s.subject_code === subject_code);
    if (!subj) return { current_percentage: 0, simulated_percentage: 0, new_safe_bunks: 0, is_safe: false, status_message: "Subject not found." };
    const simulated_total = subj.total_classes + skips;
    const simulated_pct = Math.round((subj.attended_classes / simulated_total) * 1000) / 10;
    const is_safe = simulated_pct >= 75.0;
    return {
      subject_code,
      current_percentage: subj.current_percentage,
      simulated_percentage: simulated_pct,
      new_safe_bunks: Math.max(0, Math.floor((subj.attended_classes - 0.75 * simulated_total) / 0.75)),
      is_safe,
      status_message: is_safe
        ? `Safe to miss ${skips} class(es). Projected attendance will be ${simulated_pct}% (Above 75% target).`
        : `WARNING: Missing ${skips} class(es) will drop attendance to ${simulated_pct}%, which is BELOW 75%!`
    };
  },

  async sendChatMessage(message: string, context_day?: string): Promise<{ reply: string; action_type?: string; quick_suggestions?: string[] }> {
    try {
      const res = await fetch(`${API_BASE}/chat/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, context_day })
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn("Chat local fallback");
    }
    // ── Comprehensive deterministic fallback (backend offline) ──
    const q = message.toLowerCase();

    if (q.includes('where') || (q.includes('class') && q.includes('room'))) {
      return {
        reply: "📍 **Today's Class Locations:**\n\n• **08:50–09:40** — Electrical (L) → **T105**, Block A\n• **09:40–10:30** — Calculus (L) → **T105**\n• **11:20–13:00** — PPS C Lab (P) → **PL-2** (Computer Center)\n• **17:10–18:00** — DS & AI (L) → **LT102**\n• **18:00–18:50** — Chemistry (L) → **LT102**",
        quick_suggestions: ["Can I bunk Chemistry?", "Attendance summary", "What to study tonight?"]
      };
    }

    if (q.includes('schedule') || q.includes('today') || q.includes('timetable') || q.includes('full')) {
      return {
        reply: "📆 **Today — Friday Schedule:**\n\n| Time | Subject | Room |\n|------|---------|------|\n| 08:50–09:40 | Electrical (L) | T105 |\n| 09:40–10:30 | Calculus (L) | T105 |\n| 11:20–13:00 | PPS C Lab (P) | PL-2 |\n| 17:10–18:00 | DS & AI (L) | LT102 |\n| 18:00–18:50 | Chemistry (L) | LT102 |\n\n_5 contact hours · Hostel curfew: 8:30 PM_",
        quick_suggestions: ["Where is PL-2?", "Can I skip evening?", "What to study tonight?"]
      };
    }

    if (q.includes('bunk') || q.includes('skip') || q.includes('miss') || q.includes('attendance') || q.includes('percent')) {
      return {
        reply: "📊 **Attendance Status:**\n\n✅ **Overall: 86.8%** — 11.8% above danger line\n\n⚠️ **UES013 Electrical — 72.7%** ← At Risk!\n   Must attend next **2 consecutive** lectures.\n\n🟢 **Safe Bunks Remaining:**\n• PPS C Lab: 3 skips\n• Chemistry: 5 skips  \n• Calculus: 4 skips\n• DS & AI: 6 skips",
        quick_suggestions: ["Simulate skipping 2 classes", "Where is Electrical class?", "Next exam countdown"]
      };
    }

    if (q.includes('exam') || q.includes('test') || q.includes('mst') || q.includes('est') || q.includes('countdown')) {
      return {
        reply: "📅 **Upcoming Exam Schedule:**\n\n🔴 **MST Round 1** — October 4–7, 2026\n   _≈ 15 days away · Weightage: 30%_\n\n📋 **Study Priority:**\n1. UES013 Electrical ← Most risky attendance too\n2. UCB009 Chemistry\n3. UMA022 Calculus\n4. UES103 PPS (C Programming)\n\n_Start deep revision **today**._",
        quick_suggestions: ["Study plan for MST", "Attendance before MST?", "Where is the exam hall?"]
      };
    }

    if (q.includes('study') || q.includes('tonight') || q.includes('revision') || q.includes('learn')) {
      return {
        reply: "🧠 **Tonight's Study Plan — Night Owl (21:30–01:00):**\n\n• **21:30–23:00** — DSA: Binary Trees & Heaps (NeetCode #153)\n• **23:00–23:15** — Break ☕\n• **23:15–00:30** — Calculus: Integration by Parts (Ch. 7)\n• **00:30–01:00** — Spaced Revision: UES103 Pointers\n\n🎯 _Deep Work mode. Phone on DND._",
        quick_suggestions: ["Start Pomodoro timer", "Mark session complete", "What's due tomorrow?"]
      };
    }

    if (q.includes('skill') || q.includes('dsa') || q.includes('roadmap') || q.includes('career') || q.includes('placement')) {
      return {
        reply: "🚀 **Skill Roadmap Progress:**\n\n• **DSA Track** — 42% complete (NeetCode 150)\n• **Agentic AI** — 38% complete (LangGraph + MCP)\n• **Full Stack** — 25% complete (React + FastAPI)\n\n📅 Weekly budget: 1.5 hrs DSA · 1 hr AI · 0.5 hr Web\n_Slots: Weekdays 19:00–20:30 (after labs)_",
        quick_suggestions: ["Today's DSA problem", "Show AI resources", "Next skill milestone"]
      };
    }

    return {
      reply: "🤖 **AI Semester Copilot** — demo mode (backend offline).\n\nI can answer questions about:\n📍 Class locations & rooms\n📆 Today's full schedule\n📊 Attendance & safe bunks\n📅 Exam countdowns & priority\n🧠 Study plan & spaced revision\n🚀 Skill roadmaps & career goals\n\nTry one of the suggestions below!",
      quick_suggestions: ["Where is my class?", "Show today's schedule", "Can I bunk today?", "Next exam countdown"]
    };
  },

  async getHandbook(): Promise<SemesterHandbook> {
    try {
      const res = await fetch(`${API_BASE}/exports/handbook`);
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn("Handbook local fallback");
    }
    // Return structured default handbook
    return {
      university: INITIAL_DEMO_STATE.user.university,
      program: INITIAL_DEMO_STATE.user.branch,
      semester: INITIAL_DEMO_STATE.user.semester,
      student_name: INITIAL_DEMO_STATE.user.name,
      generated_at: "August 2026",
      sections: []
    };
  }
};
