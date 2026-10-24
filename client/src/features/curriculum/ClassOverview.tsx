import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { getFoundations } from '../../utils/api';
import { KagunitaMatrix } from './KagunitaMatrix';
import { FoundationSectionView } from './FoundationSectionView';
import { VarnamaleChart } from './VarnamaleChart';
import { OttaksharaChart } from './OttaksharaChart';
import { NumbersTable } from './NumbersTable';
import {
  BookOpen,
  Sparkles,
  ChevronRight,
  Layers,
} from 'lucide-react';

const SECTION_EMOJI: Record<string, string> = {
  Varnamale: '🔤',
  Kagunita: '🟡',
  Ottakshara: '🔡',
  'Letter to Word': '📚',
  Numbers: '🔢',
  Mathematics: '➕',
  Grammar: '📐',
  Anatomy: '🫀',
  Visuals: '🎨',
  Food: '🍛',
  Nature: '🌿',
  Kinship: '👨‍👩‍👧‍👦',
  Conversation: '💬',
  Directions: '🧭',
  Time: '⏰',
  Travel: '🚌',
  Festivals: '🪔',
  Heritage: '🏛️',
};

const SECTION_COLORS: Record<string, string> = {
  Varnamale: 'from-rose-50 to-pink-50 border-rose-200',
  Kagunita: 'from-amber-50 to-yellow-50 border-amber-200',
  Ottakshara: 'from-violet-50 to-purple-50 border-violet-200',
  'Letter to Word': 'from-blue-50 to-sky-50 border-blue-200',
  Numbers: 'from-emerald-50 to-teal-50 border-emerald-200',
  Mathematics: 'from-orange-50 to-amber-50 border-orange-200',
  Grammar: 'from-indigo-50 to-blue-50 border-indigo-200',
  Anatomy: 'from-red-50 to-rose-50 border-red-200',
  Visuals: 'from-fuchsia-50 to-pink-50 border-fuchsia-200',
  Food: 'from-lime-50 to-green-50 border-lime-200',
  Nature: 'from-green-50 to-emerald-50 border-green-200',
  Kinship: 'from-cyan-50 to-sky-50 border-cyan-200',
  Conversation: 'from-teal-50 to-cyan-50 border-teal-200',
  Directions: 'from-sky-50 to-blue-50 border-sky-200',
  Time: 'from-yellow-50 to-amber-50 border-yellow-200',
  Travel: 'from-purple-50 to-violet-50 border-purple-200',
  Festivals: 'from-orange-50 to-red-50 border-orange-200',
  Heritage: 'from-amber-50 to-orange-50 border-amber-200',
};

