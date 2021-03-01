import { Grid, withStyles } from "@material-ui/core";
import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import LanguageType from "../components/LanguageType";
import Scores from "../components/Scores";
import styles from "../style/ScoreBoardStyles";

const ScoreBoard = (props) => {
  const { classes } = props;
  const [language, setLanguage] = useState("C++");

  const handleFile = (newLanguage) => {
    setLanguage(newLanguage);
  };

  return (
    <Grid container spacing={2} className={classes.root}>
      <Grid item>
        <Scores language={language} />
      </Grid>
      <Grid item className={classes.buttons}>
        <Grid item className={classes.button}>
          <LanguageType onChange={handleFile} />
        </Grid>
        <Grid item className={classes.button}>
          <Button variant="contained" color="primary">
            Configure weights
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(ScoreBoard);
