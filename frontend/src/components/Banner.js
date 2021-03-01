import { Avatar, Grid, Typography, withStyles } from "@material-ui/core";
import React from "react";
import ScoreBoard from "./ScoreBoard";
import styles from "../style/BannerStyles";

const Banner = (props) => {
  const { classes, avatar_url, membername } = props;
  return (
    <Grid container justify={"space-evenly"} className={classes.container}>
      <Grid item md={6} sm={12} className={classes.profile}>
        <Avatar
          alt="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png"
          src={avatar_url}
          className={classes.large}
        />
        <Typography className={classes.details}>
          {membername ? membername : "Batman"}
        </Typography>
      </Grid>

      <Grid item md={6} sm={12}>
        <ScoreBoard />
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(Banner);
