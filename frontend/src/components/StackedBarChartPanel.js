import React from 'react'; 

export default function StackedBarChartPanel(props){
  console.log("---------");
  console.log(props);
  console.log("---------");
  console.log(props.allKeys);
  console.log("---------");
  return (
    props.allKeys.map(key => (
      <div key={key} className="field">
        {/* <input
          id={key}
          type="checkbox"
          checked={props.keys.includes(key)}
          onChange={e => {
            if (e.target.checked) {
              props.onKeyChange(Array.from(new Set([...props.keys, key])));
            } else {
              props.onKeyChange(props.keys.filter(_key => _key !== key));
            }
          }}
        />
        <label htmlFor={key} style={{ color: props.colors[key] }}>
          {key}
        </label>*/}
      </div> 
    ))
  );
}