import React, { useState } from 'react';
import { Compass, ExternalLink, Search, CheckCircle2 } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { SectionHeader } from '../ui/SectionHeader';

const RESOURCES = [
  { title: 'NeetCode 150 DSA Interactive Roadmap',         platform: 'NeetCode',             url: 'https://neetcode.io/roadmap',                                              category: 'DSA',        desc: 'Top 150 categorized LeetCode problems with Python/C++ video breakdowns.' },
  { title: 'MIT 6.006 Introduction to Algorithms',         platform: 'MIT OCW',              url: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/', category: 'DSA',        desc: 'World-class algorithmic complexity, dynamic programming, and graph algorithms.' },
  { title: 'LangChain & LangGraph Official Multi-Agent',   platform: 'Official Docs',        url: 'https://python.langchain.com/docs/langgraph/',                              category: 'Agentic AI', desc: 'Complete guide to stateful cyclic agent graph architectures.' },
  { title: 'Model Context Protocol (MCP) Quickstart',      platform: 'Anthropic',            url: 'https://modelcontextprotocol.io/',                                         category: 'Agentic AI', desc: 'Standard protocol for connecting AI models to external tools and data sources.' },
  { title: 'Roadmap.sh Full Stack Developer Roadmap',      platform: 'Roadmap.sh',           url: 'https://roadmap.sh/full-stack',                                            category: 'Full Stack', desc: 'Visual, step-by-step career milestones for frontend, backend, and DevOps.' },
  { title: 'CS50x: Introduction to Computer Science',      platform: 'Harvard / edX',        url: 'https://cs50.harvard.edu/x/',                                              category: 'Core CS',    desc: 'Foundational mastery of C programming, memory hierarchy, algorithms, and SQL.' },
  { title: 'NPTEL: Programming, Data Structures & Algos', platform: 'NPTEL / IIT',           url: 'https://nptel.ac.in/courses/106106145',                                    category: 'DSA',        desc: 'Rigorous Indian engineering curriculum by top IIT professors.' },
  { title: 'FastAPI Complete Interactive Tutorial',         platform: 'Official Docs',        url: 'https://fastapi.tiangolo.com/tutorial/',                                   category: 'Full Stack', desc: 'High-performance Python web API framework architecture.' },
];

const CATEGORIES = ['ALL', 'DSA', 'Agentic AI', 'Full Stack', 'Core CS'];

export const ResourceHub: React.FC = () => {
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const filtered = RESOURCES.filter(r => {
    const matchesFilter = filter === 'ALL' || r.category === filter;
    const matchesSearch =
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.desc.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-4">

      {/* Header */}
      <Card padding="md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <SectionHeader
            icon={<Compass className="w-4 h-4" />}
            title="Free Learning Resources"
            description="100% free, high-signal documentation, MIT OCW, NPTEL, and LeetCode tracks."
          />
          <div className="w-full sm:w-64">
            <Input
              placeholder="Search resources…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              leftIcon={<Search className="w-3.5 h-3.5" />}
            />
          </div>
        </div>
      </Card>

      {/* Category filters */}
      <div className="flex flex-wrap gap-1.5">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={[
              'px-3.5 py-1.5 rounded-lg text-xs font-medium border transition-colors duration-150',
              filter === cat
                ? 'bg-accent/15 border-accent/30 text-accent'
                : 'bg-elevated border-white/[0.07] text-slate-500 hover:text-slate-300 hover:border-white/[0.12]',
            ].join(' ')}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Resource cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((item, i) => (
          <a
            key={i}
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className="group block p-4 rounded-xl bg-elevated border border-white/[0.07] hover:border-white/[0.14] hover:bg-overlay transition-colors duration-150 space-y-3"
          >
            <div className="flex items-center justify-between">
              <Badge variant="default" className="font-mono text-[10px]">{item.platform}</Badge>
              <ExternalLink className="w-3.5 h-3.5 text-slate-600 group-hover:text-accent transition-colors" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-200 group-hover:text-slate-100 leading-snug transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{item.desc}</p>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-white/[0.05] text-[11px]">
              <span className="text-emerald-400 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> 100% Free
              </span>
              <span className="text-accent font-medium group-hover:translate-x-0.5 transition-transform">
                Explore →
              </span>
            </div>
          </a>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-slate-600">
          <p className="text-sm">No resources match "{search}"</p>
        </div>
      )}
    </div>
  );
};
