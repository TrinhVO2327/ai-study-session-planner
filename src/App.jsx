import React, { useState } from 'react';
import Header from './components/Header';
import StudyForm from './components/StudyForm';
import StudyPlan from './components/StudyPlan';
import LoadingSkeleton from './components/LoadingSkeleton';
import { generateStudyPlan } from './lib/gemini';
import { savePlan } from './lib/supabase';
import './App.css';

export default function App() {
  const [plan, setPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async (formData) => {
    setIsLoading(true);
    setError(null);
    setPlan(null);

    try {
      const result = await generateStudyPlan(formData);
      setPlan(result);

      // Save to Supabase in background (non-blocking)
      savePlan({ ...formData, planJson: result }).catch(() => {});
    } catch (err) {
      console.error(err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      {/* Decorative background blobs */}
      <div className="bg-blob bg-blob--1" />
      <div className="bg-blob bg-blob--2" />

      <Header />
      <StudyForm onSubmit={handleGenerate} isLoading={isLoading} />

      {error && (
        <div className="error-box" style={{ animation: 'fadeIn 0.3s ease' }}>
          <strong>Error: </strong>
          {error}
        </div>
      )}

      {isLoading && <LoadingSkeleton />}
      {!isLoading && <StudyPlan plan={plan} />}

      <footer className="app-footer">
        <p>
          Built with React + Gemini AI + Supabase
        </p>
      </footer>
    </div>
  );
}
