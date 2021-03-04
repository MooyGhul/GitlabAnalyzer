import { Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import LanguageType from "../components/LanguageType";
import Scores from "../components/Scores";
import useStyles from "../style/ScoreBoardStyles";
import axios from "axios";
import {useParams} from "react-router-dom";

const ScoreBoard = (props) => {
  const [mergeRequestCount, setMergeRequestCount] = useState(0);
  const [commitCount, setCommitCount] = useState(0);

  const classes = useStyles(props);
  const [language, setLanguage] = useState("C++");

  const {project_id} = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const mergeRequests = await axios.get(
        "http://localhost:8080/project/" + project_id + "/merge_requests"
      );
      const commits = await axios.get(
        "http://localhost:8080/project/" + project_id + "/commits"
      );
      setMergeRequestCount(mergeRequests.data.length);
      setCommitCount(commits.data.length);
    };
    fetchData();
  }, [project_id]);

  const handleFile = (newLanguage) => {
    setLanguage(newLanguage);
  };

  return (
    <Grid container spacing={2}>
      <Grid item md={6} sm={6}>
        <Scores
          mergeRequestCount={mergeRequestCount}
          commitCount={commitCount}
          language={language}
        />
      </Grid>

      <Grid item md={6} sm={6}>
        <Grid item className={classes.buttons}>
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

        <Grid item className={classes.button}>
          <LanguageType onChange={handleFile} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ScoreBoard;
