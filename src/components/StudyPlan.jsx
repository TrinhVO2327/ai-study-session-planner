import React, { useRef } from 'react';
import { exportToPdf } from '../lib/exportPdf';
import './StudyPlan.css';

const DAY_COLORS = {
  Monday: '#c05e3c',
  Tuesday: '#b07328',
  Wednesday: '#2d7a50',
  Thursday: '#3262a1',
  Friday: '#7b4dab',
  Saturday: '#a64d79',
  Sunday: '#4a8585',
};

const TECHNIQUE_ICONS = {
  'active recall': '🧠',
  'spaced repetition': '🔄',
  pomodoro: '🍅',
  'mind map': '🗺️',
  'practice problem': '✏️',
  feynman: '💡',
  review: '📖',
  flashcard: '🃏',
  summariz: '📝',
};

function getIcon(technique) {
  if (!technique) return '📚';
  const lower = technique.toLowerCase();
  for (const [key, icon] of Object.entries(TECHNIQUE_ICONS)) {
    if (lower.includes(key)) return icon;
  }
  return '📚';
}

export default function StudyPlan({ plan }) {
  const contentRef = useRef(null);

  if (!plan) return null;

  const handleExport = () => {
    exportToPdf(contentRef.current, plan.title || 'Study Plan');
  };

  return (
    <section className="plan">
      <div className="plan__header">
        <h2 className="plan__title">{plan.title || 'Your Study Plan'}</h2>
        <button className="btn-export" onClick={handleExport}>
          ↓ Export PDF
        </button>
      </div>

      <div ref={contentRef} className="plan__content">
        {plan.summary && <p className="plan__summary">{plan.summary}</p>}

        <div className="plan__days">
          {plan.weeklyPlan?.map((day, dayIndex) => (
            <div
              key={day.day}
              className="day-card"
              style={{
                borderLeftColor: DAY_COLORS[day.day] || 'var(--accent)',
                animationDelay: `${dayIndex * 0.08}s`,
              }}
            >
              <h3
                className="day-card__title"
                style={{ color: DAY_COLORS[day.day] || 'var(--accent)' }}
              >
                {day.day}
              </h3>

              <div className="day-card__sessions">
                {day.sessions?.map((session, i) => (
                  <div
                    key={i}
                    className={`session ${i < day.sessions.length - 1 ? 'session--bordered' : ''}`}
                  >
                    <span className="session__time">{session.time}</span>
                    <div className="session__details">
                      <div>
                        <strong>{session.subject}</strong>
                        {session.topic && (
                          <span className="session__topic">
                            {' — '}
                            {session.topic}
                          </span>
                        )}
                      </div>
                      {session.activity && (
                        <p className="session__activity">{session.activity}</p>
                      )}
                      {session.technique && (
                        <span className="session__technique">
                          {getIcon(session.technique)} {session.technique}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {plan.tips?.length > 0 && (
          <div className="tips-box">
            <h3 className="tips-box__title">💡 Study Tips</h3>
            <div className="tips-box__list">
              {plan.tips.map((tip, i) => (
                <div key={i} className="tip-item">
                  <span className="tip-item__num">{i + 1}</span>
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
