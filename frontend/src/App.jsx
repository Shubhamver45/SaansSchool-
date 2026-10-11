import React, { useState } from 'react';
import { SaansSchoolPage } from './pages/SaansSchoolPage';
import './App.css';

export function App() {
  return (
    <div className="app-root saans-app-root">
      <main className="app-main-content">
        <SaansSchoolPage />
      </main>
    </div>
  );
}

export default App;