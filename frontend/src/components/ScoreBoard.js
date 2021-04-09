import axios from "axios";
import { useParams } from "react-router-dom";
import { Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import SearchIcon from "@material-ui/icons/Search";
import Scores from "../components/Scores";
import useStyles from "../style/ScoreBoardStyles"; 
import useClipboard from "react-use-clipboard";

const ScoreBoard = (props) => { 
  // const score_summary = "Total commit score: " + commitCount + "; Total MR score: " + mergeRequestCount + "; " 
  // const [isCopied, setCopied] = useClipboard(score_summary);
  const classes = useStyles(props); 
  const [commits, setCommits] = useState([]);
  const [MRs, setMRs] = useState([]);
  const [comments, setComments] = useState([]);
  const [issues, setIssues] = useState([]);
  const { project_id, member_id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      let mrUrl = `/project/${project_id}/member/${member_id}/merge_requests`;
      let commitUrl = `/project/${project_id}/member/${member_id}/commits`;
      let commentUrl = `/project/${project_id}/${member_id}/comments`;
      let issueUrl = `/project/${project_id}/${member_id}/issues`;

      if(process.env.NODE_ENV === 'development') {
        mrUrl = `${process.env.REACT_APP_DEVHOST}/project/${project_id}/member/${member_id}/merge_requests`
        commitUrl = `${process.env.REACT_APP_DEVHOST}/project/${project_id}/member/${member_id}/commits`
        commentUrl = `${process.env.REACT_APP_DEVHOST}/project/${project_id}/member/${member_id}/comments`;
        issueUrl = `${process.env.REACT_APP_DEVHOST}/project/${project_id}/member/${member_id}/issues`;
      }
      const mrData = await axios.get(mrUrl);
      const commitData = await axios.get(commitUrl);
      const commentData = await axios.get(commentUrl);
      const issueData = await axios.get(issueUrl);

      setMRs(mrData.data);
      setCommits(commitData.data);
      setComments(commentData.data);
      setIssues(issueData.data);
    };
    fetchData().then(() => {
      console.log("Obtained MR and Issue Counts");
    }).catch(() => {
      console.log("Failed to get counts");
    });
  }, [project_id, member_id]); 
  
  console.log("MRS ", MRs)
  console.log("Commits ", commits)
  

  return (
    <Grid container spacing={10} className={classes.scoreboardContainer}>
      <Grid item lg={6} md={6} sm={6} className={classes.cards}>       

        <Scores
          // mergeRequestCount={mergeRequestCount}
          // commitCount={commitCount}  
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
                // onClick={setCopied}                
              >
                
                Copy Scores <FileCopyIcon className={classes.icon} />
              </Button>
            </Grid>
          </Grid>
      </Grid>

 
  );
};

export default ScoreBoard;
