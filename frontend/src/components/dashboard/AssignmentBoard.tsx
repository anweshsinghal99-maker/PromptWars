import React, { useState } from 'react';
import { Assignment, SubtaskItem } from '../../lib/types';
import { CheckSquare, Clock, Plus, ChevronDown, ChevronUp, Sparkles, Check, X } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Input, Select } from '../ui/Input';
import { SectionHeader } from '../ui/SectionHeader';
import { ProgressBar } from '../ui/ProgressBar';

interface AssignmentBoardProps {
  assignments: Assignment[];
}

const COLUMNS: Array<{ title: string; status: 'pending' | 'doing' | 'completed' }> = [
  { title: 'Pending',     status: 'pending' },
  { title: 'In Progress', status: 'doing' },
  { title: 'Completed',   status: 'completed' },
];

const PRIORITY_BADGE: Record<string, 'danger' | 'warning' | 'default'> = {
  High:   'danger',
  Medium: 'warning',
  Low:    'default',
};

export const AssignmentBoard: React.FC<AssignmentBoardProps> = ({ assignments: initialAssignments }) => {
  const [assignments, setAssignments]   = useState<Assignment[]>(initialAssignments);
  const [expandedId, setExpandedId]     = useState<number | null>(assignments[0]?.id || null);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newTitle, setNewTitle]         = useState('');
  const [newSubj, setNewSubj]           = useState('UES103');
  const [newHours, setNewHours]         = useState(4.0);

  const toggleSubtask = (assignmentId: number, subtaskId: string) => {
    setAssignments(prev => prev.map(a => {
      if (a.id !== assignmentId) return a;
      const updatedSubtasks = a.subtasks.map(st =>
        st.id === subtaskId ? { ...st, is_done: !st.is_done } : st
      );
      const doneCount = updatedSubtasks.filter(st => st.is_done).length;
      const pct       = Math.round((doneCount / updatedSubtasks.length) * 100);
      const status: 'pending' | 'doing' | 'completed' =
        pct === 100 ? 'completed' : pct > 0 ? 'doing' : 'pending';
      return { ...a, subtasks: updatedSubtasks, completion_pct: pct, status };
    }));
  };

  const handleCreateAssignment = () => {
    if (!newTitle.trim()) return;
    const daysAvailable = 4;
    const minsTotal  = Math.round(newHours * 60);
    const dailyMins  = Math.round(minsTotal / daysAvailable);
    const generatedSubtasks: SubtaskItem[] = [
      { id: `sub-1-${Date.now()}`, day: 'Day 1', title: 'Review requirements & core theory definitions', estimated_mins: dailyMins, is_done: false },
      { id: `sub-2-${Date.now()}`, day: 'Day 2', title: 'Implement code / derivations & test algorithms', estimated_mins: dailyMins, is_done: false },
      { id: `sub-3-${Date.now()}`, day: 'Day 3', title: 'Edge case testing & performance checks',          estimated_mins: dailyMins, is_done: false },
      { id: `sub-4-${Date.now()}`, day: 'Day 4', title: 'Final report formatting & submission',           estimated_mins: dailyMins, is_done: false },
    ];
    const newAssignment: Assignment = {
      id: assignments.length + 1,
      subject_code: newSubj,
      title: newTitle,
      description: 'Auto-split assignment managed by AI Assignment Agent.',
      deadline: new Date(Date.now() + 5 * 86400000).toISOString(),
      priority: 'High',
      difficulty: 'Medium',
      estimated_hours: newHours,
      completion_pct: 0,
      status: 'pending',
      subtasks: generatedSubtasks,
    };
    setAssignments([newAssignment, ...assignments]);
    setExpandedId(newAssignment.id);
    setNewTitle('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-4">

      {/* Header */}
      <Card padding="md">
        <SectionHeader
          icon={<CheckSquare className="w-4 h-4" />}
          title="Assignment Board"
          description="Agent 5 auto-splits multi-hour projects into daily 40–90 min subtasks."
          action={
            <Button
              variant="primary"
              size="sm"
              onClick={() => setShowAddModal(true)}
              leftIcon={<Plus className="w-3.5 h-3.5" aria-hidden="true" />}
            >
              New Assignment
            </Button>
          }
        />
      </Card>

      {/* Kanban 3-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {COLUMNS.map(col => {
          const colAssignments = assignments.filter(a => a.status === col.status);
          return (
            <div key={col.status} className="space-y-3">
              {/* Column header */}
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {col.title}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-elevated border border-white/[0.07] text-slate-500 text-xs font-medium">
                  {colAssignments.length}
                </span>
              </div>

              {/* Cards */}
              <div className="space-y-3 min-h-[200px]">
                {colAssignments.map(a => {
                  const isExpanded = expandedId === a.id;
                  return (
                    <Card key={a.id} padding="md">
                      {/* Top badges */}
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <Badge variant="accent" className="font-mono">{a.subject_code}</Badge>
                        <Badge variant={PRIORITY_BADGE[a.priority] ?? 'default'}>
                          {a.priority}
                        </Badge>
                      </div>

                      <h3 className="text-sm font-semibold text-slate-100 leading-snug mb-2">{a.title}</h3>

                      <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" aria-hidden="true" /> {a.estimated_hours}h est.
                        </span>
                        <span className="font-medium text-slate-400">{a.completion_pct}%</span>
                      </div>

                      <ProgressBar
                        value={a.completion_pct}
                        variant={a.status === 'completed' ? 'success' : 'accent'}
                      />

                      {/* Subtask toggle */}
                      {a.subtasks?.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-white/[0.05]">
                          <button
                            onClick={() => setExpandedId(isExpanded ? null : a.id)}
                            className="w-full flex items-center justify-between text-xs text-accent hover:text-accent/80 font-medium transition-colors"
                          >
                            <span className="flex items-center gap-1.5">
                              <Sparkles className="w-3 h-3" aria-hidden="true" />
                              {a.subtasks.length} Auto-Split Steps
                            </span>
                            {isExpanded
                              ? <ChevronUp className="w-3.5 h-3.5" />
                              : <ChevronDown className="w-3.5 h-3.5" />
                            }
                          </button>

                          {isExpanded && (
                            <div className="mt-2.5 space-y-1.5 animate-fade-in">
                              {a.subtasks.map(st => (
                                <div
                                  key={st.id}
                                  onClick={() => toggleSubtask(a.id, st.id)}
                                  className={[
                                    'flex items-start gap-2.5 p-2.5 rounded-lg border cursor-pointer transition-colors duration-150',
                                    st.is_done
                                      ? 'bg-emerald-500/[0.06] border-emerald-500/15 text-slate-500'
                                      : 'bg-surface/60 border-white/[0.06] hover:border-white/[0.12] text-slate-300',
                                  ].join(' ')}
                                >
                                  <span className={[
                                    'w-4 h-4 rounded flex items-center justify-center border shrink-0 mt-0.5 transition-colors',
                                    st.is_done
                                      ? 'bg-emerald-500 border-emerald-500 text-[#ffffff]'
                                      : 'border-white/20',
                                  ].join(' ')}>
                                    {st.is_done && <Check className="w-2.5 h-2.5" />}
                                  </span>
                                  <div className="flex-1 min-w-0">
                                    <span className="text-[11px] font-semibold text-accent">{st.day}:</span>
                                    <span className={`text-[11px] ml-1 ${st.is_done ? 'line-through' : ''}`}>
                                      {st.title}
                                    </span>
                                    <span className="block text-[10px] text-slate-600 font-mono mt-0.5">
                                      ~{st.estimated_mins} min
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </Card>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Assignment Modal */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in"
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="max-w-md w-full bg-elevated border border-white/[0.1] rounded-2xl p-6 space-y-4 animate-slide-up shadow-elevation-lg"
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Create new assignment"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-slate-100">New Assignment</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-7 h-7 rounded-lg bg-white/[0.06] hover:bg-white/[0.10] text-slate-400 flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <Input
              label="Assignment title"
              placeholder="e.g. C Pointers & Memory Management Lab Report"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
            />

            <div className="grid grid-cols-2 gap-3">
              <Select
                label="Subject"
                value={newSubj}
                onChange={e => setNewSubj(e.target.value)}
              >
                <option value="UES103">UES103 — PPS C</option>
                <option value="UES013">UES013 — Electrical</option>
                <option value="UMA022">UMA022 — Calculus</option>
                <option value="UCB009">UCB009 — Chemistry</option>
                <option value="UAI101">UAI101 — AI Found.</option>
                <option value="UEN008">UEN008 — Environment</option>
              </Select>
              <Input
                label="Est. hours"
                type="number"
                step="0.5"
                value={newHours}
                onChange={e => setNewHours(parseFloat(e.target.value))}
              />
            </div>

            <div className="flex gap-2.5 pt-1">
              <Button
                variant="ghost"
                className="flex-1"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                className="flex-1"
                onClick={handleCreateAssignment}
                leftIcon={<Sparkles className="w-3.5 h-3.5" />}
              >
                Auto-Split & Add
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
