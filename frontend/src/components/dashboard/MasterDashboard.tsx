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
import { 
  LayoutDashboard, Calendar, ShieldCheck, CheckSquare, 
  Brain, Award, Milestone, BookOpen, Compass, Bot, Activity
} from 'lucide-react';
import { ics_service } from '../../lib/icsHelper';

interface MasterDashboardProps {
  initialState: MasterSemesterState;
  onResetToLanding: () => void;
}

export const MasterDashboard: React.FC<MasterDashboardProps> = ({ initialState, onResetToLanding }) => {
  const [state, setState] = useState<MasterSemesterState>(initialState);
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [isCopilotOpen, setIsCopilotOpen] = useState<boolean>(false);

  const navTabs = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "timetable", label: "Timetable & Calendar", icon: Calendar },
    { id: "attendance", label: "Attendance & Bunks", icon: ShieldCheck },
    { id: "assignments", label: "Assignments & Kanban", icon: CheckSquare },
    { id: "study", label: "Study & Spaced Repetition", icon: Brain },
    { id: "skills", label: "Skill Roadmaps", icon: Award },
    { id: "timeline", label: "Semester Timeline", icon: Milestone },
    { id: "handbook", label: "15-Section Handbook", icon: BookOpen },
    { id: "resources", label: "Free Resources", icon: Compass },
  ];

  const handleDownloadICS = () => {
    const icsContent = ics_service.generate_calendar_ics(state.timetable, state.user.name);
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'semester_copilot_timetable.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen pb-16 space-y-6">
      {/* Top Fixed Header with Navigation */}
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 px-4 sm:px-8 py-3.5 backdrop-blur-xl" role="banner">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div 
            className="flex items-center gap-3 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-xl p-1" 
            onClick={onResetToLanding}
            tabIndex={0}
            aria-label="Semester Copilot Home"
          >
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-white shadow-glow-primary font-black text-sm group-hover:scale-105 transition-transform">
              SC
            </div>
            <span className="font-extrabold text-white text-base tracking-tight hidden sm:inline">
              Semester<span className="text-cyan-400">Copilot</span>
            </span>
          </div>

          {/* Quick Nav Chips */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/90 p-1 rounded-2xl border border-slate-800 text-xs" role="tablist" aria-label="Main Dashboard Navigation">
            {navTabs.map((t) => {
              const Icon = t.icon;
              const isActive = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`tabpanel-${t.id}`}
                  onClick={() => setActiveTab(t.id)}
                  className={`px-3 py-1.5 rounded-xl font-medium flex items-center gap-1.5 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-glow-primary font-semibold"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Floating AI Copilot Trigger */}
          <button
            onClick={() => setIsCopilotOpen(true)}
            aria-label="Open AI Copilot Chat Assistant"
            className="px-4 py-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-xs font-bold flex items-center gap-2 shadow-glow-primary transition-all animate-pulse-subtle focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <Bot className="w-4 h-4 text-cyan-200" aria-hidden="true" />
            <span className="hidden sm:inline">AI Copilot</span>
          </button>
        </div>
      </header>

      {/* Mobile Tab Bar */}
      <div className="lg:hidden px-4 overflow-x-auto flex gap-1.5 pb-1" role="tablist">
        {navTabs.map((t) => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(t.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap flex items-center gap-1.5 border shrink-0 ${
                isActive
                  ? "bg-indigo-600 border-indigo-500 text-white font-bold"
                  : "bg-slate-900 border-slate-800 text-slate-400"
              }`}
            >
              <Icon className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8" role="main">
        {/* Top Summary Bar */}
        <TopStatsBar
          state={state}
          onOpenChat={() => setIsCopilotOpen(true)}
          onOpenHandbook={() => setActiveTab("handbook")}
          onDownloadICS={handleDownloadICS}
        />

        {/* Live Multi-Agent Operational Heartbeat Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl glass-panel border border-slate-800 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-semibold text-slate-300">10 Autonomous Agents Active</span>
            <span className="text-[10px] text-slate-500 font-mono">| Latency &lt; 2.4ms</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">Agent 1-2: Ingestion Graph ✓</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">Agent 4: 75% Sentinel ✓</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">Agent 7: 1/3/7/14 Spaced ✓</span>
          </div>
        </div>

        {/* Tab Views */}
        <div id={`tabpanel-${activeTab}`} role="tabpanel" tabIndex={0} className="focus:outline-none">
          {activeTab === "overview" && (
            <div className="space-y-8">
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

          {activeTab === "timetable" && (
            <TimetableCalendar slots={state.timetable} subjects={state.subjects} />
          )}

          {activeTab === "attendance" && (
            <AttendanceEngine attendance={state.attendance} />
          )}

          {activeTab === "assignments" && (
            <AssignmentBoard assignments={state.assignments} />
          )}

          {activeTab === "study" && (
            <StudyRevisionView studySessions={state.today_study_sessions} revisions={state.upcoming_revisions} />
          )}

          {activeTab === "skills" && (
            <SkillRoadmapView skills={state.skills} />
          )}

          {activeTab === "timeline" && (
            <SemesterTimeline events={state.timeline_events} />
          )}

          {activeTab === "handbook" && (
            <HandbookViewer onClose={() => setActiveTab("overview")} />
          )}

          {activeTab === "resources" && (
            <ResourceHub />
          )}
        </div>
      </main>

      {/* Floating AI Copilot Assistant Drawer */}
      <AICopilotDrawer
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
      />
    </div>
  );
};
