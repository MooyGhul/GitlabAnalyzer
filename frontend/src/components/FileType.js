import React,{useState} from "react";

export default function FileType (props) {
 
    const handleFile = (event)=>{
        props.onChange(event.target.value);
    };
    return (
        <div>
            <select 
                id="file-names"
                onChange={handleFile}
            >
            <option value="JS">JS</option>
            <option value="C++">C++</option>
            <option value="Java">Java</option>
            <option value="Python">Python</option>
            
            </select>
        </div>
    );
}