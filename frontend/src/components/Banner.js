import {Grid, Typography} from "@material-ui/core";
import React from "react";
import ScoreBoard from "./ScoreBoard";
import useStyles from "../style/BannerStyles";

const Banner = (props) => {
  const { memberName, projectName } = props;
  const classes = useStyles();

  return (
    <div>
      <Typography className={classes.details}>
        {memberName ? memberName : "Name Unavailable"}/{projectName ? projectName: "Project Unknown"}
      </Typography>

      <Grid container justify={"space-evenly"} className={classes.container}>
      
        <Grid item md={8} sm={8}>
          <ScoreBoard />
        </Grid>
      </Grid>
    </div>
  );
};

export default Banner;
