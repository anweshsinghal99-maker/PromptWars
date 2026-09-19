import React, { useState, useEffect } from 'react';
import { StudySession, RevisionItem } from '../../lib/types';
import { Brain, Clock, Play, Pause, RotateCcw, Sparkles, Flame, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { SectionHeader } from '../ui/SectionHeader';
import { Button } from '../ui/Button';

interface StudyRevisionViewProps {
  studySessions: StudySession[];
  revisions: RevisionItem[];
}

export const StudyRevisionView: React.FC<StudyRevisionViewProps> = ({
  studySessions: initialSessions,
  revisions: initialRevisions,
}) => {
  const [sessions,  setSessions]  = useState<StudySession[]>(initialSessions);
  const [revisions, setRevisions] = useState<RevisionItem[]>(initialRevisions);

  // Pomodoro state — all logic unchanged
  const [timerSeconds, setTimerSeconds]           = useState<number>(25 * 60);
  const [isActive, setIsActive]                   = useState<boolean>(false);
  const [mode, setMode]                           = useState<'focus' | 'break'>('focus');
  const [completedPomodoros, setCompletedPomodoros] = useState<number>(3);

  useEffect(() => {
    let interval: any = null;
    if (isActive && timerSeconds > 0) {
      interval = setInterval(() => { setTimerSeconds(s => s - 1); }, 1000);
    } else if (timerSeconds === 0) {
      if (mode === 'focus') {
        confetti({ particleCount: 50, spread: 60 });
        setCompletedPomodoros(c => c + 1);
        setMode('break');
        setTimerSeconds(5 * 60);
      } else {
        setMode('focus');
        setTimerSeconds(25 * 60);
      }
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timerSeconds, mode]);

  const toggleSession  = (id: number) =>
    setSessions(prev => prev.map(s => s.id === id ? { ...s, is_completed: !s.is_completed } : s));
  const toggleRevision = (id: number) =>
    setRevisions(prev => prev.map(r => r.id === id
      ? { ...r, status: r.status === 'completed' ? 'pending' : 'completed' }
      : r
    ));

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const pct = mode === 'focus'
    ? ((25 * 60 - timerSeconds) / (25 * 60)) * 100
    : ((5 * 60 - timerSeconds) / (5 * 60)) * 100;

  return (
    <div className="space-y-4">

      {/* Header */}
      <Card padding="md">
        <SectionHeader
          icon={<Brain className="w-4 h-4" />}
          title="Study & Spaced Repetition"
          description="Tailored for Night Owl chronotype (21:30–01:00 peak) · 1/3/7/14 day cycles"
        />
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* ── Left: Tonight plan + Revision queue ── */}
        <div className="lg:col-span-2 space-y-4">

          {/* Tonight Study Plan */}
          <Card padding="md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Flame className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
                <h3 className="text-sm font-semibold text-slate-100">Tonight's Deep Work Plan</h3>
              </div>
              <Badge variant="accent">3.5 hrs budget</Badge>
            </div>

            <div className="space-y-2">
              {sessions.map(sess => (
                <div
                  key={sess.id}
                  onClick={() => toggleSession(sess.id)}
                  className={[
                    'flex items-center justify-between gap-3 p-3.5 rounded-lg border cursor-pointer transition-colors duration-150',
                    sess.is_completed
                      ? 'bg-emerald-500/[0.05] border-emerald-500/15 text-slate-500'
                      : 'bg-surface/50 border-white/[0.06] hover:border-white/[0.12] text-slate-200',
                  ].join(' ')}
                  role="checkbox"
                  aria-checked={sess.is_completed}
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && toggleSession(sess.id)}
                >
                  <div className="flex items-start gap-3">
                    <span className={[
                      'w-5 h-5 rounded-md flex items-center justify-center border shrink-0 mt-0.5 transition-colors',
                      sess.is_completed
                        ? 'bg-emerald-500 border-emerald-500 text-[#ffffff]'
                        : 'border-white/20',
                    ].join(' ')}>
                      {sess.is_completed && <Check className="w-3 h-3" />}
                    </span>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-mono font-bold text-accent">{sess.subject_code}</span>
                        <span className="text-[10px] text-slate-600">{sess.session_type}</span>
                      </div>
                      <p className={`text-xs font-medium ${sess.is_completed ? 'line-through' : ''}`}>{sess.topic}</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-slate-500 shrink-0">
                    {sess.start_time}–{sess.end_time}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Spaced Repetition Queue */}
          <Card padding="md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                <h3 className="text-sm font-semibold text-slate-100">Ebbinghaus Revision Queue</h3>
              </div>
              <span className="text-xs text-slate-500 font-mono">1 / 3 / 7 / 14</span>
            </div>

            <div className="space-y-2">
              {revisions.map(rev => {
                const isDone = rev.status === 'completed';
                return (
                  <div
                    key={rev.id}
                    onClick={() => toggleRevision(rev.id)}
                    className={[
                      'flex items-center justify-between gap-3 p-3 rounded-lg border cursor-pointer transition-colors duration-150',
                      isDone
                        ? 'bg-emerald-500/[0.05] border-emerald-500/15 text-slate-500'
                        : 'bg-surface/40 border-white/[0.06] hover:border-white/[0.12]',
                    ].join(' ')}
                    role="checkbox"
                    aria-checked={isDone}
                    tabIndex={0}
                    onKeyDown={e => e.key === 'Enter' && toggleRevision(rev.id)}
                  >
                    <div className="flex items-center gap-3">
                      <span className={[
                        'w-4 h-4 rounded flex items-center justify-center border shrink-0 transition-colors',
                        isDone
                          ? 'bg-emerald-500 border-emerald-500 text-[#ffffff]'
                          : 'border-white/20',
                      ].join(' ')}>
                        {isDone && <Check className="w-2.5 h-2.5" />}
                      </span>
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[10px] font-mono font-bold text-slate-400">{rev.subject_code}</span>
                          <Badge variant="default" className="text-[10px]">{rev.interval_type}</Badge>
                        </div>
                        <p className={`text-xs text-slate-300 ${isDone ? 'line-through' : ''}`}>{rev.topic}</p>
                      </div>
                    </div>
                    <span className="text-[11px] text-slate-600 shrink-0">{rev.scheduled_date}</span>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* ── Right: Pomodoro Timer ── */}
        {/* Single intentional glow on the timer circle — focus is the hero of this widget */}
        <Card padding="lg" className="flex flex-col items-center justify-between gap-6">
          <div className="text-center space-y-1 w-full">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
              Focus Widget
            </span>
            <h3 className="text-base font-semibold text-slate-100">Pomodoro Timer</h3>
            <p className="text-xs text-slate-500">
              {mode === 'focus' ? '🎯 High Intensity Focus' : '☕ Rest & Rehydration'}
            </p>
          </div>

          {/* Circular timer */}
          <div className="relative w-44 h-44 flex items-center justify-center">
            {/* SVG progress ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 176 176">
              <circle cx="88" cy="88" r="80" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
              <circle
                cx="88" cy="88" r="80"
                fill="none"
                stroke={mode === 'focus' ? '#0ea5e9' : '#10b981'}
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 80}`}
                strokeDashoffset={`${2 * Math.PI * 80 * (1 - pct / 100)}`}
                className="transition-all duration-1000 ease-linear"
              />
            </svg>
            <div className="text-center z-10">
              <span className="text-4xl font-bold font-mono text-slate-100 tabular-nums tracking-tight">
                {formatTime(timerSeconds)}
              </span>
              <span className="block text-xs font-semibold text-slate-500 uppercase mt-1">{mode}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-3 w-full">
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="primary"
                size="md"
                onClick={() => setIsActive(!isActive)}
                leftIcon={isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                className="flex-1 max-w-[160px]"
              >
                {isActive ? 'Pause' : 'Start Focus'}
              </Button>
              <Button
                variant="ghost"
                size="md"
                onClick={() => {
                  setIsActive(false);
                  setTimerSeconds(mode === 'focus' ? 25 * 60 : 5 * 60);
                }}
                aria-label="Reset timer"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-center text-xs text-slate-600">
              Completed today:&nbsp;
              <strong className="text-emerald-400 font-semibold">{completedPomodoros} cycles</strong>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};
