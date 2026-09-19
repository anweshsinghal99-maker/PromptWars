import React, { useState } from 'react';
import { MasterSemesterState } from '../../lib/types';
import { TopStatsBar } from './TopStatsBar';
import { TimetableCalendar } from './TimetableCalendar';
import { AttendanceEngine } from './AttendanceEngine';
import { AssignmentBoard } from './AssignmentBoard';
import { StudyRevisionView } from './StudyRevisionView';
import { SkillRoadmapView } from './SkillRoadmapView';
import { SemesterTimeline } from './SemesterTimeline';
import { HandbookViewer } from './HandbookViewer';
import { AICopilotDrawer } from './AICopilotDrawer';
import { ResourceHub } from './ResourceHub';
import { Button } from '../ui/Button';
import { ThemeToggle } from '../ui/ThemeToggle';
import {
  LayoutDashboard, Calendar, ShieldCheck, CheckSquare,
  Brain, Award, Milestone, BookOpen, Compass, Bot,
  MoreHorizontal, X
} from 'lucide-react';
import { ics_service } from '../../lib/icsHelper';

interface MasterDashboardProps {
  initialState: MasterSemesterState;
  onResetToLanding: () => void;
}

const ALL_TABS = [
  { id: 'overview',     label: 'Overview',       shortLabel: 'Overview',    icon: LayoutDashboard },
  { id: 'timetable',   label: 'Timetable',       shortLabel: 'Timetable',   icon: Calendar },
  { id: 'attendance',  label: 'Attendance',       shortLabel: 'Attendance',  icon: ShieldCheck },
  { id: 'assignments', label: 'Assignments',      shortLabel: 'Tasks',       icon: CheckSquare },
  { id: 'study',       label: 'Study',            shortLabel: 'Study',       icon: Brain },
  { id: 'skills',      label: 'Skill Roadmaps',   shortLabel: 'Skills',      icon: Award },
  { id: 'timeline',    label: 'Timeline',         shortLabel: 'Timeline',    icon: Milestone },
  { id: 'handbook',    label: 'Handbook',         shortLabel: 'Handbook',    icon: BookOpen },
  { id: 'resources',   label: 'Resources',        shortLabel: 'Resources',   icon: Compass },
];

const PRIMARY_MOBILE = ALL_TABS.slice(0, 4);
const MORE_MOBILE    = ALL_TABS.slice(4);

