import React from "react";
import { StudentJS } from '../mockDataDir/mockJS';
import { StudentJava } from '../mockDataDir/mockJava';
import { StudentPython } from '../mockDataDir/mockPython';
import { StudentC } from '../mockDataDir/mockC';

export default function Scores ({language}) {
  let api = "";
  switch (language){
    case "Java":
      api = StudentJava;
      break;
    case "C++":
      api = StudentC;
      break;
    case "Python":
      api = StudentPython;
      break;
    case "JS":
      api = StudentJS;
      break;
    default:
  }

  return (
        <div>
            <h1> ScoreBoard </h1>
            <p>Total Commit : {api.totalCommit}</p>
            <p>Total MR : {api.TotalMR}</p>
            <p>Total {language} Files : {api.TotalFiles}</p>
            <p>Total Score : {api.TotalScore}</p>
        </div>
    );
}