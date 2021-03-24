import { Grid, Typography } from "@material-ui/core";
import React from "react";
import ScoreBoard from "./ScoreBoard";
import useStyles from "../style/BannerStyles";

const Banner = (props) => {
  const { memberName } = props;
  const classes = useStyles();

  return (
    <Grid container justify={"space-evenly"} className={classes.container}>
      <Grid item md={12} sm={12} className={classes.profile}>
        <Typography className={classes.details}>
          {memberName ? memberName : "Name Unavailable"}
        </Typography>
      </Grid>
      <Grid item md={8} sm={8} >
        <ScoreBoard />
      </Grid>
    </Grid>
  );
};

export default Banner;