export const MasterDashboard: React.FC<MasterDashboardProps> = ({ initialState, onResetToLanding }) => {
  const [state, setState]               = useState<MasterSemesterState>(initialState);
  const [activeTab, setActiveTab]       = useState<string>('overview');
  const [isCopilotOpen, setIsCopilotOpen] = useState<boolean>(false);
  const [showMoreDrawer, setShowMoreDrawer] = useState<boolean>(false);

  const handleDownloadICS = () => {
    const icsContent = ics_service.generate_calendar_ics(state.timetable, state.user.name);
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url  = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href  = url;
    link.setAttribute('download', 'semester_copilot_timetable.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    setShowMoreDrawer(false);
  };

  const moreTabActive = MORE_MOBILE.some(t => t.id === activeTab);

  return (
    <div className="min-h-screen pb-20 lg:pb-8">

      {/* ── Sticky Header ── */}
      <header className="sticky top-0 z-40 w-full glass-header border-b border-rose-400/[0.08]" role="banner">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 px-4 sm:px-6 h-14">

          {/* Logo */}
          <button
            onClick={onResetToLanding}
            className="flex items-center gap-2.5 rounded-lg p-1 -ml-1 hover:bg-white/5 transition-colors"
            aria-label="Semester Copilot — Back to home"
          >
            <div className="w-7 h-7 rounded-lg bg-accent/20 border border-accent/30 flex items-center justify-center text-accent font-bold text-xs shrink-0">
              SC
            </div>
            <span className="font-semibold text-[--text-primary] text-sm hidden sm:inline tracking-tight">
              Semester<span className="text-accent">Copilot</span>
            </span>
          </button>

          {/* ── Desktop Navigation ── */}
          <nav
            className="hidden lg:flex items-center gap-0.5 bg-white/[0.03] p-1 rounded-lg border border-rose-400/[0.1]"
            role="tablist"
            aria-label="Main navigation"
          >
            {ALL_TABS.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.id)}
                  className={[
                    'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-150 whitespace-nowrap',
                    isActive
                      ? 'bg-accent/15 text-accent border border-accent/25'
                      : 'text-[--text-muted] hover:text-[--text-secondary] hover:bg-white/5',
                  ].join(' ')}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>{tab.shortLabel}</span>
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsCopilotOpen(true)}
              leftIcon={<Bot className="w-3.5 h-3.5 text-accent" />}
              aria-label="Open AI Copilot"
              className="shrink-0 border-accent/20 text-slate-600 dark:text-slate-300"
            >
              <span className="hidden sm:inline">AI Copilot</span>
            </Button>
          </div>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 space-y-6" role="main">

        {/* Agent heartbeat — always visible, small footprint */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-elevated border border-rose-400/[0.1] text-xs">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="font-medium text-slate-300">10 Agents Active</span>
            <span className="text-slate-600 font-mono hidden sm:inline">· &lt;2.4ms</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {['75% Sentinel ✓', '1/3/7/14 Cycles ✓', 'Knowledge Graph ✓'].map(tag => (
              <span key={tag} className="px-2 py-0.5 rounded-md bg-surface border border-rose-400/[0.08] text-[--text-muted] font-mono text-[10px]">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* ── TAB CONTENT ──
            FIX: TopStatsBar is now INSIDE the overview panel only.
            Switching to any other tab collapses the overview entirely. ── */}
        <div role="tabpanel" tabIndex={0} className="focus:outline-none">

          {/* OVERVIEW — shows stats bar + all sub-panels */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fade-in">
              <TopStatsBar
                state={state}
                onOpenChat={() => setIsCopilotOpen(true)}
                onOpenHandbook={() => setActiveTab('handbook')}
                onDownloadICS={handleDownloadICS}
              />
              <TimetableCalendar slots={state.timetable} subjects={state.subjects} />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AttendanceEngine attendance={state.attendance} />
                <StudyRevisionView studySessions={state.today_study_sessions} revisions={state.upcoming_revisions} />
              </div>
              <AssignmentBoard assignments={state.assignments} />
              <SkillRoadmapView skills={state.skills} />
              <SemesterTimeline events={state.timeline_events} />
            </div>
          )}

          {/* SPECIFIC TABS — focused single-view, no stats bar overhead */}
          {activeTab === 'timetable'   && <div className="animate-fade-in"><TimetableCalendar slots={state.timetable} subjects={state.subjects} /></div>}
          {activeTab === 'attendance'  && <div className="animate-fade-in"><AttendanceEngine attendance={state.attendance} /></div>}
          {activeTab === 'assignments' && <div className="animate-fade-in"><AssignmentBoard assignments={state.assignments} /></div>}
          {activeTab === 'study'       && <div className="animate-fade-in"><StudyRevisionView studySessions={state.today_study_sessions} revisions={state.upcoming_revisions} /></div>}
          {activeTab === 'skills'      && <div className="animate-fade-in"><SkillRoadmapView skills={state.skills} /></div>}
          {activeTab === 'timeline'    && <div className="animate-fade-in"><SemesterTimeline events={state.timeline_events} /></div>}
          {activeTab === 'handbook'    && <div className="animate-fade-in"><HandbookViewer onClose={() => setActiveTab('overview')} /></div>}
          {activeTab === 'resources'   && <div className="animate-fade-in"><ResourceHub /></div>}
        </div>
      </main>

      {/* ── Mobile Bottom Navigation ── */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-md border-t border-rose-400/[0.1]"
        role="navigation"
        aria-label="Mobile navigation"
      >
        <div className="flex items-stretch h-16">
          {PRIMARY_MOBILE.map(tab => {
            const Icon  = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                aria-label={tab.label}
                aria-pressed={isActive}
                className={[
                  'flex-1 flex flex-col items-center justify-center gap-1 min-w-[44px] transition-colors duration-150',
                  isActive ? 'text-accent' : 'text-slate-600 hover:text-slate-400',
                ].join(' ')}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span className="text-[10px] font-medium">{tab.shortLabel}</span>
              </button>
            );
          })}
          <button
            onClick={() => setShowMoreDrawer(true)}
            aria-label="More navigation"
            aria-expanded={showMoreDrawer}
            className={[
              'flex-1 flex flex-col items-center justify-center gap-1 min-w-[44px] transition-colors duration-150',
              moreTabActive ? 'text-accent' : 'text-slate-600 hover:text-slate-400',
            ].join(' ')}
          >
            <MoreHorizontal className="w-5 h-5 shrink-0" />
            <span className="text-[10px] font-medium">More</span>
          </button>
        </div>
      </nav>

      {/* ── Mobile More Drawer ── */}
      {showMoreDrawer && (
        <div className="lg:hidden fixed inset-0 z-50" onClick={() => setShowMoreDrawer(false)}>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in" />
          <div
            className="absolute bottom-0 left-0 right-0 bg-surface border-t border-rose-400/[0.12] rounded-t-2xl p-4 pb-8 animate-slide-up shadow-elevation-lg"
            onClick={e => e.stopPropagation()}
            role="dialog" aria-modal="true" aria-label="More navigation"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-semibold text-[--text-muted] uppercase tracking-wider">More Views</span>
              <button
                onClick={() => setShowMoreDrawer(false)}
                className="w-7 h-7 rounded-lg bg-elevated hover:bg-overlay flex items-center justify-center text-slate-400 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {MORE_MOBILE.map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={[
                      'flex flex-col items-center gap-2 p-3 rounded-xl transition-colors duration-150',
                      isActive
                        ? 'bg-accent/12 text-accent border border-accent/25'
                        : 'text-slate-400 hover:bg-elevated hover:text-slate-200',
                    ].join(' ')}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-xs font-medium text-center leading-tight">{tab.shortLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* AI Copilot Drawer */}
      <AICopilotDrawer isOpen={isCopilotOpen} onClose={() => setIsCopilotOpen(false)} />
    </div>
  );
};
