import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { getLearnerProfile, setLearnerProfile } from '../utils/storage';
import { saveProfile } from '../utils/api';
import { ClassLevel } from '../types';

export const Settings: React.FC = () => {
  const profile = getLearnerProfile();
  const [classLevel, setClassLevel] = useState<ClassLevel>(profile?.classLevel || 'beginner');
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    if (!profile) return;
    const updated = { ...profile, classLevel };
    setLearnerProfile(updated);
    try {
      await saveProfile(updated);
    } catch (err) {
      console.error(err);
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all local progress? This cannot be undone.')) {
      localStorage.clear();
      window.location.href = '/onboarding';
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Platform Settings</h2>
        <p className="text-sm text-gray-600 mt-1">
          Manage your learner preferences, class target, and application data.
        </p>
      </div>

      <Card className="p-6 space-y-4 shadow-sm border-gold-200">
        <h3 className="font-bold text-gray-900">Curriculum & Learning Focus</h3>
        <p className="text-xs text-gray-600 leading-relaxed">
          Your learning track is set to <strong>Kannada Foundations (18 Core Modules)</strong>, covering Varnamale, Gunithakshara, Ottakshara, Numbers 1–100, Place Values, Arithmetic, and Vocabulary.
        </p>
      </Card>

      {/* About Box */}
      <Card className="p-6 space-y-3">
        <h3 className="font-bold text-gray-900">About the Project</h3>
        <p className="text-xs text-gray-600 leading-relaxed">
          <strong>Kannada for Everyone v3.0</strong> is an open-access language learning initiative built for the Kannada Digital Innovation Hackathon 2026. Powered by Google Gemini AI, modern web speech APIs, and curated Karnataka curriculum blueprints.
        </p>
        <div className="flex gap-2 pt-2">
          <Badge variant="maroon">Version 3.0.0</Badge>
          <Badge variant="green">Open Educational Platform</Badge>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="p-6 space-y-3 border-red-200 bg-red-50/20">
        <h3 className="font-bold text-red-900">Reset Learner Progress</h3>
        <p className="text-xs text-red-700">
          Clear local storage, bookmarks, quiz attempts, and restart onboarding.
        </p>
        <div>
          <Button variant="danger" size="sm" onClick={handleReset}>
            Reset All Records
          </Button>
        </div>
      </Card>
    </div>
  );
};
