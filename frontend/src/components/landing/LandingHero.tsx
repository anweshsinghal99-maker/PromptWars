import React from 'react';
import { Sparkles, Calendar, ShieldCheck, Brain, ArrowRight, Zap, CheckCircle2, Award, Clock, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LandingHeroProps {
  onStartPlanning: () => void;
  onTryDemo: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onStartPlanning, onTryDemo }) => {
  const triggerDemoWithConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#6366f1', '#06b6d4', '#10b981', '#a855f7']
    });
    onTryDemo();
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-20 overflow-hidden">
      {/* Ambient Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-indigo-600/15 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[350px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Top Floating Badge */}
      <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-panel border border-indigo-500/40 text-indigo-300 text-xs font-semibold mb-8 shadow-glow-primary animate-pulse-subtle">
        <Sparkles className="w-4 h-4 text-cyan-400" />
        <span>Autonomous Academic Operating System • Powered by 10 AI Agents</span>
      </div>

      {/* Hero Headline */}
      <div className="text-center max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[1.1]">
          Orchestrate Your Semester <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-cyan-300 to-emerald-400">
            With Zero Friction
          </span>
        </h1>
        <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
          From syllabus PDFs to synchronized execution: automated Google Calendar timetable, 
          75% safe bunk protection, spaced repetition review, and career skill roadmaps.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <button
            onClick={triggerDemoWithConfetti}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-base shadow-glow-primary flex items-center justify-center gap-3 transition-all duration-200 hover:scale-[1.03]"
          >
            <Sparkles className="w-5 h-5 text-cyan-200" />
            <span>Try Demo (1-Click Instant Preview)</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onStartPlanning}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl glass-panel hover:bg-slate-800/90 text-slate-200 font-semibold text-base border border-slate-700 flex items-center justify-center gap-2.5 transition-all duration-200"
          >
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Guided Setup</span>
          </button>
        </div>

        {/* Live Metrics Showcase */}
        <div className="pt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-left">
          <div className="p-4 rounded-2xl glass-panel border border-slate-800 space-y-1">
            <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">Curriculum</span>
            <p className="text-xl font-extrabold text-white">20.0 Credits</p>
            <p className="text-[11px] text-slate-400">Thapar B.E. (DS & AI)</p>
          </div>
          <div className="p-4 rounded-2xl glass-panel border border-slate-800 space-y-1">
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Attendance Guard</span>
            <p className="text-xl font-extrabold text-emerald-400">75% Sentinel</p>
            <p className="text-[11px] text-slate-400">Predictive Bunk Calc</p>
          </div>
          <div className="p-4 rounded-2xl glass-panel border border-slate-800 space-y-1">
            <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">Timetable</span>
            <p className="text-xl font-extrabold text-cyan-300">31 Slots / Wk</p>
            <p className="text-[11px] text-slate-400">Room & Lab Mapped</p>
          </div>
          <div className="p-4 rounded-2xl glass-panel border border-slate-800 space-y-1">
            <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider">Spaced Revision</span>
            <p className="text-xl font-extrabold text-purple-300">1 / 3 / 7 / 14</p>
            <p className="text-[11px] text-slate-400">Ebbinghaus Cycles</p>
          </div>
        </div>
      </div>

      {/* Visual Feature Cards */}
      <div className="mt-16 max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-3xl space-y-3 border border-indigo-500/20">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center shadow-glow-primary">
            <Calendar className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">Google Calendar Timetable</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Visual week matrix mapped to lecture halls (T105, LT102) and labs (PL-2, CBTL) with instant .ICS sync.
          </p>
        </div>

        <div className="glass-card p-6 rounded-3xl space-y-3 border border-cyan-500/20">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shadow-glow-cyan">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">Attendance Sentinel</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Real-time safe bunk calculations and "what-if" simulations to prevent mandatory attendance detentions.
          </p>
        </div>

        <div className="glass-card p-6 rounded-3xl space-y-3 border border-emerald-500/20">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shadow-glow-emerald">
            <Brain className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">Spaced Study Planner</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Credit-weighted Deep Work sessions and forgetting curve retention queues calibrated for your chronotype.
          </p>
        </div>
      </div>
    </div>
  );
};
