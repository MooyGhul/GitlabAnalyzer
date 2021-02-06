import React from "react";

export default function LanguageType (props) {

    // TO DO :
    // When backend is ready, either GREY OUT "PLEASE CHOOSE LANGUAGE"
    // or calculate overall submission when ppl choose "PLEASE CHOOSE LANGUAGE"

    const handleFile = (event)=>{
        props.onChange(event.target.value);
    };
    return (
        <div>
            <select 
                id="language"
                onChange={handleFile}
            >
              <option value="Empty" >PLEASE CHOOSE LANGUAGE</option>
              <option value="JS">JS</option>
              <option value="C++">C++</option>
              <option value="Java">Java</option>
              <option value="Python">Python</option>
              
            </select>
        </div>
    );
}