import React from 'react'; 

/* 
// the fields StackedBarChartPanel is changed from the following tutorial:
// https://www.youtube.com/watch?v=bXN9anQN_kQ&list=PLDZ4p-ENjbiPo4WH7KdHjh_EMI7Ic8b2B&index=17
// the tutorial "Using React (Hooks) with D3 – [15] Stacked Bar Chart"
// This part will be refactored when using new chart library.
*/

export default function StackedBarChartPanel(props){
  return (
    props.allKeys.map(key => (
      <div key={key}>
        <input
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
        </label>
      </div> 
    ))
  );
}