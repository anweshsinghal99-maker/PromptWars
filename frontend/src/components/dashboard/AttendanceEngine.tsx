import React, { useState } from 'react';
import { AttendanceSummary } from '../../lib/types';
import { ShieldCheck, AlertTriangle, Calculator, Sparkles, TrendingUp, BarChart2 } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

interface AttendanceEngineProps {
  attendance: AttendanceSummary;
}

export const AttendanceEngine: React.FC<AttendanceEngineProps> = ({ attendance }) => {
  const [selectedSubject, setSelectedSubject] = useState<string>(attendance.subject_details[0]?.subject_code || "UES103");
  const [skipsPlanned, setSkipsPlanned] = useState<number>(1);

  const activeSubj = attendance.subject_details.find(s => s.subject_code === selectedSubject) || attendance.subject_details[0];

  // Real-time simulation
  const simTotal = activeSubj ? activeSubj.total_classes + skipsPlanned : 0;
  const simPct = activeSubj ? Math.round((activeSubj.attended_classes / simTotal) * 1000) / 10 : 100.0;
  const isSimSafe = simPct >= 75.0;
  const newSafeBunks = isSimSafe ? Math.max(0, Math.floor((activeSubj.attended_classes - 0.75 * simTotal) / 0.75)) : 0;
  const recoveryNeeded = !isSimSafe ? Math.ceil((0.75 * simTotal - activeSubj.attended_classes) / 0.25) : 0;

  // Chart data
  const chartData = attendance.subject_details.map(s => ({
    name: s.subject_code,
    attendance: s.current_percentage,
    isDanger: s.danger_threshold
  }));

  return (
    <div className="space-y-6">
      {/* Top Visual Summary */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-white">Attendance Sentinel</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold">
              75.0% Mandatory Guard
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Real-time safe bunk calculations & danger thresholds synchronized with your timetable.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-left sm:text-right">
            <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Overall Semester Standing</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-emerald-400">{attendance.overall_percentage}%</span>
              <span className="text-xs text-slate-400">({attendance.total_attended}/{attendance.total_held} classes)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Chart & Simulator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 5 Cols: Visual Attendance Bar Chart */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <BarChart2 className="w-4 h-4 text-indigo-400" /> Subject Attendance Distribution
            </h3>
            <span className="text-[10px] text-slate-500 font-mono">Red = Below 75%</span>
          </div>

          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis domain={[0, 100]} stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                  formatter={(val: any) => [`${val}%`, 'Attendance']}
                />
                <Bar dataKey="attendance" radius={[6, 6, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.isDanger ? '#f43f5e' : '#10b981'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right 7 Cols: Interactive What-If Bunk Simulator */}
        {activeSubj && (
          <div className="lg:col-span-7 glass-panel-glow p-6 sm:p-7 rounded-3xl border border-indigo-500/30 space-y-5 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
                  <Calculator className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">"What-If" Bunk Simulator</h3>
                  <p className="text-[11px] text-slate-400">Predict future attendance before skipping lectures.</p>
                </div>
              </div>

              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                {attendance.subject_details.map(s => (
                  <option key={s.subject_code} value={s.subject_code}>
                    {s.subject_code} ({s.current_percentage}%)
                  </option>
                ))}
              </select>
            </div>

            {/* Slider */}
            <div className="space-y-2 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">Planned Absences / Skips:</span>
                <span className="text-indigo-400 font-bold text-sm">{skipsPlanned} class(es)</span>
              </div>
              <input
                type="range"
                min="1"
                max="6"
                value={skipsPlanned}
                onChange={(e) => setSkipsPlanned(parseInt(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>

            {/* Simulation Result Box */}
            <div className={`p-4 rounded-2xl border ${isSimSafe ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-rose-950/25 border-rose-500/40'} flex items-center justify-between gap-4`}>
              <div>
                <span className="text-[11px] text-slate-400 uppercase font-semibold">Projected Attendance</span>
                <p className={`text-2xl font-black ${isSimSafe ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {simPct}%
                </p>
              </div>

              <div className="text-right">
                <span className="text-[11px] text-slate-400 uppercase font-semibold">Safe Bunks Remaining</span>
                <p className="text-xl font-bold text-white">{newSafeBunks}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Grid of Subject Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {attendance.subject_details.map((subj) => {
          const isDanger = subj.danger_threshold;
          return (
            <div
              key={subj.subject_code}
              onClick={() => setSelectedSubject(subj.subject_code)}
              className={`p-5 rounded-3xl glass-card border cursor-pointer transition-all ${
                selectedSubject === subj.subject_code ? 'ring-2 ring-indigo-500 border-indigo-500' : ''
              } ${isDanger ? 'border-rose-500/40 bg-rose-950/15' : 'border-slate-800'}`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-slate-400">{subj.subject_code}</span>
                  <h3 className="text-sm font-bold text-white line-clamp-1 mt-0.5">{subj.subject_name}</h3>
                </div>
                {isDanger ? (
                  <span className="p-1.5 rounded-xl bg-rose-500/20 text-rose-400">
                    <AlertTriangle className="w-4 h-4" />
                  </span>
                ) : (
                  <span className="p-1.5 rounded-xl bg-emerald-500/20 text-emerald-400">
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                )}
              </div>

              <div className="mt-4 space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">{subj.attended_classes} of {subj.total_classes} attended</span>
                  <span className={`font-extrabold ${isDanger ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {subj.current_percentage}%
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isDanger ? 'bg-gradient-to-r from-rose-600 to-rose-400' : 'bg-gradient-to-r from-emerald-600 to-cyan-400'
                    }`}
                    style={{ width: `${Math.min(100, subj.current_percentage)}%` }}
                  />
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                {isDanger ? (
                  <span className="text-rose-400 font-semibold flex items-center gap-1">
                    🚨 Must attend next {subj.classes_needed_for_target} classes
                  </span>
                ) : (
                  <span className="text-slate-300 font-medium">
                    Safe to bunk: <strong className="text-cyan-300 font-bold">{subj.safe_bunks} lecture(s)</strong>
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
