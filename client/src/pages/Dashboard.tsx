import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { AudioButton } from '../components/ui/AudioButton';
import { getProgress } from '../utils/api';
import { getLearnerProfile, getLearnerId } from '../utils/storage';
import { LearnerProfile, LearnerStats } from '../types';
import {
  Flame,
  BookOpen,
  Award,
  CheckCircle2,
  Brain,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Bookmark,
  Languages,
  BookMarked,
  Clock,
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<LearnerProfile | null>(null);
  const [stats, setStats] = useState<LearnerStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const p = getLearnerProfile();
    if (!p) {
      navigate('/onboarding');
      return;
    }
    setProfile(p);

    const lid = getLearnerId();
    getProgress(lid)
      .then((res) => {
        setStats(res.stats);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [navigate]);

  const dailyPhrases = [
    { kn: 'ಶುಭೋದಯ! ಇಂದು ಹೊಸದನ್ನು ಕಲಿಯಿರಿ.', tr: 'Shubhodaya! Indu hosadannu kaliyiri.', en: 'Good morning! Learn something new today.' },
    { kn: 'ಕಾಯಕವೇ ಕೈಲಾಸ.', tr: 'Kaayakave kailaasa.', en: 'Work is worship.' },
    { kn: 'ಕನ್ನಡ ನಮ್ಮ ಹೆಮ್ಮೆ, ನಮ್ಮ ಉಸಿರು.', tr: 'Kannada namma hemme, namma usiru.', en: 'Kannada is our pride, our breath.' },
  ];
  const phrase = dailyPhrases[0];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Refined Welcome Section with Karnataka Maroon & Yellow Accent */}
      <div className="bg-white rounded-2xl border border-[#E9DFD7] p-6 sm:p-7 shadow-2xs relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#FFF9C7] border border-[#F5C400] text-[#8B1538] text-xs font-bold tracking-wide">
            <Sparkles size={14} className="text-[#8B1538]" />
            Curriculum: Kannada Foundations (18 Core Modules)
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#8B1538] tracking-tight">
            ನಮಸ್ಕಾರ, {profile?.name || 'Learner'}!
          </h2>
          <p className="text-sm text-[#71656A] leading-relaxed">
            Welcome back to your Kannada fluency track. Continuous daily practice strengthens pronunciation, reading script, and conversational confidence.
          </p>
        </div>

        <div className="flex sm:flex-col gap-2.5 shrink-0 w-full sm:w-auto">
          <Button
            variant="primary"
            onClick={() => navigate('/curriculum')}
            className="w-full sm:w-44 font-bold"
          >
            <BookOpen size={16} /> Continue Lessons
          </Button>
          <Button
            variant="gold"
            onClick={() => navigate('/quiz')}
            className="w-full sm:w-44 font-bold text-[#282126]"
          >
            <Brain size={16} /> Instant AI Quiz
          </Button>
        </div>
      </div>

      {/* Real Learning Statistics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-4 border-[#E9DFD7] shadow-2xs hover:border-[#F5C400] transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FDF2F4] text-[#8B1538] flex items-center justify-center shrink-0 border border-[#8B1538]/20">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <p className="text-[11px] font-bold text-[#71656A] uppercase tracking-wider">
                Lessons Completed
              </p>
              <h4 className="text-xl font-extrabold text-[#282126] mt-0.5">
                {stats?.lessonsCompleted || 0}
              </h4>
            </div>
          </div>
        </Card>

        <Card className="p-4 border-[#E9DFD7] shadow-2xs hover:border-[#F5C400] transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFF9C7] text-[#8B1538] flex items-center justify-center shrink-0 border border-[#F5C400]/40">
              <Award size={20} />
            </div>
            <div>
              <p className="text-[11px] font-bold text-[#71656A] uppercase tracking-wider">
                Total Score
              </p>
              <h4 className="text-xl font-extrabold text-[#282126] mt-0.5">
                {stats?.totalPoints || 0} pts
              </h4>
            </div>
          </div>
        </Card>

        <Card className="p-4 border-[#E9DFD7] shadow-2xs hover:border-[#F5C400] transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#8B1538] flex items-center justify-center shrink-0 border border-[#F5C400]/30">
              <Flame size={20} className="text-[#F5C400]" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-[#71656A] uppercase tracking-wider">
                Daily Streak
              </p>
              <h4 className="text-xl font-extrabold text-[#282126] mt-0.5">
                {stats?.streakDays || 1} day
              </h4>
            </div>
          </div>
        </Card>

        <Card className="p-4 border-[#E9DFD7] shadow-2xs hover:border-[#F5C400] transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-stone-50 text-[#71656A] flex items-center justify-center shrink-0 border border-[#E9DFD7]">
              <TrendingUp size={20} className="text-[#8B1538]" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-[#71656A] uppercase tracking-wider">
                Quizzes Taken
              </p>
              <h4 className="text-xl font-extrabold text-[#282126] mt-0.5">
                {stats?.quizAttempts || 0}
              </h4>
            </div>
          </div>
        </Card>
      </div>

      {/* Daily Kannada Phrase of the Day Card */}
      <Card className="p-5 border-[#F5C400]/80 bg-white shadow-2xs relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8B1538] via-[#F5C400] to-[#8B1538] rounded-t-2xl" />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-1">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold text-[#8B1538] bg-[#FFF9C7] px-2.5 py-0.5 rounded border border-[#F5C400]/60 uppercase tracking-wider">
                ದಿನದ ವಾಕ್ಯ • Phrase of the Day
              </span>
            </div>
            <h3 className="font-kannada font-bold text-2xl text-[#8B1538] pt-1">
              {phrase.kn}
            </h3>
            <div className="flex items-center gap-2 flex-wrap text-xs text-[#71656A]">
              <span className="font-semibold text-[#282126]">[{phrase.tr}]</span>
              <span className="text-stone-300">•</span>
              <span className="text-[#282126] italic font-medium">"{phrase.en}"</span>
            </div>
          </div>
          <div className="shrink-0">
            <AudioButton text={phrase.kn} size={22} label="Listen to Accent" />
          </div>
        </div>
      </Card>

      {/* Quick Launch Learning Hub Grid */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card
          hover
          onClick={() => navigate('/curriculum')}
          className="flex flex-col justify-between p-5 border-[#E9DFD7] shadow-2xs"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#FDF2F4] text-[#8B1538] border border-[#8B1538]/20 flex items-center justify-center mb-3">
              <BookOpen size={20} />
            </div>
            <h4 className="font-bold text-[#8B1538] text-base">Foundations (ಮೂಲ ಕಲಿಕೆ)</h4>
            <p className="text-xs text-[#71656A] mt-1.5 leading-relaxed">
              18 comprehensive modules: Varnamale, Kagunita, Ottakshara, Numbers, and Core Grammar.
            </p>
          </div>
          <div className="mt-5 flex items-center text-xs font-bold text-[#8B1538] gap-1.5">
            Browse Foundations <ArrowRight size={14} className="text-[#F5C400]" />
          </div>
        </Card>

        <Card
          hover
          onClick={() => navigate('/dictionary')}
          className="flex flex-col justify-between p-5 border-[#E9DFD7] shadow-2xs"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#FFF9C7] text-[#8B1538] border border-[#F5C400]/40 flex items-center justify-center mb-3">
              <Languages size={20} />
            </div>
            <h4 className="font-bold text-[#8B1538] text-base">Bilingual Dictionary</h4>
            <p className="text-xs text-[#71656A] mt-1.5 leading-relaxed">
              Fast bidirectional lookup with transliteration, audio pronunciations, and AI explanations.
            </p>
          </div>
          <div className="mt-5 flex items-center text-xs font-bold text-[#8B1538] gap-1.5">
            Open Dictionary <ArrowRight size={14} className="text-[#F5C400]" />
          </div>
        </Card>

        <Card
          hover
          onClick={() => navigate('/translation')}
          className="flex flex-col justify-between p-5 border-[#E9DFD7] shadow-2xs"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#FFF9C7] text-[#8B1538] border border-[#F5C400]/40 flex items-center justify-center mb-3">
              <Brain size={20} />
            </div>
            <h4 className="font-bold text-[#8B1538] text-base">AI Translation Lab</h4>
            <p className="text-xs text-[#71656A] mt-1.5 leading-relaxed">
              Context-aware English ↔ Kannada translation powered by Google Gemini AI engine.
            </p>
          </div>
          <div className="mt-5 flex items-center text-xs font-bold text-[#8B1538] gap-1.5">
            Try Translator <ArrowRight size={14} className="text-[#F5C400]" />
          </div>
        </Card>
      </div>
    </div>
  );
};
