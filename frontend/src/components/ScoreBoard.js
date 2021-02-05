import React,{useState} from "react";
import LanguageType from "../components/LanguageType";
import Scores from "../components/Scores";


export default function ScoreBoard () {

    const [language, setLanguage] = useState(['JS']);

    const handleFile = (newLanguage) => {setLanguage(newLanguage)};

    

    return (
        <div>
            <Scores language={language}/>
            <LanguageType onChange={handleFile}/> 
            <button >Configure weights</button>             
        </div>
    );
}