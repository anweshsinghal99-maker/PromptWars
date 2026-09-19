import React, { useState, useEffect } from 'react';
import { MasterSemesterState, UserProfile } from './lib/types';
import { INITIAL_DEMO_STATE } from './lib/demoData';
import { api } from './lib/api';
import { LandingHero } from './components/landing/LandingHero';
import { OnboardingWizard } from './components/onboarding/OnboardingWizard';
import { MasterDashboard } from './components/dashboard/MasterDashboard';

export const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'onboarding' | 'dashboard'>('landing');
  const [semesterState, setSemesterState] = useState<MasterSemesterState>(INITIAL_DEMO_STATE);

  useEffect(() => {
    // Attempt background sync with FastAPI backend
    api.getMasterState().then(state => {
      if (state) setSemesterState(state);
    });
  }, []);

  const handleStartPlanning = () => {
    setView('onboarding');
  };

  const handleTryDemo = () => {
    setView('dashboard');
  };

  const handleOnboardingComplete = (newProfile: UserProfile) => {
    setSemesterState(prev => ({
      ...prev,
      user: newProfile
    }));
    api.updateProfile(newProfile);
    setView('dashboard');
  };

  return (
    <div className="min-h-screen bg-base text-slate-100 selection:bg-accent/40 selection:text-[#ffffff] overflow-x-hidden">
      {view === 'landing' && (
        <LandingHero
          onStartPlanning={handleStartPlanning}
          onTryDemo={handleTryDemo}
        />
      )}

      {view === 'onboarding' && (
        <OnboardingWizard
          onComplete={handleOnboardingComplete}
          onCancel={() => setView('landing')}
        />
      )}

      {view === 'dashboard' && (
        <MasterDashboard
          initialState={semesterState}
          onResetToLanding={() => setView('landing')}
        />
      )}
    </div>
  );
};
export default App;
