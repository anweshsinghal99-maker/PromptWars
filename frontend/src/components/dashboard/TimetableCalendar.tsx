import React, { useState } from 'react';
import { TimetableSlot, Subject } from '../../lib/types';
import { Calendar, Clock, MapPin, X } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { SectionHeader } from '../ui/SectionHeader';

interface TimetableCalendarProps {
  slots: TimetableSlot[];
  subjects: Subject[];
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const TIME_BUCKETS = [
  '08:00 - 08:50', '08:50 - 09:40', '09:40 - 10:30',
  '10:30 - 11:20', '11:20 - 12:10', '12:10 - 13:00',
  '13:00 - 13:50', '13:50 - 14:40', '14:40 - 15:30',
  '15:30 - 16:20', '16:20 - 17:10', '17:10 - 18:00', '18:00 - 18:50',
];

const SLOT_TYPE_STYLE: Record<string, string> = {
  lecture:   'bg-blue-500/[0.07]  border-blue-500/25  text-blue-300',
  practical: 'bg-amber-500/[0.07] border-amber-500/25 text-amber-300',
  lab:       'bg-amber-500/[0.07] border-amber-500/25 text-amber-300',
  tutorial:  'bg-rose-500/[0.07] border-rose-500/25 text-rose-300',
};

const getSlotStyle = (type: string) =>
  SLOT_TYPE_STYLE[type.toLowerCase()] ?? SLOT_TYPE_STYLE.lecture;

const FILTER_LABELS = ['ALL', 'LECTURES', 'LABS', 'TUTORIALS'] as const;

export const TimetableCalendar: React.FC<TimetableCalendarProps> = ({ slots, subjects }) => {
  const [selectedDay, setSelectedDay]       = useState<string>('Monday');
  const [filterType, setFilterType]         = useState<string>('ALL');
  const [activeModalSlot, setActiveModalSlot] = useState<TimetableSlot | null>(null);

  const filteredSlots = slots.filter(s => {
    if (filterType === 'LECTURES') return s.slot_type.toLowerCase() === 'lecture';
    if (filterType === 'LABS')     return s.slot_type.toLowerCase() === 'practical';
    if (filterType === 'TUTORIALS') return s.slot_type.toLowerCase() === 'tutorial';
    return true;
  });

  const getSubjectMeta = (code: string) =>
    subjects.find(s => s.code.toUpperCase() === code.toUpperCase()) || null;

  return (
    <div className="space-y-4">

      {/* Header */}
      <Card padding="md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <SectionHeader
            icon={<Calendar className="w-4 h-4" />}
            title="Timetable"
            description="31 contact hours per week"
          />
          {/* Filter tabs */}
          <div className="flex items-center gap-1 bg-white/[0.04] p-1 rounded-lg border border-white/[0.06]">
            {FILTER_LABELS.map(f => (
              <button
                key={f}
                onClick={() => setFilterType(f)}
                className={[
                  'px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-150',
                  filterType === f
                    ? 'bg-accent/15 text-accent'
                    : 'text-slate-500 hover:text-slate-300 hover:bg-white/5',
                ].join(' ')}
              >
                {f.charAt(0) + f.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* ── Mobile day selector ── */}
      <div className="sm:hidden flex overflow-x-auto gap-1.5 pb-1 -mx-1 px-1">
        {DAYS.map(day => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={[
              'px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap border shrink-0 transition-colors duration-150',
              selectedDay === day
                ? 'bg-accent/15 border-accent/30 text-accent'
                : 'bg-elevated border-white/[0.07] text-slate-500 hover:text-slate-300',
            ].join(' ')}
          >
            {day.slice(0, 3)}
          </button>
        ))}
      </div>

      {/* ── Desktop weekly matrix ── */}
      <div className="hidden sm:block bg-elevated border border-white/[0.07] rounded-xl overflow-hidden">
        {/* Column headers */}
        <div className="grid grid-cols-6 bg-surface/80 border-b border-white/[0.07] text-xs font-medium text-slate-500">
          <div className="p-3 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" aria-hidden="true" /> Time
          </div>
          {DAYS.map(d => (
            <div key={d} className="p-3 text-center text-slate-400 font-semibold">{d.slice(0, 3)}</div>
          ))}
        </div>

        {/* Time rows */}
        <div className="divide-y divide-white/[0.04] text-xs">
          {TIME_BUCKETS.map(bucket => {
            const startHour = bucket.split(' - ')[0];
            return (
              <div key={bucket} className="grid grid-cols-6 min-h-[60px] items-stretch">
                <div className="p-2 text-center text-slate-600 font-mono text-[10px] bg-surface/40 border-r border-white/[0.04] flex items-center justify-center">
                  {startHour}
                </div>
                {DAYS.map(day => {
                  const daySlots = filteredSlots.filter(s => s.day_of_week === day);
                  const slot = daySlots.find(s =>
                    s.start_time === startHour ||
                    (s.end_time > startHour && s.start_time <= startHour)
                  );
                  return (
                    <div key={day} className="p-1 border-r border-white/[0.04] last:border-r-0 flex items-center">
                      {slot ? (
                        <button
                          onClick={() => setActiveModalSlot(slot)}
                          className={[
                            'w-full p-2 rounded-lg border text-left transition-colors duration-150',
                            getSlotStyle(slot.slot_type),
                          ].join(' ')}
                        >
                          <div className="flex items-center justify-between gap-1 mb-0.5">
                            <span className="font-semibold text-[11px] truncate">{slot.subject_code}</span>
                            <span className="text-[9px] uppercase opacity-70 shrink-0">{slot.slot_type.slice(0, 3)}</span>
                          </div>
                          <div className="flex items-center gap-0.5 opacity-70 text-[9px]">
                            <MapPin className="w-2.5 h-2.5" aria-hidden="true" />{slot.room}
                          </div>
                        </button>
                      ) : (
                        <div className="h-full w-full rounded-lg hover:bg-white/[0.03]" />
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Mobile day list ── */}
      <div className="sm:hidden space-y-2">
        {filteredSlots
          .filter(s => s.day_of_week === selectedDay)
          .sort((a, b) => a.start_time.localeCompare(b.start_time))
          .map(slot => (
            <button
              key={slot.id}
              onClick={() => setActiveModalSlot(slot)}
              className={[
                'w-full p-4 rounded-xl border text-left transition-colors duration-150',
                getSlotStyle(slot.slot_type),
              ].join(' ')}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-sm">{slot.subject_code}</span>
                <span className="text-xs px-2 py-0.5 rounded-md bg-black/20 font-medium">
                  {slot.slot_type}
                </span>
              </div>
              <p className="font-medium text-sm text-slate-200 mb-2">{slot.subject_name}</p>
              <div className="flex items-center justify-between text-xs opacity-80">
                <span className="flex items-center gap-1 font-mono">
                  <Clock className="w-3 h-3" /> {slot.start_time} – {slot.end_time}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {slot.room}
                </span>
              </div>
            </button>
          ))}
      </div>

      {/* ── Slot detail modal ── */}
      {activeModalSlot && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in"
          onClick={() => setActiveModalSlot(null)}
        >
          <div
            className="max-w-md w-full bg-elevated border border-white/[0.1] rounded-2xl p-6 space-y-5 animate-slide-up shadow-elevation-lg"
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={activeModalSlot.subject_name}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="accent">{activeModalSlot.slot_type}</Badge>
                  <span className="text-xs text-slate-500">{activeModalSlot.day_of_week}</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-100">{activeModalSlot.subject_name}</h3>
                <p className="text-xs text-slate-500 font-mono mt-0.5">{activeModalSlot.subject_code}</p>
              </div>
              <button
                onClick={() => setActiveModalSlot(null)}
                className="w-8 h-8 rounded-lg bg-white/[0.06] hover:bg-white/[0.10] text-slate-400 flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 p-3 rounded-lg bg-surface/60 border border-white/[0.06] text-sm">
              <div>
                <span className="text-xs text-slate-500">Room</span>
                <p className="font-semibold text-emerald-400 mt-0.5">{activeModalSlot.room}</p>
              </div>
              <div>
                <span className="text-xs text-slate-500">Time</span>
                <p className="font-semibold text-slate-200 mt-0.5 font-mono">
                  {activeModalSlot.start_time} – {activeModalSlot.end_time}
                </p>
              </div>
            </div>

            {(() => {
              const meta = getSubjectMeta(activeModalSlot.subject_code);
              if (!meta) return null;
              return (
                <div className="space-y-3 text-sm">
                  <div>
                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Course Learning Outcomes
                    </h4>
                    <ul className="space-y-1.5">
                      {meta.clos.map((c, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-400">
                          <span className="text-accent mt-0.5 shrink-0">·</span> {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Recommended Textbooks
                    </h4>
                    <p className="text-xs text-slate-500">{meta.textbooks.join(' · ')}</p>
                  </div>
                </div>
              );
            })()}

            <Button variant="primary" className="w-full" onClick={() => setActiveModalSlot(null)}>
              Close Details
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
