import React from 'react';
import { MasterSemesterState } from '../../lib/types';
import { Milestone, Clock, CheckCircle2, Circle, Zap } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { SectionHeader } from '../ui/SectionHeader';

interface SemesterTimelineProps {
  events: MasterSemesterState['timeline_events'];
}

export const SemesterTimeline: React.FC<SemesterTimelineProps> = ({ events }) => {
  return (
    <div className="space-y-4">

      {/* Header */}
      <Card padding="md">
        <SectionHeader
          icon={<Milestone className="w-4 h-4" />}
          title="Semester Timeline"
          description="End-to-end progression from Week 1 kickoff through Mid-Sem Tests to End-Sem Evaluations."
        />
      </Card>

      {/* Events grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {events.map((ev, idx) => {
          const isDone   = ev.status === 'completed';
          const isActive = ev.status === 'active';
          return (
            <Card
              key={idx}
              padding="md"
              selected={isActive}
              className={isDone ? 'border-emerald-500/15 bg-emerald-500/[0.03]' : ''}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono font-semibold text-slate-500">{ev.week}</span>
                <Badge
                  variant={isActive ? 'accent' : isDone ? 'success' : 'default'}
                >
                  {isActive
                    ? <><Zap className="w-2.5 h-2.5" /> Active</>
                    : isDone
                      ? <><CheckCircle2 className="w-2.5 h-2.5" /> Done</>
                      : <><Circle className="w-2.5 h-2.5" /> Upcoming</>
                  }
                </Badge>
              </div>

              <h3 className="text-sm font-semibold text-slate-100 mb-1">{ev.title}</h3>
              <p className="text-[11px] text-slate-600 flex items-center gap-1 mb-3">
                <Clock className="w-3 h-3" aria-hidden="true" /> {ev.date}
              </p>

              <p className="text-xs text-slate-400 leading-relaxed pt-3 border-t border-white/[0.05]">
                {ev.focus}
              </p>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
