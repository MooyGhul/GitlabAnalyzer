import {Avatar, Grid, Typography, withStyles} from "@material-ui/core";
import React from "react";
import ScoreBoard from "./ScoreBoard";
import styles from "../style/BannerStyles";

const Banner = (props) => {
  const {classes} = props;
  return (
    <div className={classes.container}>
      <Grid container justify={'space-around'}>
        <Grid item className={classes.profile}>
          <Avatar alt="" src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png" className={classes.large}/>
          <Typography className={classes.details}>Batman</Typography>
        </Grid>

        <Grid item>
          <ScoreBoard />
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(Banner);
