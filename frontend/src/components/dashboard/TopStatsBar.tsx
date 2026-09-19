import React from 'react';
import { MasterSemesterState } from '../../lib/types';
import { ShieldCheck, AlertTriangle, TrendingUp, Clock, Calendar, Bot, Download, BookOpen } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface TopStatsBarProps {
  state: MasterSemesterState;
  onOpenChat: () => void;
  onOpenHandbook: () => void;
  onDownloadICS: () => void;
}

export const TopStatsBar: React.FC<TopStatsBarProps> = ({
  state, onOpenChat, onOpenHandbook, onDownloadICS
}) => {
  const { user, attendance, next_exam } = state;
  const isDanger = attendance.at_risk_count > 0;

  return (
    <div className="w-full space-y-4">

      {/* ── Profile + Actions row ── */}
      <Card padding="md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* User profile */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/15 border border-accent/20 flex items-center justify-center text-accent font-bold text-sm shrink-0">
              {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-base font-semibold text-slate-100">{user.name}</h1>
                <Badge variant="accent">{user.semester} · {user.branch}</Badge>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {user.university} · {user.is_hosteller ? 'Hosteller (Curfew 8:30 PM)' : 'Day Scholar'}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={onOpenChat}
              leftIcon={<Bot className="w-3.5 h-3.5" aria-hidden="true" />}
            >
              Ask Copilot
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={onOpenHandbook}
              leftIcon={<BookOpen className="w-3.5 h-3.5" aria-hidden="true" />}
            >
              Handbook
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onDownloadICS}
              leftIcon={<Download className="w-3.5 h-3.5" aria-hidden="true" />}
              title="Export .ics to Google Calendar / Outlook"
            >
              .ICS
            </Button>
          </div>
        </div>
      </Card>

      {/* ── Metric cards row ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">

        {/* Attendance */}
        <Card padding="md" danger={isDanger}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-slate-500 font-medium">Attendance</span>
            {isDanger
              ? <Badge variant="danger" dot><AlertTriangle className="w-2.5 h-2.5" /> At Risk</Badge>
              : <Badge variant="success" dot><ShieldCheck className="w-2.5 h-2.5" /> Safe</Badge>
            }
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className={`text-2xl font-bold tabular-nums ${isDanger ? 'text-red-400' : 'text-emerald-400'}`}>
              {attendance.overall_percentage}%
            </span>
            <span className="text-xs text-slate-600">/ {attendance.target_percentage}% req</span>
          </div>
          <p className="text-[11px] text-slate-600 mt-1">
            {attendance.total_attended} of {attendance.total_held} classes
          </p>
        </Card>

        {/* CGPA */}
        <Card padding="md">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-slate-500 font-medium">CGPA</span>
            <TrendingUp className="w-3.5 h-3.5 text-slate-600" aria-hidden="true" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold tabular-nums text-slate-100">{user.current_cgpa}</span>
            <span className="text-xs font-medium text-emerald-400">→ {user.target_cgpa}</span>
          </div>
          <p className="text-[11px] text-slate-600 mt-1">20.0 Credits · Tier-1 Placement</p>
        </Card>

        {/* Study hours */}
        <Card padding="md">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-slate-500 font-medium">Study Budget</span>
            <Clock className="w-3.5 h-3.5 text-slate-600" aria-hidden="true" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold tabular-nums text-slate-100">{user.daily_study_hours}</span>
            <span className="text-xs text-slate-500">hrs / day</span>
          </div>
          <p className="text-[11px] text-slate-600 mt-1">{user.study_style} · {user.chronotype}</p>
        </Card>

        {/* Next exam */}
        <Card padding="md">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-slate-500 font-medium">Next Exam</span>
            <Calendar className="w-3.5 h-3.5 text-slate-600" aria-hidden="true" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold tabular-nums text-amber-400">{next_exam.days_remaining}</span>
            <span className="text-xs text-slate-500">days away</span>
          </div>
          <p className="text-[11px] text-slate-600 mt-1 truncate">{next_exam.date} · MST (30%)</p>
        </Card>
      </div>
    </div>
  );
};
