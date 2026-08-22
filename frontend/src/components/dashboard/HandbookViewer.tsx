import React, { useState, useEffect } from 'react';
import { SemesterHandbook, HandbookSection } from '../../lib/types';
import { api } from '../../lib/api';
import { BookOpen, Printer, Download, Sparkles, ChevronRight, CheckCircle2 } from 'lucide-react';

interface HandbookViewerProps {
  onClose?: () => void;
}

export const HandbookViewer: React.FC<HandbookViewerProps> = ({ onClose }) => {
  const [handbook, setHandbook] = useState<SemesterHandbook | null>(null);
  const [activeSectionId, setActiveSectionId] = useState<string>("overview");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    api.getHandbook().then(data => {
      setHandbook(data);
      setLoading(false);
    });
  }, []);

  const handlePrint = () => {
    window.print();
  };

  if (loading || !handbook || !handbook.sections || handbook.sections.length === 0) {
    return (
      <div className="p-12 text-center text-slate-400 glass-panel rounded-3xl space-y-4">
        <Sparkles className="w-8 h-8 text-indigo-400 mx-auto animate-spin" />
        <p className="text-sm font-semibold">Agent 9 synthesizing 15-Section Semester Handbook...</p>
      </div>
    );
  }

  const activeSection = handbook.sections.find(s => s.section_id === activeSectionId) || handbook.sections[0];

  return (
    <div className="space-y-6">
      {/* Top Controls Bar */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">15-Section Semester Handbook</h2>
            <p className="text-xs text-slate-400">
              Executive academic plan for {handbook.student_name} • {handbook.program}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-xs font-semibold flex items-center gap-2 shadow-glow-primary"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save as PDF</span>
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
            >
              Back to Dashboard
            </button>
          )}
        </div>
      </div>

      {/* Main Layout: Sidebar of Sections + Active Section Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar TOC */}
        <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-1.5 no-print max-h-[700px] overflow-y-auto">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 py-2">
            Table of Contents (15 Pages)
          </h3>
          {handbook.sections.map((sec) => {
            const isCurrent = sec.section_id === activeSection.section_id;
            return (
              <button
                key={sec.section_id}
                onClick={() => setActiveSectionId(sec.section_id)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-all ${
                  isCurrent
                    ? 'bg-indigo-600 text-white font-bold shadow-glow-primary'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <span className="truncate pr-2">Page {sec.page_number}: {sec.title.split(': ')[1] || sec.title}</span>
                {isCurrent && <ChevronRight className="w-3.5 h-3.5 shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Active Section Content (Interactive View) */}
        <div className="lg:col-span-3 glass-panel-glow p-6 sm:p-10 rounded-3xl border border-slate-800 space-y-6 no-print">
          <div className="border-b border-slate-800 pb-5">
            <span className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-wider">
              Section {activeSection.page_number} of 15
            </span>
            <h2 className="text-2xl font-extrabold text-white mt-1">{activeSection.title}</h2>
            <p className="text-xs text-slate-400 mt-0.5">{activeSection.subtitle}</p>
          </div>

          {/* Callouts */}
          {activeSection.callouts && activeSection.callouts.length > 0 && (
            <div className="space-y-2">
              {activeSection.callouts.map((c, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-500/30 text-indigo-200 text-xs font-medium">
                  {c}
                </div>
              ))}
            </div>
          )}

          {/* Content Markdown Text */}
          <div className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-300 space-y-3 leading-relaxed whitespace-pre-line">
            {activeSection.content_markdown}
          </div>

          {/* Tables */}
          {activeSection.tables && activeSection.tables.map((table, tIdx) => (
            <div key={tIdx} className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900 text-slate-300 font-semibold border-b border-slate-800">
                  <tr>
                    {table.headers.map((h, i) => (
                      <th key={i} className="p-3 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-slate-300">
                  {table.rows.map((r, rIdx) => (
                    <tr key={rIdx} className="hover:bg-slate-900/40">
                      {r.map((cell, cIdx) => (
                        <td key={cIdx} className="p-3">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}

          {/* Bottom Next/Prev buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-800">
            <button
              disabled={activeSection.page_number === 1}
              onClick={() => {
                const prev = handbook.sections.find(s => s.page_number === activeSection.page_number - 1);
                if (prev) setActiveSectionId(prev.section_id);
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold disabled:opacity-40"
            >
              ← Previous Section
            </button>
            <button
              disabled={activeSection.page_number === 15}
              onClick={() => {
                const next = handbook.sections.find(s => s.page_number === activeSection.page_number + 1);
                if (next) setActiveSectionId(next.section_id);
              }}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold disabled:opacity-40 shadow-glow-primary"
            >
              Next Section →
            </button>
          </div>
        </div>
      </div>

      {/* Complete Printable 15-Section Document (Triggered on Print) */}
      <div className="hidden print:block space-y-12 bg-white text-black p-8">
        <div className="text-center border-b-2 border-black pb-4 mb-8">
          <h1 className="text-3xl font-extrabold uppercase tracking-tight">{handbook.university}</h1>
          <h2 className="text-xl font-bold mt-1">Semester Handbook • {handbook.program} ({handbook.semester})</h2>
          <p className="text-sm text-gray-700">Prepared for: {handbook.student_name} • Generated: {handbook.generated_at}</p>
        </div>

        {handbook.sections.map((sec) => (
          <div key={sec.section_id} className="print-page-break space-y-4 py-4">
            <h2 className="text-xl font-bold border-b border-gray-400 pb-1">{sec.title}</h2>
            <h3 className="text-sm font-semibold text-gray-600">{sec.subtitle}</h3>
            <div className="text-xs whitespace-pre-line leading-relaxed">{sec.content_markdown}</div>

            {sec.tables && sec.tables.map((t, idx) => (
              <table key={idx} className="w-full border-collapse border border-gray-400 text-xs mt-3">
                <thead>
                  <tr className="bg-gray-100">
                    {t.headers.map((h, i) => (
                      <th key={i} className="border border-gray-400 p-1.5 text-left">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {t.rows.map((row, rI) => (
                    <tr key={rI}>
                      {row.map((c, cI) => (
                        <td key={cI} className="border border-gray-400 p-1.5">{c}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
