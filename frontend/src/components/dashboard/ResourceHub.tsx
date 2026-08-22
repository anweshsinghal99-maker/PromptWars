import React, { useState } from 'react';
import { BookOpen, ExternalLink, Search, Sparkles, CheckCircle2 } from 'lucide-react';

export const ResourceHub: React.FC = () => {
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  const resources = [
    { title: "NeetCode 150 DSA Interactive Roadmap", platform: "NeetCode", url: "https://neetcode.io/roadmap", category: "DSA", desc: "Top 150 categorized LeetCode problems with Python/C++ video breakdowns." },
    { title: "MIT 6.006 Introduction to Algorithms", platform: "MIT OCW", url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/", category: "DSA", desc: "World-class algorithmic complexity, dynamic programming, and graph algorithms." },
    { title: "LangChain & LangGraph Official Multi-Agent Docs", platform: "Official Docs", url: "https://python.langchain.com/docs/langgraph/", category: "Agentic AI", desc: "Complete guide to stateful cyclic agent graph architectures." },
    { title: "Model Context Protocol (MCP) Quickstart", platform: "Anthropic / Open Standards", url: "https://modelcontextprotocol.io/", category: "Agentic AI", desc: "Standard protocol for connecting AI models to external tools and data sources." },
    { title: "Roadmap.sh Full Stack Developer Roadmap", platform: "Roadmap.sh", url: "https://roadmap.sh/full-stack", category: "Full Stack", desc: "Visual, step-by-step career milestones for frontend, backend, and DevOps." },
    { title: "CS50x: Introduction to Computer Science", platform: "Harvard / edX", url: "https://cs50.harvard.edu/x/", category: "Core CS", desc: "Foundational mastery of C programming, memory hierarchy, algorithms, and SQL." },
    { title: "NPTEL: Programming, Data Structures and Algorithms", platform: "NPTEL / IIT", url: "https://nptel.ac.in/courses/106106145", category: "DSA", desc: "Rigorous Indian engineering curriculum video lectures by top IIT professors." },
    { title: "FastAPI Complete Interactive Tutorial", platform: "Official Docs", url: "https://fastapi.tiangolo.com/tutorial/", category: "Full Stack", desc: "High-performance Python web API framework architecture." }
  ];

  const filtered = resources.filter(r => {
    const matchesFilter = filter === "ALL" || r.category.toLowerCase() === filter.toLowerCase();
    const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase()) || r.desc.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-white">Curated Free Learning Resource Hub</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Strictly prioritized 100% free, high-signal documentation, MIT OCW, NPTEL, and LeetCode tracks.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search resources or topics..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 w-64"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 text-xs">
        {["ALL", "DSA", "Agentic AI", "Full Stack", "Core CS"].map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`px-3.5 py-1.5 rounded-xl font-medium border transition-all ${
              filter === c
                ? "bg-indigo-600 border-indigo-500 text-white shadow-glow-primary"
                : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Grid of Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item, idx) => (
          <a
            key={idx}
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className="p-5 rounded-2xl glass-card border border-slate-800 hover:border-indigo-500/50 flex flex-col justify-between space-y-4 group transition-all"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 font-mono px-2 py-0.5 rounded bg-cyan-950/40 border border-cyan-500/20">
                  {item.platform}
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-400 transition-colors" />
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors leading-snug">
                {item.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> 100% Free
              </span>
              <span className="text-indigo-400 font-medium group-hover:translate-x-0.5 transition-transform">
                Explore →
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
