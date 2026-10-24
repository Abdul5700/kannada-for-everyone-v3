import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';
import { Onboarding } from './pages/Onboarding';
import { Dashboard } from './pages/Dashboard';
import { ClassOverview } from './features/curriculum/ClassOverview';
import { LessonDetail } from './features/lessons/LessonDetail';
import { Dictionary } from './features/dictionary/Dictionary';
import { TranslationLab } from './features/translation/TranslationLab';
import { VocabularyBuilder } from './features/vocabulary/VocabularyBuilder';
import { Grammar } from './features/grammar/Grammar';
import { Conversations } from './features/conversations/Conversations';
import { QuizArena } from './features/quizzes/QuizArena';
import { Homework } from './features/homework/Homework';
import { Reading } from './features/reading/Reading';
import { Progress } from './features/progress/Progress';
import { Settings } from './pages/Settings';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/onboarding" element={<Onboarding />} />
        
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="curriculum" element={<ClassOverview />} />
          <Route path="lessons/:lessonId" element={<LessonDetail />} />
          <Route path="dictionary" element={<Dictionary />} />
          <Route path="translation" element={<TranslationLab />} />
          <Route path="vocabulary" element={<VocabularyBuilder />} />
          <Route path="grammar" element={<Grammar />} />
          <Route path="conversations" element={<Conversations />} />
          <Route path="quiz" element={<QuizArena />} />
          <Route path="homework" element={<Homework />} />
          <Route path="reading" element={<Reading />} />
          <Route path="progress" element={<Progress />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
