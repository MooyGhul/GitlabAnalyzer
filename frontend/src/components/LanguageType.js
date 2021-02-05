import React from "react";

export default function LanguageType (props) {

    const handleFile = (event)=>{
        props.onChange(event.target.value);
    };
    return (
        <div>
            <select 
                id="language"
                onChange={handleFile}
            >
            <option >PLEASE CHOOSE LANGUAGE</option>
            <option value="JS">JS</option>
            <option value="C++">C++</option>
            <option value="Java">Java</option>
            <option value="Python">Python</option>
            
            </select>
        </div>
    );
}