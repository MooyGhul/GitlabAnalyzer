import axios from "axios";
import { useParams } from "react-router-dom";
import { Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import SearchIcon from "@material-ui/icons/Search";
import Scores from "../components/Scores";
import useStyles from "../style/ScoreBoardStyles"; 

const ScoreBoard = (props) => {
  const [mergeRequestCount, setMergeRequestCount] = useState(0);
  const [commitCount, setCommitCount] = useState(0); 
  const classes = useStyles(props); 

  const { project_id, member_id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      let mrUrl = `/project/${project_id}/member/${member_id}/merge_requests`;
      let commitUrl = `/project/${project_id}/member/${member_id}/commits`;

      if(process.env.NODE_ENV === 'development') {
        mrUrl = `${process.env.REACT_APP_DEVHOST}/project/${project_id}/member/${member_id}/merge_requests`
        commitUrl = `${process.env.REACT_APP_DEVHOST}/project/${project_id}/member/${member_id}/commits`
      }
      const mergeRequests = await axios.get(mrUrl);
      const commits = await axios.get(commitUrl);
      setMergeRequestCount(mergeRequests.data.length);
      setCommitCount(commits.data.length);
    };
    fetchData().then(() => {
      console.log("Obtained MR and Issue Counts");
    }).catch(() => {
      console.log("Failed to get counts");
    });
  }, [project_id, member_id]);

  return (
    <Grid container spacing={10} className={classes.scoreboardContainer}>
      <Grid item lg={6} md={6} sm={6} className={classes.cards}>
        <Scores
          mergeRequestCount={mergeRequestCount}
          commitCount={commitCount}  
        />         
        </Grid>

        <Grid item lg={6} md={6} sm={6}>
          <Grid item className={classes.buttonContainer}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Score Breakdown <SearchIcon className={classes.icon} />
              </Button>
              
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

 
  );
};

export default ScoreBoard;
