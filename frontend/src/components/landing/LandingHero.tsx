import React from 'react';
import { Sparkles, Calendar, ShieldCheck, Brain, BookOpen, ArrowRight, Zap, GraduationCap, CheckCircle2 } from 'lucide-react';
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
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[450px] h-[300px] bg-cyan-600/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Top Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-indigo-500/30 text-indigo-300 text-xs font-medium mb-8 animate-pulse-subtle">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
        <span>Next-Gen Academic Intelligence • Notion AI + G-Calendar Architecture</span>
      </div>

      {/* Hero Headline */}
      <div className="text-center max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
          Master Your Semester <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400">
            With Autonomous AI
          </span>
        </h1>
        <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
          Upload your syllabus, timetable, and campus rules. Our multi-agent brain constructs a 
          synchronized semester execution plan—preventing attendance drops, scheduling spaced revisions, 
          and guaranteeing skill mastery.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={onStartPlanning}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-semibold text-base shadow-glow-primary flex items-center justify-center gap-3 transition-all duration-200 group"
          >
            <Zap className="w-5 h-5 text-indigo-200 group-hover:scale-110 transition-transform" />
            <span>Start Planning (Guided)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={triggerDemoWithConfetti}
            className="w-full sm:w-auto px-8 py-4 rounded-xl glass-panel-glow hover:bg-slate-800/80 text-cyan-300 font-semibold text-base border border-cyan-500/30 flex items-center justify-center gap-3 transition-all duration-200 hover:scale-[1.02]"
          >
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <span>Try Demo (1-Click Instant Preview)</span>
          </button>
        </div>

        {/* Live Pill Features */}
        <div className="pt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Thapar B.E. (DS & AI) Ready</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <span>10 Autonomous Agents</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-indigo-400" />
            <span>Safe Bunk Calculator</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <span>Spaced Repetition (1/3/7/14)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-purple-400" />
            <span>15-Section PDF Handbook</span>
          </div>
        </div>
      </div>

      {/* Feature Grid Showcase */}
      <div className="mt-16 max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-2xl space-y-3 border border-indigo-500/20">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Calendar className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Google Calendar Timetable</h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Drag-and-drop weekly class grid mapped with lecture halls (T105, LT102) and labs (PL-2, CBTL), featuring instant conflict resolution and .ics export.
          </p>
        </div>

        <div className="glass-card p-6 rounded-2xl space-y-3 border border-cyan-500/20">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Attendance & Safe Bunk Guard</h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Predictive "what-if" bunk simulations that calculate safe skips and emergency recovery lectures before attendance falls below 75%.
          </p>
        </div>

        <div className="glass-card p-6 rounded-2xl space-y-3 border border-emerald-500/20">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Brain className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Spaced Repetition & Study Planner</h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Ebbinghaus forgetting curve scheduling (1, 3, 7, 14 days) and credit-calibrated Deep Work study sessions tailored to your chronotype.
          </p>
        </div>
      </div>
    </div>
  );
};
