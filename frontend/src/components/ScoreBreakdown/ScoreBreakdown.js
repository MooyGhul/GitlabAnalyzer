import React, {} from "react";
import {useParams} from "react-router";
import Grid from "@material-ui/core/Grid";
import Banner from "../Banner";
import Navbar from "../Navbar/Navbar";

const ScoreBreakdown = (props) => {
  const { member_id } = useParams();

  return (
    <Grid container spacing={5} justify="center" alignItems="center">
      <Grid item xs={12}>
        <Grid item xs={12}>
          <Navbar />
        </Grid>
        <Grid item xs={12}>
          <Banner memberName={member_id} type="commentContribution" />
        </Grid>
      </Grid>
      <p>???</p>
    </Grid>
  );
};

export default ScoreBreakdown;
