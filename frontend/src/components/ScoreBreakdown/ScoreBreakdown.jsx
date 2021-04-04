import React from "react";
import {useParams} from "react-router";
import Grid from "@material-ui/core/Grid";
import Banner from "../Banner";
import Navbar from "../Navbar/Navbar";
import ScoreBreakdownNavbar from "./ScoreBreakdownNavbar";
import DayByDayTable from "./DayByDayTable/DayByDayTable";
import MergeRequestsTable from "./MergeRequestsTable/MergeRequestsTable";
import {useStyles} from "../../style/ScoreBreakdownStyles";

const ScoreBreakdown = (props) => {
  const { member_id, breakdown_type } = useParams();
  const classes = useStyles();

  return (
    <Grid container spacing={5} justify="center" alignItems="center">
      <Grid item xs={12}>
        <Grid item xs={12}>
          <Navbar />
        </Grid>
        <Grid item xs={12}>
          <Banner memberName={member_id} />
        </Grid>
      </Grid>
      <Grid item xs={12} align="center">
        <ScoreBreakdownNavbar/>
      </Grid>
      <Grid item className={classes.table}>
        {breakdown_type === 'day_by_day' && <DayByDayTable/>}
        {breakdown_type === 'merge_requests' && <MergeRequestsTable/>}
      </Grid>
    </Grid>
  );
};

export default ScoreBreakdown;
