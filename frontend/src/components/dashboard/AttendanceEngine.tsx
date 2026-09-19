import React, { useState } from 'react';
import { AttendanceSummary } from '../../lib/types';
import { ShieldCheck, AlertTriangle, Calculator, BarChart2 } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { SectionHeader } from '../ui/SectionHeader';
import { ProgressBar } from '../ui/ProgressBar';

interface AttendanceEngineProps {
  attendance: AttendanceSummary;
}

export const AttendanceEngine: React.FC<AttendanceEngineProps> = ({ attendance }) => {
  const [selectedSubject, setSelectedSubject] = useState<string>(
    attendance.subject_details[0]?.subject_code || 'UES103'
  );
  const [skipsPlanned, setSkipsPlanned] = useState<number>(1);

  const activeSubj =
    attendance.subject_details.find(s => s.subject_code === selectedSubject) ||
    attendance.subject_details[0];

  const simTotal   = activeSubj ? activeSubj.total_classes + skipsPlanned : 0;
  const simPct     = activeSubj ? Math.round((activeSubj.attended_classes / simTotal) * 1000) / 10 : 100.0;
  const isSimSafe  = simPct >= 75.0;
  const newSafeBunks   = isSimSafe ? Math.max(0, Math.floor((activeSubj.attended_classes - 0.75 * simTotal) / 0.75)) : 0;
  const recoveryNeeded = !isSimSafe ? Math.ceil((0.75 * simTotal - activeSubj.attended_classes) / 0.25) : 0;

  const chartData = attendance.subject_details.map(s => ({
    name: s.subject_code,
    attendance: s.current_percentage,
    isDanger: s.danger_threshold,
  }));

  return (
    <div className="space-y-4">

      {/* Header summary */}
      <Card padding="md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <SectionHeader
            icon={<ShieldCheck className="w-4 h-4" />}
            title="Attendance Sentinel"
            description="Real-time safe bunk calculations synced with your timetable."
            badge={<Badge variant="success">75% Guard</Badge>}
          />
          <div className="text-right shrink-0">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider">Overall</span>
            <div className="flex items-baseline gap-1.5">
              <span className={`text-3xl font-bold tabular-nums ${attendance.at_risk_count > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                {attendance.overall_percentage}%
              </span>
              <span className="text-xs text-slate-600">({attendance.total_attended}/{attendance.total_held})</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Chart + Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

        {/* Bar chart */}
        <Card className="lg:col-span-5" padding="md">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BarChart2 className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
              <span className="text-xs font-semibold text-slate-400">Subject Distribution</span>
            </div>
            <span className="text-[10px] text-slate-600 font-mono">Red = &lt;75%</span>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
                <XAxis
                  dataKey="name"
                  stroke="#475569"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  domain={[0, 100]}
                  stroke="#475569"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderColor: 'rgba(0,0,0,0.1)',
                    borderRadius: '10px',
                    fontSize: '12px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                    color: '#1e293b'
                  }}
                  cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                  formatter={(val: any) => [`${val}%`, 'Attendance']}
                />
                <Bar dataKey="attendance" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, i) => (
                    <Cell key={`cell-${i}`} fill={entry.isDanger ? '#ef4444' : '#10b981'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* What-If Simulator */}
        {activeSubj && (
          <Card className="lg:col-span-7" padding="md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <Calculator className="w-4 h-4 text-accent" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-100">"What-If" Bunk Simulator</h3>
                  <p className="text-[11px] text-slate-500">Predict attendance before skipping.</p>
                </div>
              </div>
              <select
                value={selectedSubject}
                onChange={e => setSelectedSubject(e.target.value)}
                className="bg-surface border border-white/[0.09] rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-accent/50"
              >
                {attendance.subject_details.map(s => (
                  <option key={s.subject_code} value={s.subject_code}>
                    {s.subject_code} ({s.current_percentage}%)
                  </option>
                ))}
              </select>
            </div>

            {/* Slider */}
            <div className="bg-surface/60 border border-white/[0.06] rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 font-medium">Planned absences:</span>
                <span className="text-accent font-semibold tabular-nums">{skipsPlanned} class{skipsPlanned > 1 ? 'es' : ''}</span>
              </div>
              <input
                type="range"
                min="1"
                max="6"
                value={skipsPlanned}
                onChange={e => setSkipsPlanned(parseInt(e.target.value))}
                className="w-full accent-accent cursor-pointer"
                aria-label="Number of planned absences"
              />
              <div className="flex justify-between text-[10px] text-slate-600 font-mono">
                <span>1</span><span>6</span>
              </div>
            </div>

            {/* Result */}
            <div className={[
              'mt-4 p-4 rounded-lg border flex items-center justify-between gap-4',
              isSimSafe
                ? 'bg-emerald-500/[0.06] border-emerald-500/20'
                : 'bg-red-500/[0.06] border-red-500/20',
            ].join(' ')}>
              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">Projected</span>
                <p className={`text-2xl font-bold tabular-nums ${isSimSafe ? 'text-emerald-400' : 'text-red-400'}`}>
                  {simPct}%
                </p>
              </div>
              <div className="text-right">
                {isSimSafe ? (
                  <>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">Safe bunks left</span>
                    <p className="text-2xl font-bold tabular-nums text-slate-100">{newSafeBunks}</p>
                  </>
                ) : (
                  <>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">Classes needed</span>
                    <p className="text-2xl font-bold tabular-nums text-red-400">{recoveryNeeded}</p>
                  </>
                )}
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Subject cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {attendance.subject_details.map(subj => {
          const isDanger = subj.danger_threshold;
          const isSelected = selectedSubject === subj.subject_code;
          return (
            <Card
              key={subj.subject_code}
              interactive
              selected={isSelected}
              danger={isDanger && !isSelected}
              onClick={() => setSelectedSubject(subj.subject_code)}
              padding="md"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="text-[10px] font-mono font-semibold text-slate-500">
                    {subj.subject_code}
                  </span>
                  <h3 className="text-sm font-semibold text-slate-100 line-clamp-1 mt-0.5">
                    {subj.subject_name}
                  </h3>
                </div>
                {isDanger
                  ? <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" aria-label="At risk" />
                  : <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" aria-label="Safe" />
                }
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">
                    {subj.attended_classes} / {subj.total_classes}
                  </span>
                  <span className={`font-bold tabular-nums ${isDanger ? 'text-red-400' : 'text-emerald-400'}`}>
                    {subj.current_percentage}%
                  </span>
                </div>
                <ProgressBar
                  value={subj.current_percentage}
                  variant={isDanger ? 'danger' : 'success'}
                />
              </div>

              <div className="mt-3 pt-3 border-t border-white/[0.05] text-xs">
                {isDanger ? (
                  <span className="text-red-400 font-medium">
                    Must attend next {subj.classes_needed_for_target} classes
                  </span>
                ) : (
                  <span className="text-slate-500">
                    Safe to skip: <strong className="text-slate-300 font-semibold">{subj.safe_bunks} lecture{subj.safe_bunks !== 1 ? 's' : ''}</strong>
                  </span>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
