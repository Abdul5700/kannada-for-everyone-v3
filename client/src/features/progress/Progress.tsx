import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { getProgress, getQuizHistory } from '../../utils/api';
import { getLearnerId, getCompletedLessons } from '../../utils/storage';
import { LearnerStats } from '../../types';
import { Award, CheckCircle2, TrendingUp, Flame, Calendar } from 'lucide-react';

export const Progress: React.FC = () => {
  const [stats, setStats] = useState<LearnerStats | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lid = getLearnerId();
    setCompletedLessons(getCompletedLessons());

    Promise.all([getProgress(lid), getQuizHistory(lid)])
      .then(([progRes, histRes]) => {
        setStats(progRes.stats);
        setHistory(histRes || []);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          My Learning Analytics & Records
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Review your verified quiz history, completed curriculum modules, and study consistency.
        </p>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-5">
          <div className="w-10 h-10 rounded-xl bg-maroon-100 text-maroon-700 flex items-center justify-center mb-2">
            <CheckCircle2 size={20} />
          </div>
          <p className="text-xs text-gray-500 font-medium">Completed Lessons</p>
          <h4 className="text-2xl font-bold text-gray-900 mt-1">
            {stats?.lessonsCompleted || completedLessons.length}
          </h4>
        </Card>

        <Card className="p-5">
          <div className="w-10 h-10 rounded-xl bg-gold-100 text-gold-700 flex items-center justify-center mb-2">
            <Award size={20} />
          </div>
          <p className="text-xs text-gray-500 font-medium">Total Quiz Points</p>
          <h4 className="text-2xl font-bold text-gray-900 mt-1">
            {stats?.totalPoints || 0}
          </h4>
        </Card>

        <Card className="p-5">
          <div className="w-10 h-10 rounded-xl bg-green-100 text-green-700 flex items-center justify-center mb-2">
            <Flame size={20} />
          </div>
          <p className="text-xs text-gray-500 font-medium">Active Streak</p>
          <h4 className="text-2xl font-bold text-gray-900 mt-1">
            {stats?.streakDays || 1} Days
          </h4>
        </Card>

        <Card className="p-5">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-2">
            <TrendingUp size={20} />
          </div>
          <p className="text-xs text-gray-500 font-medium">Quiz Attempts</p>
          <h4 className="text-2xl font-bold text-gray-900 mt-1">
            {stats?.quizAttempts || 0}
          </h4>
        </Card>
      </div>

      {/* Recent Quiz Sessions Table */}
      <Card className="p-6 space-y-4 shadow-sm border-gold-200">
        <h3 className="font-bold text-gray-900 text-base">
          Recent Quiz Sessions
        </h3>

        {history.length === 0 ? (
          <p className="text-xs text-gray-400 py-6 text-center italic">
            No quiz attempts recorded yet. Launch your first round in Quiz Arena!
          </p>
        ) : (
          <div className="divide-y divide-gray-100">
            {history.map((sess: any) => (
              <div
                key={sess.id}
                className="py-3 flex items-center justify-between text-sm"
              >
                <div>
                  <p className="font-semibold text-gray-800">
                    {sess.config?.topic || 'General Practice'}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(sess.startedAt).toLocaleDateString()} •{' '}
                    {sess.totalQuestions} Questions
                  </p>
                </div>
                <Badge
                  variant={
                    sess.score >= 80
                      ? 'green'
                      : sess.score >= 50
                      ? 'gold'
                      : 'gray'
                  }
                >
                  Score: {sess.score}%
                </Badge>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};
