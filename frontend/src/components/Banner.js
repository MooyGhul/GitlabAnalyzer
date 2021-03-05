import { Avatar, Grid, Typography } from "@material-ui/core";
import React from "react";
import ScoreBoard from "./ScoreBoard";
import useStyles from "../style/BannerStyles";

const Banner = (props) => {
  const { avatar_url, memberName } = props;
  const classes = useStyles();

  return (
    <Grid container justify={"space-evenly"} className={classes.container}>
      <Grid item md={4} sm={6} className={classes.profile}>
        <Avatar
          alt=""
          src={
            avatar_url
              ? avatar_url
              : "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png"
          }
          className={classes.large}
        />
        <Typography className={classes.details}>
          {memberName ? memberName : "Unavailable"}
        </Typography>
      </Grid>
      <Grid item md={8} sm={6}>
        <ScoreBoard />
      </Grid>
    </Grid>
  );
};

export default Banner;
