import React, { useState } from 'react';
import './StudyForm.css';

const INITIAL = {
  subjects: '',
  hoursPerDay: '',
  examDates: '',
  preferences: '',
};

export default function StudyForm({ onSubmit, isLoading }) {
  const [form, setForm] = useState(INITIAL);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  const isValid = form.subjects.trim() && form.hoursPerDay;

  return (
    <form onSubmit={handleSubmit} className="study-form">
      <h2 className="study-form__title">Plan your sessions</h2>

      <div className="study-form__grid">
        <div className="form-field">
          <label htmlFor="subjects">Subjects *</label>
          <input
            id="subjects"
            name="subjects"
            type="text"
            placeholder="e.g. Calculus, Organic Chemistry, US History"
            value={form.subjects}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="hoursPerDay">Hours per day *</label>
          <input
            id="hoursPerDay"
            name="hoursPerDay"
            type="number"
            min="1"
            max="16"
            placeholder="e.g. 4"
            value={form.hoursPerDay}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="examDates">Exam dates / deadlines</label>
        <input
          id="examDates"
          name="examDates"
          type="text"
          placeholder="e.g. Calc final May 12, Chem midterm Apr 28"
          value={form.examDates}
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <label htmlFor="preferences">Learning preferences</label>
        <textarea
          id="preferences"
          name="preferences"
          placeholder="e.g. I learn best in the morning, prefer active recall, need more time on chemistry…"
          value={form.preferences}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        className="btn-generate"
        disabled={!isValid || isLoading}
      >
        {isLoading ? (
          <>
            <span className="spinner" />
            Generating…
          </>
        ) : (
          'Generate Study Plan'
        )}
      </button>
    </form>
  );
}
