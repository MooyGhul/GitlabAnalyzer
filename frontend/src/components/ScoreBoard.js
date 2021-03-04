import { Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import LanguageType from "../components/LanguageType";
import Scores from "../components/Scores";
import useStyles from "../style/ScoreBoardStyles";
import axios from "axios";

const ScoreBoard = (props) => {
  const [mergeRequestCount, setMergeRequestCount] = useState(0);
  const [commitCount, setCommitCount] = useState(0);

  const classes = useStyles(props);
  const [language, setLanguage] = useState("C++");

  useEffect(() => {
    const fetchData = async () => {
      const mergeRequests = await axios.get(
        "http://localhost:8080/project/2/merge_requests"
      );
      const commits = await axios.get(
        "http://localhost:8080/project/2/commits"
      );

      setMergeRequestCount(mergeRequests.data.length);
      setCommitCount(commits.data.length);
    };
    fetchData();
  }, []);

  const handleFile = (newLanguage) => {
    setLanguage(newLanguage);
  };

  return (
    <Grid container spacing={2} className={classes.root}>
      <Grid item md={6} sm={12}>
        <Scores
          mergeRequestCount={mergeRequestCount}
          commitCount={commitCount}
          language={language}
        />
      </Grid>

      <Grid item md={6} sm={12} className={classes.buttons}>
        <Grid item className={classes.button}>
          <LanguageType onChange={handleFile} />
        </Grid>

        <Grid item className={classes.button}>
          <Button variant="contained" color="primary">
            Configure weights
          </Button>
        </Grid>

        <Grid item className={classes.button}>
          <Button variant="contained" color="primary">
            Copy Scores
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ScoreBoard;
