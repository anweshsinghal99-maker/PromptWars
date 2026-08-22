import React, { useState } from 'react';
import { TimetableSlot, Subject } from '../../lib/types';
import { Calendar, Clock, MapPin, Filter, Layers, BookOpen, AlertCircle } from 'lucide-react';

interface TimetableCalendarProps {
  slots: TimetableSlot[];
  subjects: Subject[];
}

export const TimetableCalendar: React.FC<TimetableCalendarProps> = ({ slots, subjects }) => {
  const [selectedDay, setSelectedDay] = useState<string>("Monday");
  const [filterType, setFilterType] = useState<string>("ALL");
  const [activeModalSlot, setActiveModalSlot] = useState<TimetableSlot | null>(null);

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  // Distinct time rows matching Thapar schedule
  const timeBuckets = [
    "08:00 - 08:50",
    "08:50 - 09:40",
    "09:40 - 10:30",
    "10:30 - 11:20",
    "11:20 - 12:10",
    "12:10 - 13:00",
    "13:00 - 13:50",
    "13:50 - 14:40",
    "14:40 - 15:30",
    "15:30 - 16:20",
    "16:20 - 17:10",
    "17:10 - 18:00",
    "18:00 - 18:50"
  ];

  const getSlotStyle = (slotType: string) => {
    switch (slotType.toLowerCase()) {
      case 'practical':
      case 'lab':
        return 'bg-amber-500/15 border-amber-500/40 text-amber-300 hover:bg-amber-500/25';
      case 'tutorial':
        return 'bg-purple-500/15 border-purple-500/40 text-purple-300 hover:bg-purple-500/25';
      default:
        return 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/25';
    }
  };

  const filteredSlots = slots.filter(s => {
    if (filterType === "LECTURES") return s.slot_type.toLowerCase() === "lecture";
    if (filterType === "LABS") return s.slot_type.toLowerCase() === "practical";
    if (filterType === "TUTORIALS") return s.slot_type.toLowerCase() === "tutorial";
    return true;
  });

  const getSubjectMeta = (code: string) => {
    return subjects.find(s => s.code.toUpperCase() === code.toUpperCase()) || null;
  };

  return (
    <div className="space-y-6">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-4 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-indigo-400" />
          <h2 className="text-lg font-bold text-white">Google Calendar Timetable Matrix</h2>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 font-medium">
            31 Contact Hours / Week
          </span>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-900/80 p-1 rounded-xl border border-slate-800 text-xs">
          {["ALL", "LECTURES", "LABS", "TUTORIALS"].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                filterType === t
                  ? "bg-indigo-600 text-white shadow-glow-primary"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Week Grid Layout (Desktop) & Day Switcher (Mobile) */}
      <div className="flex sm:hidden overflow-x-auto gap-2 pb-2">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap border ${
              selectedDay === day
                ? "bg-indigo-600 border-indigo-500 text-white"
                : "bg-slate-900 border-slate-800 text-slate-400"
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Desktop Weekly Matrix View */}
      <div className="hidden sm:block glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
        <div className="grid grid-cols-6 bg-slate-900/90 border-b border-slate-800 text-xs font-semibold text-slate-400 text-center py-3.5">
          <div className="flex items-center justify-center gap-1">
            <Clock className="w-3.5 h-3.5 text-indigo-400" /> Time
          </div>
          {days.map(d => (
            <div key={d} className="text-white font-bold">{d}</div>
          ))}
        </div>

        <div className="divide-y divide-slate-800/60 text-xs">
          {timeBuckets.map((bucket) => {
            const startHour = bucket.split(" - ")[0];
            return (
              <div key={bucket} className="grid grid-cols-6 min-h-[64px] items-stretch">
                {/* Time Label */}
                <div className="p-2 text-center text-slate-400 font-mono text-[11px] bg-slate-950/40 border-r border-slate-800/80 flex items-center justify-center">
                  {bucket}
                </div>

                {/* Days */}
                {days.map((day) => {
                  const daySlots = filteredSlots.filter(s => s.day_of_week === day);
                  // Find slot that overlaps or starts at this hour
                  const slot = daySlots.find(s => {
                    const sTime = s.start_time;
                    return sTime === startHour || (s.end_time > startHour && sTime <= startHour);
                  });

                  return (
                    <div key={day} className="p-1.5 border-r border-slate-800/60 last:border-r-0 flex flex-col justify-center">
                      {slot ? (
                        <div
                          onClick={() => setActiveModalSlot(slot)}
                          className={`p-2 rounded-xl border text-[11px] font-medium cursor-pointer transition-all ${getSlotStyle(slot.slot_type)}`}
                        >
                          <div className="flex items-center justify-between gap-1">
                            <span className="font-bold truncate">{slot.subject_code}</span>
                            <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-black/30 font-semibold">
                              {slot.slot_type}
                            </span>
                          </div>
                          <p className="text-[10px] truncate opacity-90 mt-0.5">{slot.subject_name}</p>
                          <div className="flex items-center gap-1 text-[9px] opacity-75 mt-1">
                            <MapPin className="w-2.5 h-2.5" />
                            <span>{slot.room}</span>
                          </div>
                        </div>
                      ) : (
                        <div className="h-full w-full rounded-lg hover:bg-slate-800/20" />
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Day-Wise List View */}
      <div className="sm:hidden space-y-3">
        {filteredSlots
          .filter(s => s.day_of_week === selectedDay)
          .sort((a, b) => a.start_time.localeCompare(b.start_time))
          .map((slot) => (
            <div
              key={slot.id}
              onClick={() => setActiveModalSlot(slot)}
              className={`p-4 rounded-2xl border ${getSlotStyle(slot.slot_type)} cursor-pointer`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm">{slot.subject_code}</span>
                <span className="text-xs px-2 py-0.5 rounded bg-black/40 font-semibold">{slot.slot_type}</span>
              </div>
              <h3 className="font-semibold text-white mt-1">{slot.subject_name}</h3>
              <div className="flex items-center justify-between text-xs opacity-80 mt-2">
                <span className="flex items-center gap-1 font-mono"><Clock className="w-3 h-3" /> {slot.start_time} - {slot.end_time}</span>
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {slot.room}</span>
              </div>
            </div>
          ))}
      </div>

      {/* Modal / Card Details Viewer for Course */}
      {activeModalSlot && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-lg w-full glass-panel-glow rounded-3xl p-6 border border-indigo-500/40 space-y-5 animate-in fade-in zoom-in duration-150">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                  {activeModalSlot.slot_type} Slot • {activeModalSlot.day_of_week}
                </span>
                <h3 className="text-xl font-bold text-white mt-1">{activeModalSlot.subject_name}</h3>
                <p className="text-xs text-slate-400 font-mono">{activeModalSlot.subject_code}</p>
              </div>
              <button
                onClick={() => setActiveModalSlot(null)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800">
              <div>
                <span className="text-slate-400">Classroom Venue:</span>
                <p className="font-bold text-emerald-400 text-sm mt-0.5">{activeModalSlot.room}</p>
              </div>
              <div>
                <span className="text-slate-400">Scheduled Time:</span>
                <p className="font-bold text-cyan-300 text-sm mt-0.5">{activeModalSlot.start_time} – {activeModalSlot.end_time}</p>
              </div>
            </div>

            {(() => {
              const meta = getSubjectMeta(activeModalSlot.subject_code);
              if (!meta) return null;
              return (
                <div className="space-y-3 text-xs text-slate-300">
                  <div>
                    <h4 className="font-semibold text-white mb-1">Course Learning Outcomes (CLOs):</h4>
                    <ul className="list-disc list-inside space-y-1 text-slate-300">
                      {meta.clos.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-1">Recommended Textbooks:</h4>
                    <p className="text-slate-400">{meta.textbooks.join(" • ")}</p>
                  </div>
                </div>
              );
            })()}

            <div className="pt-2">
              <button
                onClick={() => setActiveModalSlot(null)}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
