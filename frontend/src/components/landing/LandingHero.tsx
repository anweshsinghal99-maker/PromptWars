import React from 'react';
import { Sparkles, Calendar, ShieldCheck, Brain, ArrowRight, Zap } from 'lucide-react';
import { ThemeToggle } from '../ui/ThemeToggle';
import { useTheme } from '../../lib/ThemeContext';
import confetti from 'canvas-confetti';
import { Button } from '../ui/Button';

interface LandingHeroProps {
  onStartPlanning: () => void;
  onTryDemo: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onStartPlanning, onTryDemo }) => {
  const { isDarkMode } = useTheme();

  const handleDemoClick = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: isDarkMode 
        ? ['#fb7185', '#fca5a5', '#fecdd3', '#2dd4bf', '#fbbf24']
        : ['#0ea5e9', '#38bdf8', '#7dd3fc', '#10b981', '#fcd34d']
    });
    onTryDemo();
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-20 overflow-hidden">
      
      {/* Absolute Header with Theme Toggle */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Two-point hero glow — vibrant but restrained */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 40% 50%, var(--hero-glow-1) 0%, var(--hero-glow-2) 60%, transparent 80%)' }}
      />

      {/* ── Badge ── */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.09] bg-white/[0.04] text-slate-400 text-xs font-medium mb-8 select-none">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        Autonomous Academic OS · Powered by 10 AI Agents
      </div>

      {/* ── Hero Headline ── */}
      <div className="text-center max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-100 leading-[1.08]">
          Orchestrate Your Semester
          <br />
          <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, var(--text-gradient-1) 0%, var(--text-gradient-2) 45%, var(--text-gradient-3) 100%)' }}>
            With Zero Friction
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
          From syllabus PDFs to synchronized execution — automated timetable,
          75% attendance sentinel, spaced repetition, and career skill roadmaps.
        </p>

        {/* ── CTA Buttons ── */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Button
            variant="primary"
            size="lg"
            onClick={handleDemoClick}
            leftIcon={<Sparkles className="w-4 h-4" aria-hidden="true" />}
            rightIcon={<ArrowRight className="w-4 h-4" aria-hidden="true" />}
            className="w-full sm:w-auto"
          >
            Try Demo — Instant Preview
          </Button>

          <Button
            variant="secondary"
            size="lg"
            onClick={onStartPlanning}
            leftIcon={<Zap className="w-4 h-4 text-amber-400" aria-hidden="true" />}
            className="w-full sm:w-auto"
          >
            Guided Setup
          </Button>
        </div>

        {/* ── Metric Stats Row ── */}
        <div className="pt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto text-left">
          {[
            { label: 'Curriculum',      value: '20.0 Credits',    sub: 'Thapar B.E. (DS & AI)',       color: 'text-slate-100' },
            { label: 'Attendance Guard', value: '75% Sentinel',   sub: 'Predictive Bunk Calc',         color: 'text-emerald-400' },
            { label: 'Timetable',        value: '31 Slots / Wk',  sub: 'Room & Lab Mapped',            color: 'text-slate-100' },
            { label: 'Spaced Revision',  value: '1/3/7/14 Days',  sub: 'Ebbinghaus Cycles',            color: 'text-accent' },
          ].map(stat => (
            <div
              key={stat.label}
              className="p-4 rounded-xl bg-elevated border border-white/[0.07] space-y-1"
            >
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">{stat.label}</span>
              <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-[11px] text-slate-500">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Feature Cards ── */}
      <div className="mt-14 max-w-4xl w-full grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            icon: <Calendar className="w-5 h-5" />,
            title: 'Google Calendar Timetable',
            desc: 'Visual week matrix mapped to lecture halls (T105, LT102) and labs (PL-2, CBTL) with instant .ICS sync.',
            accent: 'border-accent/20',
          },
          {
            icon: <ShieldCheck className="w-5 h-5" />,
            title: 'Attendance Sentinel',
            desc: 'Real-time safe bunk calculations and "what-if" simulations to prevent mandatory attendance detentions.',
            accent: 'border-emerald-500/20',
          },
          {
            icon: <Brain className="w-5 h-5" />,
            title: 'Spaced Study Planner',
            desc: 'Credit-weighted Deep Work sessions and forgetting curve retention queues calibrated for your chronotype.',
            accent: 'border-amber-500/20',
          },
        ].map(card => (
          <div
            key={card.title}
            className={`p-5 rounded-xl bg-elevated border ${card.accent} border-l-2 space-y-3 hover:bg-overlay transition-colors duration-200`}
          >
            <div className="text-accent">{card.icon}</div>
            <h3 className="text-sm font-semibold text-slate-100">{card.title}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
