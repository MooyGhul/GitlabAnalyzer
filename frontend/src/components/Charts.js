import React,{useState} from "react";
import BarChart from "./CommentContribution";
import StackedBarChart from "./CodeContribution";
import StackedBarChartPanel from "./StackedBarChartPanel";
import {Comments} from "../mockDataDir/mockCodeContri";
import Grid from '@material-ui/core/Grid';
import "react-datepicker/dist/react-datepicker.css";
import Calendar from "./Calendar";

let contributions = [
  {
    "year": "2021-1-25",
    "MRDaily": 20,
    "CommitDaily": 5,
  },
  {
    "year": "2021-1-26",
    "MRDaily": 12,
    "CommitDaily": 3,
  },
  {
    "year": "2021-1-27",
    "MRDaily": 0,
    "CommitDaily": 0,
  },
  {
    "year": "2021-1-28",
    "MRDaily": 16,
    "CommitDaily": 2,
  },
  {
    "year": "2021-1-29",
    "MRDaily": 0,
    "CommitDaily": 1,
  },
  {
    "year": "2021-1-30",
    "MRDaily": 0,
    "CommitDaily": 6,
  },
  {
    "year": "2021-1-31",
    "MRDaily": 7,
    "CommitDaily": 0,
  },
  {
    "year": "2021-2-1",
    "MRDaily": 0,
    "CommitDaily": 0,
  },
  {
    "year": "2021-2-2",
    "MRDaily": 35,
    "CommitDaily": 2,
  },
  {
    "year": "2021-2-3",
    "MRDaily": 2,
    "CommitDaily": 7,
  },
  {
    "year": "2021-2-4",
    "MRDaily": 0,
    "CommitDaily": 3,
  },
  {
    "year": "2021-2-5",
    "MRDaily": 1,
    "CommitDaily": 0,
  }
];

const allKeys = ["MRDaily", "CommitDaily"];

const colors = {
  "MRDaily": "#66c2a5",
  "CommitDaily": "#a6d854"
};

// This part will be replaced when backend data is retrieved.
// Now I dont know what type of data will provided. 
const filterData = (data,startDate,endDate) => {
  return data.filter(function(currData){
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
    
    const [startDate, setStartDate] = useState(new Date('January 1, 2021 00:00:00'));
    const [endDate, setEndDate] = useState(new Date('Dec 31, 2021 00:00:00'));

    const handleStartDate = (newDate) => {setStartDate(newDate)};
    const handleEndDate = (newDate) => {setEndDate(newDate)};
    const handleKeys = (newKey) => {setKeys(newKey)};

    let contributionsDataProp = contributionsData;
    let commentsDataProp = commentsData;
    if(endDate && startDate){
      contributionsDataProp = filterData(contributionsData,startDate,endDate);
      commentsDataProp = filterData(commentsData,startDate,endDate);
    }
  
    return (
      <Grid container spacing={6}  direction="column">
        <Grid item xs={6} >
          <Calendar startDate={startDate} endDate={endDate} onStartDateChange={handleStartDate} onEndDateChange={handleEndDate}/>
        </Grid>
        <Grid container spacing={5} >
          <Grid item xs={5} >
            <StackedBarChart startDate={startDate} endDate={endDate} contributionsDataProp={contributionsDataProp} keys={keys} colors={colors} />
          </Grid>
          <Grid item xs={5} >
            <BarChart className="charts" commentsDataProp={commentsDataProp}/>
          </Grid>
        </Grid>
        <Grid item xs={6} >
          <div className="fields">
            <StackedBarChartPanel colors={colors} keys={keys} allKeys={allKeys} onKeyChange={handleKeys} />
          </div>
        </Grid>
      </Grid>
    );
}