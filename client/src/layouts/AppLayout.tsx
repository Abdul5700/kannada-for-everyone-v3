import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  Home,
  GraduationCap,
  BookOpen,
  Languages,
  ArrowRightLeft,
  BookMarked,
  Sparkles,
  MessageCircle,
  Brain,
  ClipboardList,
  FileText,
  TrendingUp,
  Settings,
  Sparkle,
  Compass,
} from 'lucide-react';
import { checkHealth } from '../utils/api';

export const AppLayout: React.FC = () => {
  const [backendOnline, setBackendOnline] = React.useState<boolean>(false);
  const [aiProvider, setAiProvider] = React.useState<string>('mock');

  React.useEffect(() => {
    checkHealth()
      .then((res) => {
        setBackendOnline(res.success);
        setAiProvider(res.data?.aiProvider || 'mock');
      })
      .catch(() => setBackendOnline(false));
  }, []);

  const navSections = [
    {
      title: 'LEARNING TRACK',
      items: [
        { to: '/', label: 'Dashboard', icon: Home },
        { to: '/curriculum', label: '18 Foundations', icon: GraduationCap },
        { to: '/grammar', label: 'Grammar Studio', icon: BookOpen },
        { to: '/reading', label: 'Reading Library', icon: FileText },
      ],
    },
    {
      title: 'AI PRACTICE & TOOLS',
      items: [
        { to: '/dictionary', label: 'Bilingual Dictionary', icon: Languages },
        { to: '/translation', label: 'AI Translator', icon: ArrowRightLeft },
        { to: '/vocabulary', label: 'Vocabulary Builder', icon: BookMarked },
        { to: '/conversations', label: 'Daily Dialogues', icon: MessageCircle },
        { to: '/quiz', label: 'Quiz Arena', icon: Brain },
        { to: '/homework', label: 'Homework & Practice', icon: ClipboardList },
      ],
    },
    {
      title: 'ACCOUNT & STATS',
      items: [
        { to: '/progress', label: 'Learning Progress', icon: TrendingUp },
        { to: '/settings', label: 'Preferences', icon: Settings },
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9E8] text-[#282126]">
      {/* Top Header with Karnataka Yellow Accent Stripe */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E9DFD7] shadow-xs">
        <div className="h-1 bg-gradient-to-r from-[#8B1538] via-[#F5C400] to-[#8B1538] w-full" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            {/* Karnataka Yellow & Deep Maroon Brand Emblem */}
            <div className="w-10 h-10 rounded-xl bg-[#8B1538] border-2 border-[#F5C400] flex items-center justify-center text-[#F5C400] font-kannada font-bold text-2xl shadow-sm shadow-[#8B1538]/30">
              ಕ
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-extrabold text-[#8B1538] tracking-tight leading-none">
                  Kannada for Everyone
                </h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FFF9C7] text-[#8B1538] border border-[#F5C400]/80 tracking-wider">
                  v3.0
                </span>
              </div>
              <p className="text-xs text-[#71656A] font-medium mt-0.5">
                ಕನ್ನಡ ಕಲಿಯಿರಿ • ಎಲ್ಲರೊಂದಿಗೆ ಸಂಪರ್ಕಿಸಿ • Learn Kannada
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                backendOnline
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-[#FFF9C7] text-[#8B1538] border-[#F5C400]'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  backendOnline ? 'bg-emerald-500 animate-pulse' : 'bg-[#F5C400]'
                }`}
              />
              <span className="font-mono text-[11px] font-bold">
                {backendOnline
                  ? `AI: ${aiProvider.toUpperCase()}`
                  : 'CONNECTING...'}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container: Sidebar + Content */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex gap-7">
        {/* Desktop Sidebar: Deep Maroon Theme */}
        <aside className="hidden lg:block w-64 shrink-0">
          <nav className="bg-[#65102A] rounded-2xl border border-[#8B1538] p-3.5 shadow-md sticky top-24 space-y-5 text-white">
            {navSections.map((section, idx) => (
              <div key={idx} className="space-y-1">
                <p className="text-[10px] font-extrabold tracking-wider text-[#F5C400] px-3 pb-1 opacity-90">
                  {section.title}
                </p>
                {section.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.to === '/'}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 relative ${
                          isActive
                            ? 'bg-[#8B1538] text-white shadow-sm font-bold border-l-4 border-[#F5C400]'
                            : 'text-[#FFF9E8]/85 hover:bg-[#8B1538]/70 hover:text-white'
                        }`
                      }
                    >
                      <Icon size={16} className="text-[#F5C400]" />
                      <span>{item.label}</span>
                    </NavLink>
                  );
                })}
              </div>
            ))}
          </nav>
        </aside>

        {/* Dynamic Route View */}
        <main className="flex-1 min-w-0 pb-16 lg:pb-0">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#65102A] border-t border-[#8B1538] px-2 py-1.5 flex justify-around shadow-lg">
        {[
          { to: '/', label: 'Home', icon: Home },
          { to: '/curriculum', label: 'Foundations', icon: GraduationCap },
          { to: '/dictionary', label: 'Dict', icon: Languages },
          { to: '/translation', label: 'Translate', icon: ArrowRightLeft },
          { to: '/quiz', label: 'Quiz', icon: Brain },
          { to: '/progress', label: 'Progress', icon: TrendingUp },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 text-[10px] font-semibold p-1.5 rounded-lg transition-colors ${
                  isActive
                    ? 'text-[#F5C400] font-bold bg-[#8B1538]'
                    : 'text-[#FFF9E8]/75 hover:text-white'
                }`
              }
            >
              <Icon size={18} className="text-[#F5C400]" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <footer className="mt-auto border-t border-[#E9DFD7] bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-[#71656A] space-y-1">
          <p className="font-semibold text-[#8B1538]">
            Kannada for Everyone v3.0 • Karnataka EdTech Learning Platform
          </p>
          <p className="font-kannada text-[#71656A] text-[13px]">
            ಕನ್ನಡ ಕಲಿಯಿರಿ • ಎಲ್ಲರೊಂದಿಗೆ ಸಂಪರ್ಕಿಸಿ • ಹೆಮ್ಮೆಯಿಂದ ಮಾತಾಡಿ
          </p>
        </div>
      </footer>
    </div>
  );
};
