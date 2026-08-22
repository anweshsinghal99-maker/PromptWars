import React, { useState, useEffect } from 'react';
import { StudySession, RevisionItem } from '../../lib/types';
import { Brain, Clock, Play, Pause, RotateCcw, CheckCircle2, Calendar, Sparkles, Flame, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

interface StudyRevisionViewProps {
  studySessions: StudySession[];
  revisions: RevisionItem[];
}

export const StudyRevisionView: React.FC<StudyRevisionViewProps> = ({ studySessions: initialSessions, revisions: initialRevisions }) => {
  const [sessions, setSessions] = useState<StudySession[]>(initialSessions);
  const [revisions, setRevisions] = useState<RevisionItem[]>(initialRevisions);

  // Pomodoro State
  const [timerSeconds, setTimerSeconds] = useState<number>(25 * 60);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [mode, setMode] = useState<'focus' | 'break'>('focus');
  const [completedPomodoros, setCompletedPomodoros] = useState<number>(3);

  useEffect(() => {
    let interval: any = null;
    if (isActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(s => s - 1);
      }, 1000);
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

  const toggleSession = (id: number) => {
    setSessions(prev => prev.map(s => s.id === id ? { ...s, is_completed: !s.is_completed } : s));
  };

  const toggleRevision = (id: number) => {
    setRevisions(prev => prev.map(r => r.id === id ? { ...r, status: r.status === 'completed' ? 'pending' : 'completed' } : r));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-white">Study & Spaced Repetition Engine</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Tailored for your Night Owl chronotype (21:30 - 01:00 peak) and 1/3/7/14 day retention cycles.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Tonight Study Plan & Spaced Repetition Queue */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tonight Plan */}
          <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Tonight's Deep Work Plan</h3>
              </div>
              <span className="text-xs text-cyan-300 font-semibold px-2 py-0.5 rounded bg-cyan-500/10">
                3.5 Hours Total Budget
              </span>
            </div>

            <div className="space-y-3">
              {sessions.map((sess) => (
                <div
                  key={sess.id}
                  onClick={() => toggleSession(sess.id)}
                  className={`p-4 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                    sess.is_completed
                      ? 'bg-emerald-950/20 border-emerald-500/30 text-slate-400 line-through'
                      : 'bg-slate-900/80 border-slate-800 text-white hover:border-indigo-500/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className={`w-5 h-5 rounded-lg mt-0.5 flex items-center justify-center border shrink-0 ${
                      sess.is_completed ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-600'
                    }`}>
                      {sess.is_completed && <Check className="w-3.5 h-3.5" />}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                          {sess.subject_code}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">{sess.session_type}</span>
                      </div>
                      <p className="text-xs font-semibold text-white mt-1">{sess.topic}</p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-mono font-bold text-cyan-300">{sess.start_time} - {sess.end_time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Spaced Repetition Queue */}
          <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Ebbinghaus Spaced Repetition Queue</h3>
              </div>
              <span className="text-xs text-indigo-300 font-medium">1 / 3 / 7 / 14 Day Intervals</span>
            </div>

            <div className="space-y-2.5">
              {revisions.map((rev) => {
                const isDone = rev.status === 'completed';
                return (
                  <div
                    key={rev.id}
                    onClick={() => toggleRevision(rev.id)}
                    className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                      isDone
                        ? 'bg-emerald-950/20 border-emerald-500/30 text-slate-400 line-through'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center border shrink-0 ${
                        isDone ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-600'
                      }`}>
                        {isDone && <Check className="w-3 h-3" />}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold font-mono text-cyan-300">{rev.subject_code}</span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 font-semibold">
                            {rev.interval_type}
                          </span>
                        </div>
                        <p className="text-xs text-slate-200 mt-0.5">{rev.topic}</p>
                      </div>
                    </div>

                    <span className="text-[11px] text-slate-400 font-medium shrink-0">
                      {rev.scheduled_date}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Col: Interactive Pomodoro Focus Widget */}
        <div className="glass-panel-glow p-6 rounded-3xl border border-indigo-500/30 space-y-6 flex flex-col justify-between">
          <div className="space-y-2 text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">Autonomous Focus Widget</span>
            <h3 className="text-xl font-extrabold text-white">Pomodoro Timer</h3>
            <p className="text-xs text-slate-400">
              {mode === 'focus' ? '🎯 High Intensity Focus Interval' : '☕ Rest & Rehydration Break'}
            </p>
          </div>

          {/* Big Circular Clock Display */}
          <div className="relative w-48 h-48 mx-auto flex items-center justify-center rounded-full bg-slate-950/80 border-4 border-indigo-500/30 shadow-glow-primary">
            <div className="text-center space-y-1">
              <span className="text-4xl font-extrabold font-mono text-white tracking-wider">
                {formatTime(timerSeconds)}
              </span>
              <span className="block text-[11px] font-semibold text-indigo-300 uppercase">
                {mode}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setIsActive(!isActive)}
                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-glow-primary transition-all"
              >
                {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isActive ? 'Pause Focus' : 'Start Focus'}</span>
              </button>

              <button
                onClick={() => {
                  setIsActive(false);
                  setTimerSeconds(mode === 'focus' ? 25 * 60 : 5 * 60);
                }}
                className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
                title="Reset Timer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <div className="text-center pt-2">
              <span className="text-xs text-slate-400">
                Completed today: <strong className="text-emerald-400 font-bold">{completedPomodoros} Cycles</strong> (75m Focus)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
