import React from 'react';
import { MasterSemesterState } from '../../lib/types';
import { Calendar, CheckCircle2, Clock, Sparkles } from 'lucide-react';

interface SemesterTimelineProps {
  events: MasterSemesterState['timeline_events'];
}

export const SemesterTimeline: React.FC<SemesterTimelineProps> = ({ events }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-white">Semester Chronological Milestone Roadmap</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            End-to-end semester progression from Week 1 Kickoff through Mid-Sem Tests to End-Sem Evaluations.
          </p>
        </div>
      </div>

      {/* Horizontal / Grid Roadmap */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((ev, idx) => {
          const isDone = ev.status === 'completed';
          const isActive = ev.status === 'active';
          return (
            <div
              key={idx}
              className={`p-5 rounded-2xl glass-card border transition-all ${
                isActive
                  ? 'border-indigo-500/50 bg-indigo-950/20 ring-1 ring-indigo-500/40 shadow-glow-primary'
                  : isDone
                  ? 'border-emerald-500/30 bg-emerald-950/10'
                  : 'border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-400">{ev.week}</span>
                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                  isActive
                    ? 'bg-indigo-500/20 text-indigo-300'
                    : isDone
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : 'bg-slate-800 text-slate-400'
                }`}>
                  {ev.status}
                </span>
              </div>

              <h3 className="text-sm font-bold text-white mt-2">{ev.title}</h3>
              <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-500" /> {ev.date}
              </p>

              <p className="text-xs text-slate-300 mt-3 pt-3 border-t border-slate-800/80 leading-relaxed">
                {ev.focus}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
