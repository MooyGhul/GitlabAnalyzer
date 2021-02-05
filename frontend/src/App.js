import React, { useState, useEffect } from 'react';
import ScoreBoard from './components/ScoreBoard';
import { Student } from './mockInfo';
import Header from './components/Header';

function App() {
  
  return (
    <div>
      <Header
        pageTitle="Overview"
      />

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
