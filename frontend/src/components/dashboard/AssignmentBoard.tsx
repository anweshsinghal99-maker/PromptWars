import React, { useState } from 'react';
import { Assignment, SubtaskItem } from '../../lib/types';
import { CheckSquare, Clock, AlertCircle, Plus, ChevronDown, ChevronUp, Sparkles, Check } from 'lucide-react';

interface AssignmentBoardProps {
  assignments: Assignment[];
}

export const AssignmentBoard: React.FC<AssignmentBoardProps> = ({ assignments: initialAssignments }) => {
  const [assignments, setAssignments] = useState<Assignment[]>(initialAssignments);
  const [expandedId, setExpandedId] = useState<number | null>(assignments[0]?.id || null);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState("");
  const [newSubj, setNewSubj] = useState("UES103");
  const [newHours, setNewHours] = useState(4.0);

  const toggleSubtask = (assignmentId: number, subtaskId: string) => {
    setAssignments(prev => prev.map(a => {
      if (a.id !== assignmentId) return a;
      const updatedSubtasks = a.subtasks.map(st => st.id === subtaskId ? { ...st, is_done: !st.is_done } : st);
      const doneCount = updatedSubtasks.filter(st => st.is_done).length;
      const pct = Math.round((doneCount / updatedSubtasks.length) * 100);
      const status: "pending" | "doing" | "completed" = pct === 100 ? "completed" : pct > 0 ? "doing" : "pending";
      return {
        ...a,
        subtasks: updatedSubtasks,
        completion_pct: pct,
        status
      };
    }));
  };

  const handleCreateAssignment = () => {
    if (!newTitle.trim()) return;
    const daysAvailable = 4;
    const minsTotal = Math.round(newHours * 60);
    const dailyMins = Math.round(minsTotal / daysAvailable);

    const generatedSubtasks: SubtaskItem[] = [
      { id: `sub-1-${Date.now()}`, day: "Day 1", title: "Review requirements & core theory definitions", estimated_mins: dailyMins, is_done: false },
      { id: `sub-2-${Date.now()}`, day: "Day 2", title: "Implement code / derivations & test algorithms", estimated_mins: dailyMins, is_done: false },
      { id: `sub-3-${Date.now()}`, day: "Day 3", title: "Edge case testing & performance checks", estimated_mins: dailyMins, is_done: false },
      { id: `sub-4-${Date.now()}`, day: "Day 4", title: "Final report formatting & submission", estimated_mins: dailyMins, is_done: false }
    ];

    const newAssignment: Assignment = {
      id: assignments.length + 1,
      subject_code: newSubj,
      title: newTitle,
      description: "Auto-split assignment managed by AI Assignment Agent.",
      deadline: new Date(Date.now() + 5 * 86400000).toISOString(),
      priority: "High",
      difficulty: "Medium",
      estimated_hours: newHours,
      completion_pct: 0,
      status: "pending",
      subtasks: generatedSubtasks
    };

    setAssignments([newAssignment, ...assignments]);
    setExpandedId(newAssignment.id);
    setNewTitle("");
    setShowAddModal(false);
  };

  const columns: Array<{ title: string; status: 'pending' | 'doing' | 'completed'; color: string }> = [
    { title: "Pending Queue", status: "pending", color: "text-amber-400 border-amber-500/30" },
    { title: "In Progress (Auto-Split Active)", status: "doing", color: "text-indigo-400 border-indigo-500/30" },
    { title: "Completed & Verified", status: "completed", color: "text-emerald-400 border-emerald-500/30" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-white">Assignment Engine & Daily Auto-Split Kanban</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Agent 5 automatically breaks down multi-hour projects into daily 40-90 minute manageable subtasks.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-glow-primary transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Assignment</span>
        </button>
      </div>

      {/* Kanban 3-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {columns.map((col) => {
          const colAssignments = assignments.filter(a => a.status === col.status);
          return (
            <div key={col.status} className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <span className={`text-xs font-bold uppercase tracking-wider ${col.color.split(' ')[0]}`}>
                  {col.title}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 text-xs font-semibold">
                  {colAssignments.length}
                </span>
              </div>

              <div className="space-y-3 min-h-[250px]">
                {colAssignments.map((a) => {
                  const isExpanded = expandedId === a.id;
                  return (
                    <div key={a.id} className="p-4 rounded-2xl glass-card border border-slate-800 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-bold font-mono">
                          {a.subject_code}
                        </span>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                          a.priority === 'High' ? 'bg-rose-500/20 text-rose-300' : 'bg-slate-800 text-slate-300'
                        }`}>
                          {a.priority} Priority
                        </span>
                      </div>

                      <h3 className="text-xs font-bold text-white leading-snug">{a.title}</h3>

                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-cyan-400" /> {a.estimated_hours} hrs est.</span>
                        <span className="font-semibold text-white">{a.completion_pct}% Done</span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full"
                          style={{ width: `${a.completion_pct}%` }}
                        />
                      </div>

                      {/* Auto-Split Subtasks Toggle */}
                      {a.subtasks && a.subtasks.length > 0 && (
                        <div className="pt-2 border-t border-slate-800/80">
                          <button
                            onClick={() => setExpandedId(isExpanded ? null : a.id)}
                            className="w-full flex items-center justify-between text-[11px] text-indigo-400 hover:text-indigo-300 font-semibold"
                          >
                            <span className="flex items-center gap-1.5">
                              <Sparkles className="w-3 h-3" />
                              {a.subtasks.length} Daily Auto-Split Steps
                            </span>
                            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                          </button>

                          {isExpanded && (
                            <div className="mt-2.5 space-y-2 animate-in fade-in duration-150">
                              {a.subtasks.map((st) => (
                                <div
                                  key={st.id}
                                  onClick={() => toggleSubtask(a.id, st.id)}
                                  className={`p-2 rounded-xl text-[11px] flex items-start gap-2 cursor-pointer border transition-colors ${
                                    st.is_done
                                      ? 'bg-emerald-950/20 border-emerald-500/30 text-slate-400 line-through'
                                      : 'bg-slate-900/90 border-slate-700/60 text-slate-200 hover:border-indigo-500/50'
                                  }`}
                                >
                                  <span className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center border shrink-0 ${
                                    st.is_done ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-600'
                                  }`}>
                                    {st.is_done && <Check className="w-3 h-3" />}
                                  </span>
                                  <div className="flex-1">
                                    <span className="font-semibold text-indigo-300">{st.day}:</span> {st.title}
                                    <span className="block text-[10px] text-slate-400 mt-0.5 font-mono">~{st.estimated_mins} mins</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* New Assignment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full glass-panel-glow rounded-3xl p-6 border border-indigo-500/40 space-y-4">
            <h3 className="text-lg font-bold text-white">Create New Assignment with AI Split</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400">Assignment Title:</label>
                <input
                  type="text"
                  placeholder="e.g. C Pointers & Memory Management Lab Report"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400">Subject Code:</label>
                  <select
                    value={newSubj}
                    onChange={(e) => setNewSubj(e.target.value)}
                    className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  >
                    <option value="UES103">UES103 (PPS C)</option>
                    <option value="UES013">UES013 (Electrical)</option>
                    <option value="UMA022">UMA022 (Calculus)</option>
                    <option value="UCB009">UCB009 (Chemistry)</option>
                    <option value="UAI101">UAI101 (AI Found)</option>
                    <option value="UEN008">UEN008 (Environment)</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400">Est. Hours:</label>
                  <input
                    type="number"
                    step="0.5"
                    value={newHours}
                    onChange={(e) => setNewHours(parseFloat(e.target.value))}
                    className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateAssignment}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-emerald-600 text-white text-xs font-bold shadow-glow-primary"
              >
                Auto-Split & Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
