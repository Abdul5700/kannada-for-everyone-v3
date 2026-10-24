import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { saveProfile } from '../utils/api';
import { setLearnerProfile } from '../utils/storage';
import { ClassLevel, ProficiencyLevel, ExplanationLanguage } from '../types';

export const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [proficiency, setProficiency] = useState<ProficiencyLevel>('none');
  const [explanationLanguage, setExplanationLanguage] = useState<ExplanationLanguage>('english');
  const [dailyGoalMinutes, setDailyGoalMinutes] = useState(15);
  const [loading, setLoading] = useState(false);

  const handleFinish = async () => {
    setLoading(true);
    const newProfile = {
      id: `learner_${Date.now()}`,
      classLevel: 'beginner' as ClassLevel,
      proficiency,
      explanationLanguage,
      dailyGoalMinutes,
      preferredCategories: ['conversation', 'vocabulary'],
    };

    try {
      await saveProfile(newProfile);
      setLearnerProfile(newProfile);
      navigate('/');
    } catch (err) {
      console.error('Failed to save profile:', err);
      // Fallback local save
      setLearnerProfile(newProfile);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9E8] flex items-center justify-center p-4">
      <Card className="max-w-xl w-full p-8 shadow-md border-[#E9DFD7]">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[#8B1538] border-2 border-[#F5C400] text-[#F5C400] font-kannada font-bold text-3xl flex items-center justify-center mx-auto mb-3 shadow-md">
            ಕ
          </div>
          <h2 className="text-2xl font-bold text-[#8B1538]">
            Welcome to Kannada for Everyone
          </h2>
          <p className="text-sm text-[#71656A] mt-1">
            Let's customize your personalized Kannada learning path.
          </p>
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-[#282126]">
              1. Your Current Kannada Proficiency
            </h3>
            <div className="space-y-2">
              {[
                { val: 'none', label: 'Complete Beginner (Zero knowledge)' },
                { val: 'basic', label: 'Know a few words / letters' },
                { val: 'intermediate', label: 'Can understand basic spoken Kannada' },
                { val: 'advanced', label: 'Can read & speak, want comprehensive mastery' },
              ].map((p) => (
                <button
                  key={p.val}
                  type="button"
                  onClick={() => setProficiency(p.val as ProficiencyLevel)}
                  className={`w-full p-3.5 text-left rounded-xl border text-sm font-medium transition-all ${
                    proficiency === p.val
                      ? 'border-[#8B1538] bg-[#FDF2F4] text-[#8B1538] shadow-sm font-bold'
                      : 'border-[#E9DFD7] hover:border-[#F5C400] text-[#282126] bg-white'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
            <div className="pt-4 flex justify-end">
              <Button onClick={() => setStep(2)}>Next Step →</Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-[#282126]">
              2. Study Goals & Preferences
            </h3>
            <div>
              <label className="text-xs font-semibold text-[#71656A] block mb-1">
                Daily Learning Commitment
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[10, 15, 30].map((mins) => (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => setDailyGoalMinutes(mins)}
                    className={`py-2.5 rounded-lg border text-sm font-medium ${
                      dailyGoalMinutes === mins
                        ? 'border-[#8B1538] bg-[#FDF2F4] text-[#8B1538] font-bold'
                        : 'border-[#E9DFD7] text-[#282126] bg-white'
                    }`}
                  >
                    {mins} mins/day
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <label className="text-xs font-semibold text-[#71656A] block mb-1">
                Explanation Language
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setExplanationLanguage('english')}
                  className={`py-2 rounded-lg border text-sm font-medium ${
                    explanationLanguage === 'english'
                      ? 'border-[#8B1538] bg-[#FDF2F4] text-[#8B1538] font-bold'
                      : 'border-[#E9DFD7] text-[#282126] bg-white'
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setExplanationLanguage('kannada')}
                  className={`py-2 rounded-lg border text-sm font-medium font-kannada ${
                    explanationLanguage === 'kannada'
                      ? 'border-[#8B1538] bg-[#FDF2F4] text-[#8B1538] font-bold'
                      : 'border-[#E9DFD7] text-[#282126] bg-white'
                  }`}
                >
                  ಕನ್ನಡ (Kannada)
                </button>
              </div>
            </div>

            <div className="pt-6 flex justify-between">
              <Button variant="secondary" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button variant="gold" onClick={handleFinish} loading={loading}>
                Start Learning Now! 🚀
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};
