import React, { useState, useEffect } from 'react';
import ScoreBoard from './components/ScoreBoard';
import { Student } from './mockInfo';


function App() {
  
  return (
    <div>

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
