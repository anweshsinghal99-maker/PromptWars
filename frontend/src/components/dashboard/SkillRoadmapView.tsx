import React from 'react';
import { SkillTrack } from '../../lib/types';
import { Award, ExternalLink, CheckCircle2, Circle, Clock, Sparkles } from 'lucide-react';

interface SkillRoadmapViewProps {
  skills: SkillTrack[];
}

export const SkillRoadmapView: React.FC<SkillRoadmapViewProps> = ({ skills }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-white">Skill Roadmaps & Career Readiness Tracks</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Agent 8 allocates free evening/weekend hours strictly to ensure zero clashes with academic lectures.
          </p>
        </div>
      </div>

      {/* Tracks Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {skills.map((track) => (
          <div key={track.id} className="p-6 rounded-3xl glass-panel-glow border border-slate-800 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-indigo-400">
                    {track.category}
                  </span>
                  <h3 className="text-base font-bold text-white mt-0.5">{track.name}</h3>
                </div>
                <span className="px-2.5 py-1 rounded-xl bg-indigo-500/20 text-indigo-300 text-xs font-bold font-mono">
                  {track.progress_percentage}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full"
                  style={{ width: `${track.progress_percentage}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-indigo-400" /> {track.target_hours_per_week} hrs/week</span>
                <span>{track.total_hours_completed} hrs completed</span>
              </div>

              {/* Milestones */}
              <div className="space-y-2.5 pt-2">
                <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Milestone Roadmap:</h4>
                <div className="space-y-2">
                  {track.roadmap_milestones.map((m, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${
                        m.status === 'completed'
                          ? 'bg-emerald-950/20 border-emerald-500/30 text-slate-300'
                          : m.status === 'in_progress'
                          ? 'bg-indigo-950/30 border-indigo-500/40 text-white'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400'
                      }`}
                    >
                      {m.status === 'completed' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      ) : m.status === 'in_progress' ? (
                        <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5 animate-spin" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p className="font-semibold">{m.title}</p>
                        <p className="text-[11px] opacity-80 mt-0.5">{m.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Curated 100% Free Resources */}
            <div className="pt-4 border-t border-slate-800/80 space-y-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Curated Free Resources:</span>
              <div className="space-y-1.5">
                {track.curated_resources.map((res, i) => (
                  <a
                    key={i}
                    href={res.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs text-indigo-300 transition-colors"
                  >
                    <span className="truncate pr-2">{res.title}</span>
                    <ExternalLink className="w-3 h-3 text-slate-400 shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
