import React, { useState } from 'react';
import { UserProfile } from '../../lib/types';
import {
  User, School, Clock, Upload, Check, ArrowRight, ArrowLeft,
  Sparkles, FileText, Flame, Moon
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Button } from '../ui/Button';
import { Input, Select } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';

interface OnboardingWizardProps {
  onComplete: (profile: UserProfile) => void;
  onCancel: () => void;
}

const TOTAL_STEPS = 3;

const STEP_LABELS = [
  'Profile & Preferences',
  'Academic Documents',
  'Skills & Style',
];

const SKILL_OPTIONS = [
  'DSA', 'Agentic AI', 'Full Stack Web Development',
  'Machine Learning', 'Competitive Programming',
  'DevOps & Cloud', 'UI/UX Design', 'Placement Preparation', 'GRE / Higher Studies',
];

export const OnboardingWizard: React.FC<OnboardingWizardProps> = ({ onComplete, onCancel }) => {
  const [step, setStep] = useState<number>(1);
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Anwesh Singhal',
    university: 'Thapar Institute of Engineering & Technology',
    branch: 'B.E. (DS & AI)',
    semester: 'Semester-I',
    is_hosteller: true,
    wake_time: '07:00',
    sleep_time: '23:30',
    daily_study_hours: 3.5,
    break_duration_mins: 15,
    current_cgpa: 8.8,
    target_cgpa: 9.5,
    attendance_goal_pct: 75.0,
    study_style: 'Deep Work',
    chronotype: 'Night learner',
    target_skills: ['DSA', 'Agentic AI', 'Full Stack Web Development'],
    career_goals: ['Tier-1 AI Tech Placement'],
    fitness_goals: 'Daily 45 min Gym & Cardio',
    max_study_hours: 6.0,
  });

  const [uploadedFiles, setUploadedFiles] = useState([
    { name: 'Course_Scheme_Syllabus_BE_DSAI_2024.pdf', size: '4.2 MB', status: 'Parsed (6 Subjects)' },
    { name: 'Official_Semester1_Timetable.png',        size: '1.8 MB', status: 'OCR Matrix Extracted (31 Slots)' },
    { name: 'Academic_Calendar_2026_MST_EST.pdf',      size: '1.1 MB', status: 'Key Milestones Synced' },
  ]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setIsUploading(true);
      setTimeout(() => {
        setUploadedFiles(prev => [
          ...prev,
          { name: file.name, size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`, status: 'Parsed & Knowledge Graph Synced' },
        ]);
        setIsUploading(false);
      }, 1200);
    }
  };

  const toggleSkill = (skill: string) =>
    setProfile(prev => ({
      ...prev,
      target_skills: prev.target_skills.includes(skill)
        ? prev.target_skills.filter(s => s !== skill)
        : [...prev.target_skills, skill],
    }));

  const finishOnboarding = () => {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#0ea5e9', '#38bdf8', '#7dd3fc', '#10b981', '#fcd34d'],
    });
    onComplete(profile);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-2xl w-full">

        {/* ── Wizard shell ── */}
        <div className="bg-elevated border border-white/[0.09] rounded-2xl overflow-hidden shadow-elevation-lg">

          {/* Header */}
          <div className="px-6 py-5 border-b border-white/[0.07] flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="accent" className="font-mono">Step {step} of {TOTAL_STEPS}</Badge>
              </div>
              <h2 className="text-lg font-semibold text-slate-100">{STEP_LABELS[step - 1]}</h2>
            </div>

            {/* Step progress indicator */}
            <div className="flex items-center gap-1.5">
              {Array.from({ length: TOTAL_STEPS }).map((_, i) => {
                const s = i + 1;
                return (
                  <div
                    key={s}
                    className={[
                      'rounded-full transition-all duration-300',
                      s === step
                        ? 'w-8 h-2 bg-accent'
                        : s < step
                          ? 'w-5 h-2 bg-emerald-500'
                          : 'w-5 h-2 bg-white/[0.1]',
                    ].join(' ')}
                    aria-label={`Step ${s} ${s < step ? '(complete)' : s === step ? '(current)' : '(upcoming)'}`}
                  />
                );
              })}
            </div>
          </div>

          {/* Form content */}
          <div className="px-6 py-6">

            {/* ── STEP 1: Profile ── */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    value={profile.name}
                    onChange={e => setProfile({ ...profile, name: e.target.value })}
                    leftIcon={<User className="w-3.5 h-3.5" />}
                  />
                  <Input
                    label="University / Institute"
                    value={profile.university}
                    onChange={e => setProfile({ ...profile, university: e.target.value })}
                    leftIcon={<School className="w-3.5 h-3.5" />}
                  />
                  <Input
                    label="Degree & Branch"
                    value={profile.branch}
                    onChange={e => setProfile({ ...profile, branch: e.target.value })}
                  />
                  <Select
                    label="Current Semester"
                    value={profile.semester}
                    onChange={e => setProfile({ ...profile, semester: e.target.value })}
                  >
                    <option value="Semester-I">Semester-I (Freshman)</option>
                    <option value="Semester-II">Semester-II</option>
                    <option value="Semester-III">Semester-III</option>
                    <option value="Semester-IV">Semester-IV</option>
                    <option value="Semester-V">Semester-V</option>
                    <option value="Semester-VI">Semester-VI</option>
                  </Select>

                  {/* Residential status toggle */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-slate-400">
                      Residential Status
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { label: 'Hosteller', value: true,  sub: 'Curfew: 8:30 PM' },
                        { label: 'Day Scholar', value: false, sub: 'Commuter' },
                      ].map(opt => (
                        <button
                          key={String(opt.value)}
                          type="button"
                          onClick={() => setProfile({ ...profile, is_hosteller: opt.value })}
                          className={[
                            'p-3 rounded-lg border text-left transition-colors duration-150',
                            profile.is_hosteller === opt.value
                              ? 'bg-accent/10 border-accent/30 text-accent'
                              : 'bg-surface border-white/[0.09] text-slate-400 hover:border-white/[0.14]',
                          ].join(' ')}
                        >
                          <p className="text-xs font-semibold">{opt.label}</p>
                          <p className="text-[10px] opacity-60 mt-0.5">{opt.sub}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Wake/Sleep times */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-slate-400 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-500" /> Wake & Sleep Times
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="time"
                        value={profile.wake_time}
                        onChange={e => setProfile({ ...profile, wake_time: e.target.value })}
                        className="bg-surface border border-white/[0.09] rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-colors"
                        aria-label="Wake time"
                      />
                      <input
                        type="time"
                        value={profile.sleep_time}
                        onChange={e => setProfile({ ...profile, sleep_time: e.target.value })}
                        className="bg-surface border border-white/[0.09] rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-colors"
                        aria-label="Sleep time"
                      />
                    </div>
                  </div>

                  <Input
                    label="Current CGPA"
                    type="number"
                    step="0.1"
                    value={profile.current_cgpa}
                    onChange={e => setProfile({ ...profile, current_cgpa: parseFloat(e.target.value) })}
                  />
                  <Input
                    label="Target CGPA"
                    type="number"
                    step="0.1"
                    value={profile.target_cgpa}
                    onChange={e => setProfile({ ...profile, target_cgpa: parseFloat(e.target.value) })}
                    className="text-emerald-400 font-semibold"
                  />
                </div>
              </div>
            )}

            {/* ── STEP 2: Documents ── */}
            {step === 2 && (
              <div className="space-y-5">
                {/* Drop zone */}
                <label className="relative block">
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.png,.jpg,.jpeg,.docx,.csv,.txt"
                    onChange={handleFileUpload}
                    className="sr-only"
                  />
                  <div className="border-2 border-dashed border-white/[0.1] hover:border-accent/30 rounded-xl p-10 text-center bg-surface/50 hover:bg-surface transition-colors cursor-pointer">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 mx-auto flex items-center justify-center mb-4">
                      <Upload className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="text-sm font-semibold text-slate-200">
                      Drag & drop academic files here
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      PDF, DOCX, PNG, JPEG, CSV — Course Scheme, Timetable, Academic Calendar
                    </p>
                    {isUploading && (
                      <p className="mt-3 text-xs text-accent font-medium animate-pulse">
                        Agent 1 OCR & Document Parser extracting data…
                      </p>
                    )}
                  </div>
                </label>

                {/* Uploaded files list */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                      Ingested Assets ({uploadedFiles.length})
                    </span>
                    <Badge variant="success" dot>{uploadedFiles.length} files</Badge>
                  </div>
                  {uploadedFiles.map((file, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3.5 rounded-lg bg-surface/60 border border-white/[0.06]"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <FileText className="w-4 h-4 text-slate-500 shrink-0" aria-hidden="true" />
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-slate-200 truncate">{file.name}</p>
                          <p className="text-[11px] text-slate-500">
                            {file.size} · <span className="text-emerald-400">{file.status}</span>
                          </p>
                        </div>
                      </div>
                      <span className="w-6 h-6 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── STEP 3: Skills & Style ── */}
            {step === 3 && (
              <div className="space-y-5">
                {/* Skill selection */}
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-slate-400">
                    Skills to master this semester
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {SKILL_OPTIONS.map(skill => {
                      const isSelected = profile.target_skills.includes(skill);
                      return (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => toggleSkill(skill)}
                          className={[
                            'p-3 rounded-lg border text-left text-xs font-medium transition-colors duration-150',
                            isSelected
                              ? 'bg-accent/10 border-accent/30 text-accent'
                              : 'bg-surface border-white/[0.09] text-slate-400 hover:border-white/[0.14] hover:text-slate-300',
                          ].join(' ')}
                          aria-pressed={isSelected}
                        >
                          <div className="flex items-center justify-between gap-1">
                            <span>{skill}</span>
                            {isSelected && <Check className="w-3 h-3 shrink-0" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Select
                    label="Preferred Study Style"
                    value={profile.study_style}
                    onChange={e => setProfile({ ...profile, study_style: e.target.value })}
                  >
                    <option value="Deep Work">Deep Work (90-min Focus Blocks)</option>
                    <option value="Pomodoro">Pomodoro (25m + 5m Break)</option>
                    <option value="Revision Cycles">Revision Cycles (Spaced Retrieval)</option>
                  </Select>

                  <Select
                    label="Chronotype / Peak Energy"
                    value={profile.chronotype}
                    onChange={e => setProfile({ ...profile, chronotype: e.target.value })}
                  >
                    <option value="Night learner">Night Learner (21:30 – 01:00)</option>
                    <option value="Morning learner">Morning Learner (06:30 – 09:00)</option>
                  </Select>
                </div>
              </div>
            )}
          </div>

          {/* Footer controls */}
          <div className="px-6 py-4 border-t border-white/[0.07] flex items-center justify-between bg-surface/40">
            {step > 1 ? (
              <Button
                variant="ghost"
                size="md"
                onClick={() => setStep(step - 1)}
                leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}
              >
                Back
              </Button>
            ) : (
              <Button variant="ghost" size="md" onClick={onCancel}>
                Cancel
              </Button>
            )}

            {step < TOTAL_STEPS ? (
              <Button
                variant="primary"
                size="md"
                onClick={() => setStep(step + 1)}
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Continue
              </Button>
            ) : (
              <Button
                variant="primary"
                size="lg"
                onClick={finishOnboarding}
                leftIcon={<Sparkles className="w-4 h-4" />}
              >
                Generate Semester Engine
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
