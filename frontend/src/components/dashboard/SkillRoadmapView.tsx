import React from 'react';
import { SkillTrack } from '../../lib/types';
import { Award, ExternalLink, CheckCircle2, Circle, Clock, Loader } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { SectionHeader } from '../ui/SectionHeader';
import { ProgressBar } from '../ui/ProgressBar';

interface SkillRoadmapViewProps {
  skills: SkillTrack[];
}

export const SkillRoadmapView: React.FC<SkillRoadmapViewProps> = ({ skills }) => {
  return (
    <div className="space-y-4">

      {/* Header */}
      <Card padding="md">
        <SectionHeader
          icon={<Award className="w-4 h-4" />}
          title="Skill Roadmaps"
          description="Agent 8 allocates free evening/weekend hours with zero clash with academic lectures."
        />
      </Card>

      {/* Tracks grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {skills.map(track => (
          <Card key={track.id} padding="lg" className="flex flex-col justify-between">
            <div className="space-y-4">
              {/* Track header */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">
                    {track.category}
                  </span>
                  <h3 className="text-sm font-semibold text-slate-100 mt-0.5">{track.name}</h3>
                </div>
                <Badge variant="accent" className="shrink-0 font-mono">{track.progress_percentage}%</Badge>
              </div>

              {/* Progress */}
              <div className="space-y-1.5">
                <ProgressBar value={track.progress_percentage} variant="accent" />
                <div className="flex items-center justify-between text-[11px] text-slate-600">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" aria-hidden="true" /> {track.target_hours_per_week} hrs/week
                  </span>
                  <span>{track.total_hours_completed} hrs done</span>
                </div>
              </div>

              {/* Milestones */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                  Milestone Roadmap
                </h4>
                {track.roadmap_milestones.map((m, i) => (
                  <div
                    key={i}
                    className={[
                      'flex items-start gap-2.5 p-3 rounded-lg border text-xs',
                      m.status === 'completed'
                        ? 'bg-emerald-500/[0.05] border-emerald-500/15 text-slate-400'
                        : m.status === 'in_progress'
                          ? 'bg-accent/[0.07] border-accent/20 text-slate-200'
                          : 'bg-surface/40 border-white/[0.05] text-slate-500',
                    ].join(' ')}
                  >
                    {m.status === 'completed' ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    ) : m.status === 'in_progress' ? (
                      <Loader className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5 animate-spin" />
                    ) : (
                      <Circle className="w-3.5 h-3.5 text-slate-700 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="font-semibold">{m.title}</p>
                      <p className="text-[11px] opacity-70 mt-0.5">{m.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Resources */}
            <div className="mt-4 pt-4 border-t border-white/[0.05] space-y-2">
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                Free Resources
              </span>
              {track.curated_resources.map((res, i) => (
                <a
                  key={i}
                  href={res.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-2 rounded-lg bg-surface/60 hover:bg-overlay border border-white/[0.04] hover:border-white/[0.09] text-xs text-slate-400 hover:text-slate-200 transition-colors group"
                >
                  <span className="truncate pr-2">{res.title}</span>
                  <ExternalLink className="w-3 h-3 shrink-0 opacity-40 group-hover:opacity-80 transition-opacity" />
                </a>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
