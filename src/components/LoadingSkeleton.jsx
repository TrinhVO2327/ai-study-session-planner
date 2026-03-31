import React, { useState, useEffect } from 'react';
import './LoadingSkeleton.css';

const MESSAGES = [
  'Analyzing your subjects…',
  'Mapping out your week…',
  'Picking the best study techniques…',
  'Optimizing session lengths…',
  'Finalizing your plan…',
];

export default function LoadingSkeleton() {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % MESSAGES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="skeleton">
      <p className="skeleton__msg">{MESSAGES[msgIndex]}</p>

      <div className="skeleton__card">
        <div className="skeleton__bar skeleton__bar--title" />
        <div className="skeleton__bar skeleton__bar--text" />
        <div className="skeleton__bar skeleton__bar--text skeleton__bar--short" />
      </div>
      <div className="skeleton__card">
        <div className="skeleton__bar skeleton__bar--title" />
        <div className="skeleton__bar skeleton__bar--text" />
        <div className="skeleton__bar skeleton__bar--text skeleton__bar--short" />
      </div>
      <div className="skeleton__card">
        <div className="skeleton__bar skeleton__bar--title" />
        <div className="skeleton__bar skeleton__bar--text" />
      </div>
    </div>
  );
}
