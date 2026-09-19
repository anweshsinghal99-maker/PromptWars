import React, { useState, useEffect } from 'react';
import { SemesterHandbook, HandbookSection } from '../../lib/types';
import { api } from '../../lib/api';
import { BookOpen, Printer, Loader, ChevronRight, ChevronLeft } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { SectionHeader } from '../ui/SectionHeader';

interface HandbookViewerProps {
  onClose?: () => void;
}

export const HandbookViewer: React.FC<HandbookViewerProps> = ({ onClose }) => {
  const [handbook, setHandbook]         = useState<SemesterHandbook | null>(null);
  const [activeSectionId, setActiveSectionId] = useState<string>('overview');
  const [loading, setLoading]           = useState<boolean>(true);

  useEffect(() => {
    api.getHandbook().then(data => {
      setHandbook(data);
      setLoading(false);
    });
  }, []);

  const handlePrint = () => window.print();

  if (loading || !handbook || !handbook.sections || handbook.sections.length === 0) {
    return (
      <Card padding="lg" className="flex flex-col items-center justify-center gap-3 py-16">
        <Loader className="w-6 h-6 text-accent animate-spin" />
        <p className="text-sm font-medium text-slate-400">
          Agent 9 synthesizing 15-Section Semester Handbook…
        </p>
      </Card>
    );
  }

  const activeSection =
    handbook.sections.find(s => s.section_id === activeSectionId) || handbook.sections[0];

  return (
    <div className="space-y-4">

      {/* Header */}
      <Card padding="md" className="no-print">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <SectionHeader
            icon={<BookOpen className="w-4 h-4" />}
            title="15-Section Semester Handbook"
            description={`${handbook.student_name} · ${handbook.program}`}
          />
          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="primary"
              size="sm"
              onClick={handlePrint}
              leftIcon={<Printer className="w-3.5 h-3.5" />}
            >
              Print / PDF
            </Button>
            {onClose && (
              <Button variant="ghost" size="sm" onClick={onClose}>
                ← Dashboard
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Main layout: TOC sidebar + content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">

        {/* TOC sidebar */}
        <Card padding="sm" className="no-print lg:max-h-[700px] overflow-y-auto">
          <div className="px-2 py-2 mb-1">
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
              Contents (15 pages)
            </span>
          </div>
          <nav>
            {handbook.sections.map(sec => {
              const isCurrent = sec.section_id === activeSection.section_id;
              return (
                <button
                  key={sec.section_id}
                  onClick={() => setActiveSectionId(sec.section_id)}
                  className={[
                    'w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between transition-colors duration-150',
                    isCurrent
                      ? 'bg-accent/15 text-accent'
                      : 'text-slate-500 hover:text-slate-300 hover:bg-white/5',
                  ].join(' ')}
                >
                  <span className="truncate pr-2">
                    <span className="text-slate-600 font-mono mr-1">{sec.page_number}.</span>
                    {sec.title.split(': ')[1] || sec.title}
                  </span>
                  {isCurrent && <ChevronRight className="w-3 h-3 shrink-0" />}
                </button>
              );
            })}
          </nav>
        </Card>

        {/* Active section content */}
        <div className="lg:col-span-3 no-print">
          <Card padding="lg" className="space-y-6">
            {/* Section title */}
            <div className="pb-4 border-b border-white/[0.07]">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="accent" className="font-mono">§{activeSection.page_number} / 15</Badge>
              </div>
              <h2 className="text-xl font-bold text-slate-100">{activeSection.title}</h2>
              {activeSection.subtitle && (
                <p className="text-sm text-slate-500 mt-0.5">{activeSection.subtitle}</p>
              )}
            </div>

            {/* Callouts */}
            {activeSection.callouts?.length > 0 && (
              <div className="space-y-2">
                {activeSection.callouts.map((c, i) => (
                  <div
                    key={i}
                    className="px-4 py-3 rounded-lg bg-accent/[0.07] border-l-2 border-accent text-sm text-slate-300"
                  >
                    {c}
                  </div>
                ))}
              </div>
            )}

            {/* Content */}
            <div className="text-sm text-slate-400 leading-relaxed whitespace-pre-line space-y-3">
              {activeSection.content_markdown}
            </div>

            {/* Tables */}
            {activeSection.tables?.map((table, tIdx) => (
              <div key={tIdx} className="overflow-x-auto rounded-lg border border-white/[0.07]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-surface/80 border-b border-white/[0.07]">
                    <tr>
                      {table.headers.map((h, i) => (
                        <th key={i} className="px-4 py-3 font-semibold text-slate-300 whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04]">
                    {table.rows.map((r, rIdx) => (
                      <tr key={rIdx} className="hover:bg-white/[0.02] transition-colors">
                        {r.map((cell, cIdx) => (
                          <td key={cIdx} className="px-4 py-3 text-slate-400">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}

            {/* Prev / Next navigation */}
            <div className="flex items-center justify-between pt-4 border-t border-white/[0.07]">
              <Button
                variant="ghost"
                size="sm"
                disabled={activeSection.page_number === 1}
                leftIcon={<ChevronLeft className="w-3.5 h-3.5" />}
                onClick={() => {
                  const prev = handbook.sections.find(s => s.page_number === activeSection.page_number - 1);
                  if (prev) setActiveSectionId(prev.section_id);
                }}
              >
                Previous
              </Button>
              <span className="text-xs text-slate-600 font-mono">
                {activeSection.page_number} / {handbook.sections.length}
              </span>
              <Button
                variant="secondary"
                size="sm"
                disabled={activeSection.page_number === 15}
                rightIcon={<ChevronRight className="w-3.5 h-3.5" />}
                onClick={() => {
                  const next = handbook.sections.find(s => s.page_number === activeSection.page_number + 1);
                  if (next) setActiveSectionId(next.section_id);
                }}
              >
                Next
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* ── Printable full document (shown only on print) ── */}
      <div className="hidden print:block space-y-12 bg-white text-black p-8">
        <div className="text-center border-b-2 border-black pb-4 mb-8">
          <h1 className="text-3xl font-extrabold uppercase">{handbook.university}</h1>
          <h2 className="text-xl font-bold mt-1">
            Semester Handbook · {handbook.program} ({handbook.semester})
          </h2>
          <p className="text-sm text-gray-700">
            Prepared for: {handbook.student_name} · Generated: {handbook.generated_at}
          </p>
        </div>
        {handbook.sections.map(sec => (
          <div key={sec.section_id} className="print-page-break space-y-4 py-4">
            <h2 className="text-xl font-bold border-b border-gray-400 pb-1">{sec.title}</h2>
            <h3 className="text-sm font-semibold text-gray-600">{sec.subtitle}</h3>
            <div className="text-xs whitespace-pre-line leading-relaxed">{sec.content_markdown}</div>
            {sec.tables?.map((t, idx) => (
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
