import React from 'react'; 



export default function StackedBarChartPanel(props){
  const handleFile = (event,key)=>{
    console.log("event ===>");
    console.log(event);
    console.log("end of event");
    console.log(key);
    console.log("end of key");
    if (event.target.checked) {
      props.onKeyChange(Array.from(new Set([...props.keys, key])));
    } else {
      props.onKeyChange(props.keys.filter(_key => _key !== key));
    }
  };

  return (
    props.allKeys.map(key => (
      <div key={key}>
        <input
          id={key}
          type="checkbox"
          checked={props.keys.includes(key)}
          onChange={(event) => handleFile(event,key)}
        />

        <label htmlFor={key} style={{ color: props.colors[key] }}>
          {key}
        </label>
      </div> 
    ))
  );
}