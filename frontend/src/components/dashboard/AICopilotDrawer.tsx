import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../../lib/types';
import { api } from '../../lib/api';
import { Bot, Send, Loader, X, Sparkles, AlertCircle } from 'lucide-react';

interface AICopilotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const SUGGESTED_QUESTIONS = [
  "Where is my next class?",
  "Can I bunk Chemistry today?",
  "What should I study tonight?",
  "How many classes can I miss?",
  "Next exam countdown",
  "Show today's full schedule",
];

export const AICopilotDrawer: React.FC<AICopilotDrawerProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'assistant',
      text: "👋 Hey Anwesh! I'm your AI Semester Copilot.\n\nI have your full B.E. (DS & AI) semester loaded — timetable, attendance, study plan, exam schedule, and skill roadmaps.\n\nWhat can I help you with?",
      timestamp: 'Now',
      quick_suggestions: SUGGESTED_QUESTIONS,
    },
  ]);
  const [input, setInput]         = useState('');
  const [isTyping, setIsTyping]   = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (queryText?: string) => {
    const text = (queryText ?? input).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    setIsOffline(false);

    try {
      const res = await api.sendChatMessage(text);
      setIsTyping(false);
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: res.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        action_type: res.action_type,
        quick_suggestions: res.quick_suggestions?.length ? res.quick_suggestions : SUGGESTED_QUESTIONS.slice(0, 3),
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      setIsTyping(false);
      setIsOffline(true);
      // Rich demo fallback — never leaves user with an empty response
      const q = text.toLowerCase();
      let reply = '';
      let suggestions: string[] = [];

      if (q.includes('where') || q.includes('class') || q.includes('room')) {
        reply = "📍 **Today's Class Locations:**\n\n• **08:50–09:40** — EEE (Electrical) → Block T **T105**\n• **09:40–10:30** — Calculus → **T105**\n• **11:20–13:00** — PPS C Lab → **PL-2** (Computer Center)\n• **17:10–18:00** — DS & AI Foundations → **LT102**\n• **18:00–18:50** — Chemistry → **LT102**";
        suggestions = ["Can I bunk Chemistry?", "Attendance summary", "Tomorrow's schedule"];
      } else if (q.includes('bunk') || q.includes('skip') || q.includes('miss') || q.includes('attendance')) {
        reply = "📊 **Attendance Status:**\n\n✅ **Overall: 86.8%** — 13% above the 75% danger line\n\n⚠️ **UES013 Electrical — 72.7%** ← At Risk!\n   Must attend next **2 consecutive** lectures to recover.\n\n🟢 **Safe Bunks Remaining:**\n• PPS C Lab: 3 skips\n• Chemistry: 5 skips\n• Calculus: 4 skips";
        suggestions = ["Simulate skipping 2 classes", "Where is Electrical class?", "Next exam countdown"];
      } else if (q.includes('study') || q.includes('tonight') || q.includes('revision')) {
        reply = "🧠 **Tonight's Study Plan (Night Owl: 21:30–01:00):**\n\n• **21:30–23:00** — DSA: Binary Trees & Heaps (NeetCode #153-158)\n• **23:00–23:15** — Break ☕\n• **23:15–00:30** — Calculus: Integration by Parts (Chapter 7)\n• **00:30–01:00** — Spaced Revision: UES103 Pointers (Day 3)\n\n_Deep Work mode. Phone on DND. 🎯_";
        suggestions = ["Start Pomodoro timer", "Mark session complete", "What's due tomorrow?"];
      } else if (q.includes('exam') || q.includes('test') || q.includes('mst') || q.includes('est')) {
        reply = "📅 **Upcoming Exam Schedule:**\n\n🔴 **MST Round 1** — October 4-7, 2026 (≈ 15 days away)\n   Weightage: 30% · 6 subjects\n\n📋 **Focus Priority:**\n1. UES013 Electrical ← Most risky\n2. UCB009 Chemistry\n3. UMA022 Calculus\n\n_Start revisions **today** for Electrical._";
        suggestions = ["Study plan for MST", "What's the exam syllabus?", "Attendance before MST?"];
      } else if (q.includes('schedule') || q.includes('today') || q.includes('timetable')) {
        reply = "📆 **Today — Friday Schedule:**\n\n| Time | Subject | Room |\n|------|---------|------|\n| 08:50–09:40 | Electrical (L) | T105 |\n| 09:40–10:30 | Calculus (L) | T105 |\n| 11:20–13:00 | PPS C Lab (P) | PL-2 |\n| 17:10–18:00 | DS & AI (L) | LT102 |\n| 18:00–18:50 | Chemistry (L) | LT102 |\n\n_5 contact hours today._";
        suggestions = ["Where is PL-2?", "Can I skip evening?", "What to study tonight?"];
      } else {
        reply = "🤖 I'm your **AI Semester Copilot** — running in demo mode (backend offline).\n\nI can still answer questions about:\n📍 Class locations & timetable\n📊 Attendance & safe bunks\n🧠 Study plan & spaced revision\n📅 Exam countdowns & priority\n\nTry one of the suggestions below!";
        suggestions = ["Where is my class?", "Can I bunk today?", "Tonight's study plan"];
      }

      const offlineMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quick_suggestions: suggestions,
      };
      setMessages(prev => [...prev, offlineMsg]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in" onClick={onClose} aria-hidden="true" />

      {/* Drawer */}
      <div
        className="relative w-full max-w-md h-full bg-surface border-l border-rose-400/[0.12] flex flex-col animate-slide-in-right shadow-elevation-lg"
        role="dialog" aria-modal="true" aria-label="AI Semester Copilot"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-rose-400/[0.1] bg-elevated/60 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-accent/15 border border-accent/25 flex items-center justify-center shrink-0">
              <Bot className="w-4.5 h-4.5 text-accent" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
                AI Semester Copilot
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative rounded-full h-2 w-2 bg-emerald-400" />
                </span>
              </h3>
              <p className="text-[11px] text-[--text-muted]">Agent 10 · Grounded AI</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-white/[0.10] text-slate-400 flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Offline banner */}
        {isOffline && (
          <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 border-b border-amber-500/20 text-xs text-amber-400 shrink-0">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            Demo mode — backend offline. Showing local responses.
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {messages.map(m => (
            <div key={m.id} className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={[
                'max-w-[88%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line',
                m.sender === 'user'
                  ? 'bg-accent text-[#ffffff] rounded-br-sm'
                  : 'bg-elevated border border-rose-400/[0.12] text-slate-200 rounded-bl-sm',
              ].join(' ')}>
                {m.text}
              </div>
              <span className="text-[10px] text-[--text-muted] mt-1 px-1">{m.timestamp}</span>

              {/* Quick suggestions — on every assistant message */}
              {m.sender === 'assistant' && m.quick_suggestions?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2 max-w-[95%]">
                  {m.quick_suggestions.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(s)}
                      className="px-2.5 py-1 rounded-lg bg-accent/10 hover:bg-accent/20 border border-accent/20 hover:border-accent/35 text-[11px] text-accent transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-[--text-muted] p-1">
              <Loader className="w-3.5 h-3.5 animate-spin text-accent shrink-0" />
              <span>Thinking…</span>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggested questions (shown when input is empty) */}
        {!input && messages.length <= 2 && (
          <div className="px-4 pb-2 shrink-0">
            <p className="text-[10px] text-[--text-muted] uppercase tracking-wider mb-2 font-semibold">
              <Sparkles className="w-3 h-3 inline mr-1" />Try asking
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {SUGGESTED_QUESTIONS.slice(0, 4).map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(q)}
                  className="px-3 py-2 rounded-lg bg-elevated border border-rose-400/[0.1] hover:border-accent/30 hover:bg-overlay text-xs text-slate-400 hover:text-slate-200 text-left transition-colors leading-tight"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="shrink-0 px-4 py-3 border-t border-rose-400/[0.1] bg-elevated/40">
          <form onSubmit={e => { e.preventDefault(); handleSend(); }} className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask about timetable, bunks, study plan…"
              value={input}
              onChange={e => setInput(e.target.value)}
              className="flex-1 bg-surface border border-rose-400/[0.12] rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-[--text-muted] focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-colors"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="w-10 h-10 rounded-xl bg-accent hover:bg-[#0284c7] disabled:opacity-30 disabled:cursor-not-allowed text-[#ffffff] flex items-center justify-center shrink-0 transition-colors"
              aria-label="Send"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
