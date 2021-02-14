import React,{useState} from "react";
import BarChart from "./CommentContribution";
import StackedBarChart from "./CodeContribution";
import {Comments, MRDaily, CommitDaily} from "../mockDataDir/mockCodeContri";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

let data1 = [
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

export default function Charts () {

    //const commentsData = Object.values(Comments);
    //const extend = [0,Math.max(...commentsData)];
    // console.log(commentsData);


    const [keys, setKeys] = useState(allKeys);
    //const [data, setData] = useState([25,30,45,60,20,45,75]);
    const [data2, setData] = useState(Comments);
    
    console.log("data2 ORIGINAL:");
    data2.map(d => {
      console.log(d.year);
      return d.year;
    })
    
    //const [data, setData] = useState(commentsData);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    // if(startDate){
    //   console.log(startDate);
    //   console.log(startDate.getDate());
    //   console.log(startDate.getMonth()+1);
    //   console.log(startDate.getFullYear());
    // }

    // if(endDate){
    //   console.log(endDate);
    //   console.log(endDate.getDate());
    //   console.log(endDate.getMonth()+1);
    //   console.log(endDate.getFullYear());
    // }

    // console.log("2020-1-2".split("-"));

    // console.log("2020"<="2021");

    //let res = null;
    if(endDate && startDate){
    data1 = data1.filter(function(currData){
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
      }

    //console.log(res);

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
              minDate={new Date()}
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
          <BarChart data2={data2}/>

          <br/><br/><br/>
          Code Contribution
          <br/><br/>
          
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