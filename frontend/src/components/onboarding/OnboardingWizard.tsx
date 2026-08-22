import React, { useState } from 'react';
import { UserProfile } from '../../lib/types';
import { User, School, Clock, Upload, Check, ArrowRight, ArrowLeft, Sparkles, BookOpen, Target, FileText, Cpu, Moon, Sun, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';

interface OnboardingWizardProps {
  onComplete: (profile: UserProfile) => void;
  onCancel: () => void;
}

export const OnboardingWizard: React.FC<OnboardingWizardProps> = ({ onComplete, onCancel }) => {
  const [step, setStep] = useState<number>(1);
  const [profile, setProfile] = useState<UserProfile>({
    name: "Anwesh Singhal",
    university: "Thapar Institute of Engineering & Technology",
    branch: "B.E. (DS & AI)",
    semester: "Semester-I",
    is_hosteller: true,
    wake_time: "07:00",
    sleep_time: "23:30",
    daily_study_hours: 3.5,
    break_duration_mins: 15,
    current_cgpa: 8.8,
    target_cgpa: 9.5,
    attendance_goal_pct: 75.0,
    study_style: "Deep Work",
    chronotype: "Night learner",
    target_skills: ["DSA", "Agentic AI", "Full Stack Web Development"],
    career_goals: ["Tier-1 AI Tech Placement"],
    fitness_goals: "Daily 45 min Gym & Cardio",
    max_study_hours: 6.0
  });

  const [uploadedFiles, setUploadedFiles] = useState<Array<{ name: string; size: string; status: string }>>([
    { name: "Course_Scheme_Syllabus_BE_DSAI_2024.pdf", size: "4.2 MB", status: "Parsed (6 Subjects)" },
    { name: "Official_Semester1_Timetable.png", size: "1.8 MB", status: "OCR Matrix Extracted (31 Slots)" },
    { name: "Academic_Calendar_2026_MST_EST.pdf", size: "1.1 MB", status: "Key Milestones Synced" }
  ]);

  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setIsUploading(true);
      setTimeout(() => {
        setUploadedFiles(prev => [
          ...prev,
          { name: file.name, size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`, status: "Parsed & Knowledge Graph Synced" }
        ]);
        setIsUploading(false);
      }, 1200);
    }
  };

  const toggleSkill = (skill: string) => {
    setProfile(prev => ({
      ...prev,
      target_skills: prev.target_skills.includes(skill)
        ? prev.target_skills.filter(s => s !== skill)
        : [...prev.target_skills, skill]
    }));
  };

  const finishOnboarding = () => {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#6366f1', '#06b6d4', '#10b981', '#f59e0b']
    });
    onComplete(profile);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 relative">
      <div className="max-w-3xl w-full glass-panel-glow rounded-3xl p-6 sm:p-10 border border-indigo-500/30 space-y-8 relative overflow-hidden">
        {/* Step Indicator Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">Step {step} of 3</span>
            <h2 className="text-2xl font-bold text-white mt-1">
              {step === 1 && "Profile & Circadian Preferences"}
              {step === 2 && "Upload Academic Documents"}
              {step === 3 && "Skills & Learning Style Questionnaire"}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`w-8 h-2 rounded-full transition-all duration-300 ${
                  s === step ? "w-10 bg-indigo-500" : s < step ? "bg-emerald-500" : "bg-slate-700"
                }`}
              />
            ))}
          </div>
        </div>

        {/* STEP 1: Profile Form */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-indigo-400" /> Full Name
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                  <School className="w-3.5 h-3.5 text-indigo-400" /> University / Institute
                </label>
                <input
                  type="text"
                  value={profile.university}
                  onChange={(e) => setProfile({ ...profile, university: e.target.value })}
                  className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-300">Degree & Branch</label>
                <input
                  type="text"
                  value={profile.branch}
                  onChange={(e) => setProfile({ ...profile, branch: e.target.value })}
                  className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-300">Current Semester</label>
                <select
                  value={profile.semester}
                  onChange={(e) => setProfile({ ...profile, semester: e.target.value })}
                  className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Semester-I">Semester-I (Freshman)</option>
                  <option value="Semester-II">Semester-II</option>
                  <option value="Semester-III">Semester-III</option>
                  <option value="Semester-IV">Semester-IV</option>
                  <option value="Semester-V">Semester-V</option>
                  <option value="Semester-VI">Semester-VI</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-300">Residential Status</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setProfile({ ...profile, is_hosteller: true })}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border ${
                      profile.is_hosteller
                        ? "bg-indigo-600/30 border-indigo-500 text-indigo-300"
                        : "bg-slate-900/60 border-slate-800 text-slate-400"
                    }`}
                  >
                    Hosteller (Curfew: 8:30 PM)
                  </button>
                  <button
                    type="button"
                    onClick={() => setProfile({ ...profile, is_hosteller: false })}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border ${
                      !profile.is_hosteller
                        ? "bg-indigo-600/30 border-indigo-500 text-indigo-300"
                        : "bg-slate-900/60 border-slate-800 text-slate-400"
                    }`}
                  >
                    Day Scholar (Commuter)
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" /> Wake & Sleep Hours
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="time"
                    value={profile.wake_time}
                    onChange={(e) => setProfile({ ...profile, wake_time: e.target.value })}
                    className="bg-slate-900/80 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                  <input
                    type="time"
                    value={profile.sleep_time}
                    onChange={(e) => setProfile({ ...profile, sleep_time: e.target.value })}
                    className="bg-slate-900/80 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-300">Current CGPA</label>
                <input
                  type="number"
                  step="0.1"
                  value={profile.current_cgpa}
                  onChange={(e) => setProfile({ ...profile, current_cgpa: parseFloat(e.target.value) })}
                  className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-300">Target CGPA Goal</label>
                <input
                  type="number"
                  step="0.1"
                  value={profile.target_cgpa}
                  onChange={(e) => setProfile({ ...profile, target_cgpa: parseFloat(e.target.value) })}
                  className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-emerald-400 font-bold"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Document Upload */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="border-2 border-dashed border-indigo-500/40 rounded-2xl p-8 text-center bg-slate-900/40 hover:bg-slate-900/60 transition-colors relative">
              <input
                type="file"
                multiple
                accept=".pdf,.png,.jpg,.jpeg,.docx,.csv,.txt"
                onChange={handleFileUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 text-indigo-400 mx-auto flex items-center justify-center mb-4">
                <Upload className="w-7 h-7" />
              </div>
              <h3 className="text-base font-semibold text-white">Drag & drop your academic files here</h3>
              <p className="text-xs text-slate-400 mt-1">
                Supports PDF, DOCX, PNG, JPEG, CSV (Course Scheme, Timetable, Academic Calendar, Hostel Rules)
              </p>
              {isUploading && (
                <div className="mt-4 text-xs font-medium text-cyan-400 animate-pulse">
                  Agent 1 OCR & Document Parser extracting courses and timetable slots...
                </div>
              )}
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Ingested Academic Assets ({uploadedFiles.length})</h4>
              <div className="space-y-2">
                {uploadedFiles.map((file, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-indigo-400" />
                      <div>
                        <p className="text-xs font-semibold text-white">{file.name}</p>
                        <p className="text-[11px] text-slate-400">{file.size} • <span className="text-emerald-400">{file.status}</span></p>
                      </div>
                    </div>
                    <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Skills & Questionnaire */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                What skills do you want to master this semester?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[
                  "DSA", "Agentic AI", "Full Stack Web Development", "Machine Learning", 
                  "Competitive Programming", "DevOps & Cloud", "UI/UX Design", "Placement Preparation", "GRE / Higher Studies"
                ].map((skill) => {
                  const isSelected = profile.target_skills.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className={`p-3 rounded-xl text-left text-xs font-medium border transition-all ${
                        isSelected
                          ? "bg-indigo-600/30 border-indigo-500 text-indigo-200 shadow-glow-primary"
                          : "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{skill}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-indigo-400" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-400" /> Preferred Study Style
                </label>
                <select
                  value={profile.study_style}
                  onChange={(e) => setProfile({ ...profile, study_style: e.target.value })}
                  className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white"
                >
                  <option value="Deep Work">Deep Work (90-min High Focus Blocks)</option>
                  <option value="Pomodoro">Pomodoro (25m Focus + 5m Break Intervals)</option>
                  <option value="Revision Cycles">Revision Cycles (Spaced Retrieval Focus)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                  <Moon className="w-3.5 h-3.5 text-indigo-400" /> Chronotype / Peak Energy
                </label>
                <select
                  value={profile.chronotype}
                  onChange={(e) => setProfile({ ...profile, chronotype: e.target.value })}
                  className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white"
                >
                  <option value="Night learner">Night Learner (Peak Focus: 21:30 - 01:00)</option>
                  <option value="Morning learner">Morning Learner (Peak Focus: 06:30 - 09:00)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Footer Navigation Controls */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-800">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          ) : (
            <button
              onClick={onCancel}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
            >
              Cancel
            </button>
          )}

          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-2 shadow-glow-primary"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={finishOnboarding}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-500 hover:to-emerald-500 text-white text-sm font-bold flex items-center gap-2 shadow-glow-emerald"
            >
              <Sparkles className="w-4 h-4 text-emerald-300" />
              Generate Semester Engine
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
