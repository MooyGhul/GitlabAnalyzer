import React,{useState} from "react";
import {Comments} from "../mockDataDir/mockCodeContri";
import {Contributions} from "../mockDataDir/mockGraphContri";
import {IssuesWordCount} from "../mockDataDir/MockIssues";
import Grid from '@material-ui/core/Grid';
import "react-datepicker/dist/react-datepicker.css";
import Calendar from "./Calendar";
import CodeContributionBarChart from './Charts/CodeContributionBarChart'; 
import CommentBarChart from './Charts/CommentBarChart';
import IssueBarChart from './Charts/IssueBarChart'
import { Typography } from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";

let contributions = Contributions;

const useStyles = makeStyles((theme) => ({
  graphTitle: {
      textAlign: 'center', 
      fontWeight: 'bold',
  },
}))

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

const Charts = () => {
    const [commentsData] = useState(Comments);
    const [contributionsData] = useState(contributions);
    const [issuesData] = useState(IssuesWordCount); 
    
    const [startDate, setStartDate] = useState(new Date('January 1, 2021 00:00:00'));
    const [endDate, setEndDate] = useState(new Date('Dec 31, 2021 00:00:00'));

    const handleStartDate = (newDate) => {setStartDate(newDate)};
    const handleEndDate = (newDate) => {setEndDate(newDate)};
    const styles = useStyles(); 

    let contributionsDataProp = contributionsData;
    let commentsDataProp = commentsData;
    let issuesDataProp = issuesData; 
    if(endDate && startDate){
      contributionsDataProp = filterData(contributionsData,startDate,endDate);
      commentsDataProp = filterData(commentsData,startDate,endDate);
      issuesDataProp = filterData(issuesData, startDate, endDate); 
    }
  
    return (
      <Grid container spacing={6}  direction="column">
        <Grid item xs={6} >
          <Calendar startDate={startDate} endDate={endDate} onStartDateChange={handleStartDate} onEndDateChange={handleEndDate}/>
        </Grid>
        <Grid container spacing={5} justify='center'>
          <Grid item xs={5}>
            <Typography variant="h5" className={styles.graphTitle}>Code Contribution</Typography>
            <CodeContributionBarChart data={contributionsDataProp}/>
          </Grid>
          <Grid item xs={5} >
            <Typography variant="h5" className={styles.graphTitle}>Comment Contribution</Typography>
            <CommentBarChart data={commentsDataProp}/>
          </Grid>
          <Grid item xs={5} >
            <Typography variant="h5" className={styles.graphTitle}>Issue Contribution</Typography>
            <IssueBarChart data={issuesDataProp}/>
          </Grid>
        </Grid>
      </Grid>
    );
}

export default Charts;