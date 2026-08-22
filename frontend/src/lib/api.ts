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
    // Deterministic fallback response
    const q = message.toLowerCase();
    if (q.includes("where") || q.includes("class")) {
      return {
        reply: "📍 **Class Venues Today:**\n• `08:50 - 09:40`: EEE in **T105** (Block A)\n• `09:40 - 10:30`: Calculus in **T105**\n• `11:20 - 13:00`: PPS Lab in **PL-2 (Computer Center)**\n• `17:10 & 18:00`: Evening Lectures in **LT102**",
        quick_suggestions: ["Can I skip tomorrow?", "What should I study tonight?", "Show full schedule"]
      };
    }
    if (q.includes("skip") || q.includes("bunk")) {
      return {
        reply: "📊 **Attendance Status:**\n• Overall: **86.8%** (Target: 75%)\n• 🚨 **UES013 (Electrical): 72.7%** — Must attend next 2 lectures to recover!\n• ✅ **Chemistry (95.0%)**: 5 safe bunks remaining.",
        quick_suggestions: ["Simulate skipping 1 lecture", "When is next exam?", "Where is my class?"]
      };
    }
    return {
      reply: "🤖 I am your AI Semester Copilot. I have your timetable, attendance, study sessions, and exams fully synchronized.",
      quick_suggestions: ["Where is my class?", "Today's schedule", "What to study tonight?", "Next exam countdown"]
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
