import React, { useState, useEffect } from 'react';
import ScoreBoard from './components/ScoreBoard';
import LoginForm from './components/LoginForm';
import { Student } from './mockInfo';

function App() {

  return (
    <div>
      <LoginForm />

      <ScoreBoard
        totalCommit={Student.totalCommit}
        TotalMR={Student.TotalMR}
        TotalJSFiles={Student.TotalJSFiles}
        TotalScore={Student.TotalScore}
      />

    </div>
  );
}

export default App;
