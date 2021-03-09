import axios from "axios";
import { useParams } from "react-router-dom";
import { Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import SearchIcon from "@material-ui/icons/Search";
import Scores from "../components/Scores";
import useStyles from "../style/ScoreBoardStyles";
import WeightDialog from "./WeightsDialog";

const ScoreBoard = (props) => {
  const [mergeRequestCount, setMergeRequestCount] = useState(0);
  const [commitCount, setCommitCount] = useState(0);
  const [weights, setWeights] = useState({ commitScore: 1, mrScore: 2, fileScore: 3 });
  const classes = useStyles(props);
  const [language, setLanguage] = useState("C++");

  const { project_id, member_id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const mergeRequests = await axios.get(
        `http://localhost:8080/project/${project_id}/member/${member_id}/merge_requests`
      );
      const commits = await axios.get(
        `http://localhost:8080/project/${project_id}/member/${member_id}/commits`
      );
      setMergeRequestCount(mergeRequests.data.length);
      setCommitCount(commits.data.length);
    };
    fetchData();
  }, [project_id, member_id]);

  const handleFile = (newLanguage) => {
    setLanguage(newLanguage);
  };

  return (
    <Grid container spacing={2}>
      <Grid item lg={8} md={8} sm={8}>
        <Scores
          mergeRequestCount={mergeRequestCount}
          commitCount={commitCount}
          language={language}
          onChange={handleFile}
        />
      </Grid>

      <Grid item lg={4} md={4} sm={4}>
        <Grid item className={classes.buttons}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Score Breakdown <SearchIcon className={classes.icon} />
            </Button>
          </Grid>
          <Grid item>
           <WeightDialog weights={weights} setWeights={setWeights}/>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Copy Scores <FileCopyIcon className={classes.icon} />
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ScoreBoard;