export const ClassOverview: React.FC = () => {
  const [foundationsData, setFoundationsData] = useState<any>(null);
  const [loadingFoundations, setLoadingFoundations] = useState(true);
  const [activeSectionNumber, setActiveSectionNumber] = useState<number | null>(null);

  useEffect(() => {
    getFoundations()
      .then((data) => setFoundationsData(data))
      .catch((err) => console.error(err))
      .finally(() => setLoadingFoundations(false));
  }, []);

  // ─── Individual Section Views ───
  if (activeSectionNumber !== null) {
    if (activeSectionNumber === 1) {
      return (
        <div className="space-y-4">
          <Button variant="secondary" size="sm" onClick={() => setActiveSectionNumber(null)} className="text-xs">
            ← Back to All 18 Foundations
          </Button>
          <VarnamaleChart />
        </div>
      );
    }
    if (activeSectionNumber === 2) {
      return (
        <div className="space-y-4">
          <Button variant="secondary" size="sm" onClick={() => setActiveSectionNumber(null)} className="text-xs">
            ← Back to All 18 Foundations
          </Button>
          <KagunitaMatrix />
        </div>
      );
    }
    if (activeSectionNumber === 3) {
      return (
        <div className="space-y-4">
          <Button variant="secondary" size="sm" onClick={() => setActiveSectionNumber(null)} className="text-xs">
            ← Back to All 18 Foundations
          </Button>
          <OttaksharaChart />
        </div>
      );
    }
    if (activeSectionNumber === 5) {
      return (
        <div className="space-y-4">
          <Button variant="secondary" size="sm" onClick={() => setActiveSectionNumber(null)} className="text-xs">
            ← Back to All 18 Foundations
          </Button>
          <NumbersTable />
        </div>
      );
    }
    return (
      <FoundationSectionView
        sectionNumber={activeSectionNumber}
        onBack={() => setActiveSectionNumber(null)}
      />
    );
  }

  const sections: any[] = foundationsData?.sections || [];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* ─── Top Banner ─── */}
      <div className="bg-gradient-to-r from-maroon-800 via-maroon-900 to-amber-950 text-white rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-400/20 text-gold-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles size={14} className="text-gold-400" />
              Kannada Learning Academy — ಕನ್ನಡ ಕಲಿಕಾ ಕೇಂದ್ರ
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Kannada Foundations{' '}
              <span className="font-kannada text-gold-300 text-xl ml-1">— ಕನ್ನಡ ಮೂಲಭೂತ ಕಲಿಕೆ</span>
            </h2>
            <p className="mt-2 text-sm text-gray-200 max-w-2xl leading-relaxed">
              Master the building blocks of Kannada — Alphabet, Kagunita, Numbers, Grammar, Vocabulary, and more.
              Each section has in-depth topics, exercises, and audio.
            </p>
          </div>
          <div className="shrink-0 hidden md:flex flex-col items-end gap-2">
            <div className="text-4xl font-extrabold text-gold-300">18</div>
            <div className="text-xs text-gray-300 font-semibold uppercase tracking-widest">Sections</div>
          </div>
        </div>
      </div>

      {/* ─── Section Grid ─── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Layers className="text-maroon-700" size={22} />
            <span>All 18 Foundational Sections</span>
            <span className="font-kannada text-gray-500 text-sm">— ೧೮ ಅಧ್ಯಾಯಗಳು</span>
          </h3>
          <Badge variant="maroon">{sections.length || 18} Sections</Badge>
        </div>

        {loadingFoundations ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 18 }).map((_, i) => (
              <div key={i} className="h-32 rounded-2xl bg-gray-100 animate-pulse" />
            ))}
          </div>
        ) : sections.length === 0 ? (
          <Card className="p-12 text-center">
            <BookOpen className="mx-auto text-gray-300 mb-3" size={40} />
            <p className="text-gray-500 font-medium">Could not load sections. Please refresh.</p>
          </Card>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {sections.map((sec: any) => {
              const emoji = SECTION_EMOJI[sec.category] || '📖';
              const colorClass = SECTION_COLORS[sec.category] || 'from-gray-50 to-white border-gray-200';

              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => setActiveSectionNumber(sec.sectionNumber)}
                  className={`group text-left bg-gradient-to-br ${colorClass} border rounded-2xl p-5 hover:shadow-md transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-maroon-400/40 w-full`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0 flex-1">
                      {/* Emoji icon */}
                      <div className="w-11 h-11 rounded-xl bg-white/80 border border-white shadow-sm flex items-center justify-center text-2xl shrink-0">
                        {emoji}
                      </div>
                      <div className="min-w-0">
                        {/* Section number pill */}
                        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/60 border border-gray-200/60 text-xs font-bold text-gray-600 mb-1">
                          Section {sec.sectionNumber}
                        </div>
                        {/* English title */}
                        <h4 className="font-bold text-gray-900 text-sm leading-snug">
                          {sec.title}
                        </h4>
                        {/* Kannada title */}
                        <p className="font-kannada text-xs text-maroon-700 mt-0.5 leading-snug">
                          {sec.titleKn}
                        </p>
                      </div>
                    </div>
                    <ChevronRight
                      size={16}
                      className="text-gray-400 group-hover:text-maroon-700 group-hover:translate-x-0.5 transition-all shrink-0 mt-1"
                    />
                  </div>

                  {/* Summary */}
                  <p className="mt-3 text-xs text-gray-600 leading-relaxed line-clamp-2 ml-14">
                    {sec.summary}
                  </p>

                  {/* Footer */}
                  <div className="mt-3 ml-14 flex items-center justify-between text-xs">
                    <span className="text-maroon-700 font-bold">
                      {sec.topicCount} Topics
                    </span>
                    <span className="text-gold-600 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Open <ChevronRight size={12} />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
