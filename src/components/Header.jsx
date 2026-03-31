import React from 'react';
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="header__logo">SF</div>
      <h1 className="header__title">StudyFlow</h1>
      <p className="header__subtitle">
        AI-powered study schedules, built around your life
      </p>
    </header>
  );
}
