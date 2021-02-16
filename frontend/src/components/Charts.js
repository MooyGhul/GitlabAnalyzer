import React,{useState} from "react";
import BarChart from "./CommentContribution";
import StackedBarChart from "./CodeContribution";
import {Comments} from "../mockDataDir/mockCodeContri";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

let contributions = [
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
  "MRDaily": "#66c2a5",
  "CommitDaily": "#a6d854"
};

var getKeys = function(obj){
  var values = [];
  for(var value in obj){
    values.push(value);
  }
  return values;
}

const filterData = (data,startDate,endDate) => {
  return data.filter(function(currData){
    console.log(currData.year.split("-"));
    const currYear =parseInt(currData.year.split("-")[0]);
    const currMonth = parseInt(currData.year.split("-")[1]);
    const currDate =  parseInt(currData.year.split("-")[2]);
    return (
      currYear>startDate.getFullYear() ||
    (currYear===startDate.getFullYear() &&
    (currMonth > startDate.getMonth()+1  ||
    (currMonth===startDate.getMonth()+1  &&
    currDate>=startDate.getDate())))
    )&&
    (
      currYear<endDate.getFullYear() ||
    (currYear===endDate.getFullYear() &&
    (currMonth < endDate.getMonth()+1  ||
    (currMonth===endDate.getMonth()+1  &&
    currDate<=endDate.getDate())))
    );
  });
};

export default function Charts () {
    const [keys, setKeys] = useState(allKeys);
    const [commentsData] = useState(Comments);
    const [contributionsData] = useState(contributions);
    
    const [startDate, setStartDate] = useState(new Date('January 1, 2020 00:00:00'));
    const [endDate, setEndDate] = useState(new Date('Dec 31, 2025 00:00:00'));

    let contributionsDataProp = contributionsData;
    let commentsDataProp = commentsData;
    if(endDate && startDate){
      contributionsDataProp = filterData(contributionsData,startDate,endDate);
      commentsDataProp = filterData(commentsData,startDate,endDate);
    }
 
    return (
        <div>
          <br/>
          <br/>
          Start date:
            <DatePicker 
              selected={startDate} 
              onChange={date => setStartDate(date)} 
              dateFormat='MM/dd/yyyy'
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
              minDate={startDate}
              filterDate={date => date.getDay() !== 6 && date.getDay !== 0}
              isClearable
              showYearDropdown
              scrollableMonthYearDropdown
            />
          <br/>
          <br/>
          Comment Contribution
          <br/>
          <br/>
          <BarChart commentsDataProp={commentsDataProp}/>

          <br/><br/><br/>
          Code Contribution
          <br/><br/>
          
          <StackedBarChart contributionsDataProp={contributionsDataProp} keys={keys} colors={colors} />
          
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