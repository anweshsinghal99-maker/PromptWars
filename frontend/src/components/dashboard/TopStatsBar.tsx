import React from 'react';
import { MasterSemesterState } from '../../lib/types';
import { ShieldCheck, AlertTriangle, TrendingUp, Clock, Calendar, Sparkles, Download, Bot, BookOpen } from 'lucide-react';

interface TopStatsBarProps {
  state: MasterSemesterState;
  onOpenChat: () => void;
  onOpenHandbook: () => void;
  onDownloadICS: () => void;
}

export const TopStatsBar: React.FC<TopStatsBarProps> = ({ state, onOpenChat, onOpenHandbook, onDownloadICS }) => {
  const { user, attendance, next_exam } = state;
  const isDanger = attendance.at_risk_count > 0;

  return (
    <div className="w-full space-y-4">
      {/* Upper Bar: Title & Primary Action Buttons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-4 sm:p-5 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-glow-primary font-bold text-lg">
            SC
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-white tracking-tight">{user.name}</h1>
              <span className="px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 text-[11px] font-semibold">
                {user.semester} • {user.branch}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-light mt-0.5">
              {user.university} • {user.is_hosteller ? "Hosteller (Curfew 8:30 PM)" : "Day Scholar"}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={onOpenChat}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-xs font-semibold flex items-center gap-2 shadow-glow-primary transition-all"
          >
            <Bot className="w-4 h-4 text-cyan-300" />
            <span>Ask Copilot</span>
          </button>

          <button
            onClick={onOpenHandbook}
            className="px-4 py-2 rounded-xl glass-card hover:bg-slate-800 text-indigo-300 text-xs font-semibold flex items-center gap-2 border border-indigo-500/30 transition-all"
          >
            <BookOpen className="w-4 h-4" />
            <span>15-Page Handbook</span>
          </button>

          <button
            onClick={onDownloadICS}
            className="px-3.5 py-2 rounded-xl glass-card hover:bg-slate-800 text-slate-300 text-xs font-medium flex items-center gap-1.5 border border-slate-700"
            title="Export .ics to Google Calendar / Outlook"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export .ICS</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Attendance Metric */}
        <div className={`p-4 rounded-2xl glass-card border ${isDanger ? 'border-rose-500/30 bg-rose-950/10' : 'border-emerald-500/30'}`}>
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Overall Attendance</span>
            {isDanger ? (
              <span className="flex items-center gap-1 text-[11px] text-rose-400 font-semibold px-2 py-0.5 rounded-full bg-rose-500/10">
                <AlertTriangle className="w-3 h-3" /> 1 At Risk
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10">
                <ShieldCheck className="w-3 h-3" /> Safe Zone
              </span>
            )}
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className={`text-2xl sm:text-3xl font-extrabold ${isDanger ? 'text-rose-400' : 'text-emerald-400'}`}>
              {attendance.overall_percentage}%
            </span>
            <span className="text-xs text-slate-400 font-normal">/ {attendance.target_percentage}% req</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            {attendance.total_attended} of {attendance.total_held} lectures attended
          </p>
        </div>

        {/* CGPA Projection */}
        <div className="p-4 rounded-2xl glass-card border border-indigo-500/20">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">CGPA Trajectory</span>
            <TrendingUp className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-white">{user.current_cgpa}</span>
            <span className="text-xs font-semibold text-emerald-400">Target: {user.target_cgpa}</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            20.0 Credits • Weighted for Tier-1 Placement
          </p>
        </div>

        {/* Study Hours */}
        <div className="p-4 rounded-2xl glass-card border border-cyan-500/20">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Daily Study Budget</span>
            <Clock className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-cyan-300">{user.daily_study_hours} hrs</span>
            <span className="text-[11px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 font-medium">
              {user.study_style}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Peak: {user.chronotype} (21:30 - 01:00)
          </p>
        </div>

        {/* Next Exam Countdown */}
        <div className="p-4 rounded-2xl glass-card border border-amber-500/20">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Next Major Exam</span>
            <Calendar className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-300">
              {next_exam.days_remaining} <span className="text-xs font-normal text-slate-400">days</span>
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-semibold">
              MST (30%)
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1 truncate">
            {next_exam.date}
          </p>
        </div>
      </div>
    </div>
  );
};
