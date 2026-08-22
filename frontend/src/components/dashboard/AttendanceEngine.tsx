import React, { useState } from 'react';
import { AttendanceSummary } from '../../lib/types';
import { ShieldCheck, AlertTriangle, Calculator, Sparkles, TrendingDown, ArrowRight } from 'lucide-react';

interface AttendanceEngineProps {
  attendance: AttendanceSummary;
}

export const AttendanceEngine: React.FC<AttendanceEngineProps> = ({ attendance }) => {
  const [selectedSubject, setSelectedSubject] = useState<string>(attendance.subject_details[0]?.subject_code || "UES103");
  const [skipsPlanned, setSkipsPlanned] = useState<number>(1);

  const activeSubj = attendance.subject_details.find(s => s.subject_code === selectedSubject) || attendance.subject_details[0];

  // Real-time local simulation
  const simTotal = activeSubj ? activeSubj.total_classes + skipsPlanned : 0;
  const simPct = activeSubj ? Math.round((activeSubj.attended_classes / simTotal) * 1000) / 10 : 100.0;
  const isSimSafe = simPct >= 75.0;
  const newSafeBunks = isSimSafe ? Math.max(0, Math.floor((activeSubj.attended_classes - 0.75 * simTotal) / 0.75)) : 0;
  const recoveryNeeded = !isSimSafe ? Math.ceil((0.75 * simTotal - activeSubj.attended_classes) / 0.25) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-white">Attendance Engine & Safe Bunk Sentinel</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Institute Mandatory Benchmark: <span className="text-white font-semibold">75.0%</span> • Synchronized with academic timetable
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs text-slate-400 font-medium">Overall Semester Standing</span>
            <p className="text-2xl font-extrabold text-emerald-400">{attendance.overall_percentage}%</p>
          </div>
        </div>
      </div>

      {/* Grid of Subject Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {attendance.subject_details.map((subj) => {
          const isDanger = subj.danger_threshold;
          return (
            <div
              key={subj.subject_code}
              onClick={() => setSelectedSubject(subj.subject_code)}
              className={`p-5 rounded-2xl glass-card border cursor-pointer transition-all ${
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

              {/* Attendance Progress Bar */}
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

              {/* Safe Bunk Pill */}
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
                <button className="text-[11px] text-indigo-400 hover:text-indigo-300 font-semibold">
                  Simulate →
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive What-If Bunk Simulator */}
      {activeSubj && (
        <div className="glass-panel-glow p-6 sm:p-8 rounded-3xl border border-indigo-500/30 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Predictive "What-If" Bunk Simulator</h3>
              <p className="text-xs text-slate-400">Simulate upcoming absences and test danger thresholds before skipping.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Subject Selector & Slider */}
            <div className="space-y-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
              <div className="space-y-1.5">
                <label className="text-xs text-slate-400 font-medium">Select Subject:</label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                >
                  {attendance.subject_details.map(s => (
                    <option key={s.subject_code} value={s.subject_code}>
                      {s.subject_code} - {s.subject_name} ({s.current_percentage}%)
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-medium">Planned Skips:</span>
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
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>1 Class</span>
                  <span>2 Classes</span>
                  <span>3 Classes</span>
                  <span>4 Classes</span>
                  <span>5 Classes</span>
                  <span>6 Classes</span>
                </div>
              </div>
            </div>

            {/* Simulation Results Output */}
            <div className={`p-5 rounded-2xl border ${isSimSafe ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-rose-950/20 border-rose-500/40'} space-y-3`}>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400">Current Standing</span>
                <span className="text-xs font-bold text-white">{activeSubj.current_percentage}%</span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400">Projected Attendance</span>
                  <p className={`text-3xl font-extrabold mt-0.5 ${isSimSafe ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {simPct}%
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400">Remaining Bunks</span>
                  <p className="text-xl font-bold text-white mt-0.5">{newSafeBunks}</p>
                </div>
              </div>

              <p className="text-xs text-slate-300 pt-2 border-t border-slate-800 leading-relaxed">
                {isSimSafe ? (
                  <span className="text-emerald-300">
                    ✅ <strong>Safe to skip.</strong> Your attendance remains above the 75% requirement.
                  </span>
                ) : (
                  <span className="text-rose-300">
                    🚨 <strong>Danger threshold breached!</strong> You will fall to {simPct}%. You would need {recoveryNeeded} consecutive classes to recover to 75%.
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
