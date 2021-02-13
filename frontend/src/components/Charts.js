import React,{useState} from "react";
import BarChart from "./CommentContribution";
import StackedBarChart from "./CodeContribution";
import {Comments, MRDaily, CommitDaily} from "../mockDataDir/mockCodeContri";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const data1 = [
  {
    year: "2021-1-25",
    "MRDaily": 20,
    "CommitDaily": 5,
  },
  {
    year: "2021-1-26",
    "MRDaily": 12,
    "CommitDaily": 3,
  },
  {
    year: "2021-1-27",
    "MRDaily": 0,
    "CommitDaily": 0,
  },
  {
    year: "2021-1-28",
    "MRDaily": 16,
    "CommitDaily": 2,
  },
  {
    year: "2021-1-29",
    "MRDaily": 0,
    "CommitDaily": 1,
  },
  {
    year: "2021-1-30",
    "MRDaily": 0,
    "CommitDaily": 6,
  },
  {
    year: "2021-1-31",
    "MRDaily": 7,
    "CommitDaily": 0,
  },
  {
    year: "2021-2-1",
    "MRDaily": 0,
    "CommitDaily": 0,
  },
  {
    year: "2021-2-2",
    "MRDaily": 35,
    "CommitDaily": 2,
  },
  {
    year: "2021-2-3",
    "MRDaily": 2,
    "CommitDaily": 7,
  },
  {
    year: "2021-2-4",
    "MRDaily": 0,
    "CommitDaily": 3,
  },
  {
    year: "2021-2-5",
    "MRDaily": 1,
    "CommitDaily": 0,
  }
];

const allKeys = ["MRDaily", "CommitDaily"];

const colors = {
  "MRDaily": "green",
  "CommitDaily": "orange"
};

var getKeys = function(obj){
  var values = [];
  for(var value in obj){
    values.push(value);
  }
  return values;
}

export default function Charts () {

    const commentsData = Object.values(Comments);
    const extend = [0,Math.max(...commentsData)];
    // console.log(commentsData);


    const [keys, setKeys] = useState(allKeys);
    //const [data, setData] = useState([25,30,45,60,20,45,75]);
    const [data, setData] = useState(commentsData);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    console.log(startDate);
    console.log(endDate);
    


    return (
        <div>
          <br/>
          <br/>
          Start date:
            <DatePicker 
              selected={startDate} 
              onChange={date => setStartDate(date)} 
              dateFormat='MM/dd/yyyy'
              minDate={new Date()}
              filterDate={date => date.getDay() !== 6 && date.getDay !== 0}
              isClearable
              showYearDropdown
              scrollableMonthYearDropdown
            />
          <br />
           End date:
            <DatePicker 
              selected={endDate} 
              onChange={date => setEndDate(date)} 
              dateFormat='MM/dd/yyyy'
              minDate={new Date()}
              filterDate={date => date.getDay() !== 6 && date.getDay !== 0}
              isClearable
              showYearDropdown
              scrollableMonthYearDropdown
            />
          <br/>
          <br/>

          <BarChart data={data}/>
          <br/><br/><br/>
          <button onClick={()=>setData(data.map(value=>value+5))}>
              Incre 5
          </button>
          <button onClick={()=>setData(data.filter(value=>value<=35))}>
              Filter
          </button>

          <br/><br/><br/><br/><br/>
          
          <StackedBarChart data={data1} keys={keys} colors={colors} />
          
          <br/><br/>
          <div className="fields">
            {allKeys.map(key => (
              <div key={key} className="field">
                <input
                  id={key}
                  type="checkbox"
                  checked={keys.includes(key)}
                  onChange={e => {
                    if (e.target.checked) {
                      setKeys(Array.from(new Set([...keys, key])));
                    } else {
                      setKeys(keys.filter(_key => _key !== key));
                    }
                  }}
                />
                <label htmlFor={key} style={{ color: colors[key] }}>
                  {key}
                </label>
              </div>
            ))}
          </div>
        </div>
    );
}