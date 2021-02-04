import React,{useState} from "react";
import FileType from "../components/FileType";
import { StudentJS } from '../mockDataDir/mockJS';
import { StudentJava } from '../mockDataDir/mockJava';

export default function ScoreBoard () {

    const [language, setLanguage] = useState(['JS']);
    

    const handleFile = (newFile) => {setLanguage(newFile)};

    return (
        <div>
            <h1> ScoreBoard </h1>
            <p>Total Commit : {}</p>
            <p>Total MR : {}</p>
            <p>Total {language} Files : {}</p>
            <p>Total Score : {}</p>
            <div>
            
            <button >Change file Type   
            <FileType onChange={handleFile}/> 
            </button>
            <button >Configure weights</button> 
            </div>
            
        </div>
    );
}