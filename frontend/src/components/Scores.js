import React from "react";
import { Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import { CardContent, Divider } from "@material-ui/core";
import useStyles from "../style/ScoreStyles"; 

const Scores = (props) => {
  let { mergeRequestCount, commitCount } = props;
  const classes = useStyles(props); 

  return (
    <Grid container spacing={2}>
      <Grid item lg={6} md={12} sm={12}>
        <Card className={classes.card1}>
          <CardContent>
            <section className={classes.titles}>
              <p className={classes.title}>Total Commit</p>
              <p className={classes.title}>Total MR</p>
              <p className={classes.title}>Comments</p>
              <p className={classes.title}>Issues</p>
            </section>
            <Divider />
            <section className={classes.values}>
              <p>{commitCount ? commitCount : "N/A"}</p>
              <p>{mergeRequestCount ? mergeRequestCount : "N/A"}</p>
              <p>{commitCount ? commitCount : "N/A"}</p>
              <p>{mergeRequestCount ? mergeRequestCount : "N/A"}</p>
            </section>
          </CardContent>
        </Card>
      </Grid>
 
    </Grid>
  );
};

export default Scores;
