import { LearnerProfile } from '../types';

const PROFILE_KEY = 'kannada_v3_learner_profile';
const THEME_KEY = 'kannada_v3_theme';
const COMPLETED_KEY = 'kannada_v3_completed_lessons';

export const getLearnerProfile = (): LearnerProfile | null => {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(PROFILE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const setLearnerProfile = (profile: LearnerProfile): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
};

export const getLearnerId = (): string => {
  const p = getLearnerProfile();
  return p?.id || 'default';
};

export const getTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light';
  return (localStorage.getItem(THEME_KEY) as 'light' | 'dark') || 'light';
};

export const setTheme = (t: 'light' | 'dark'): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(THEME_KEY, t);
};

export const getCompletedLessons = (): string[] => {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(COMPLETED_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

export const addCompletedLesson = (id: string): void => {
  if (typeof window === 'undefined') return;
  const list = getCompletedLessons();
  if (!list.includes(id)) {
    list.push(id);
    localStorage.setItem(COMPLETED_KEY, JSON.stringify(list));
  }
};
