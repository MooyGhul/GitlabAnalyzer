import React, {useEffect} from "react";
import {useParams} from "react-router";
import Grid from "@material-ui/core/Grid";
import Banner from "../Banner";
import DayByDayTable from "./DayByDayTable/DayByDayTable";
import {useStyles} from "../../style/ScoreBreakdownStyles";
import axios from "axios";

const ScoreBreakdown = () => {
  const { project_id, member_id } = useParams();
  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      let commitUrl = `/project/${project_id}/member/${member_id}/commits`;

      if (process.env.NODE_ENV === "development") {
        commitUrl = `${process.env.REACT_APP_DEVHOST}/project/${project_id}/member/${member_id}/commits`;
      }

      const { data } = await axios.get(commitUrl);

      console.log(data)
    };

    fetchData();
  }, [project_id, member_id]);


  return (
    <Grid container spacing={5} justify="center" alignItems="center" className={classes.container}>
      <Grid item xs={12}>
        <Grid item xs={12}>
          <Banner memberName={member_id} />
        </Grid>
      </Grid>
      <Grid item className={classes.table}>
        <DayByDayTable/>
      </Grid>
    </Grid>
  );
};

export default ScoreBreakdown;
