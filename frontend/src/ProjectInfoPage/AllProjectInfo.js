import React, { useState, useEffect } from "react";
import axios from "axios";
import StackedBarChart from "./StackedBarChart";
import { useStyles } from "./AllProjectInfoStyle";
import MemberList from "./MemberList";

function AllProjectInfo(props) {
  const classes = useStyles();
  const [commits, setCommits] = useState([]);
  const [MRs, setMRs] = useState([]);
  let members = props.member;
  let projectID = props.projectID;
  let commitsArray = [];
  let MRsArray = [];

  useEffect(() => {
    const fetchData = async () => {
      const commitData = await axios.get(
        `http://localhost:8080/project/${projectID}/commits`
      );

      setCommits(commitData.data);
    };
    fetchData();
  }, [projectID]);

  useEffect(() => {
    const fetchData = async () => {
      const mrData = await axios.get(
        `http://localhost:8080/project/${projectID}/merge_requests`
      );
      setMRs(mrData.data);
    };
    fetchData();
  }, [projectID]);

  members.forEach((member) => {
    let count = 0;
    commits.forEach((commit) => {
      if (member === commit.author) {
        count++;
      }
    });
    commitsArray.push(count);
  });

  members.forEach((member) => {
    let count = 0;
    MRs.forEach((MR) => {
      if (member === MR.author) {
        count++;
      }
    });
    MRsArray.push(count);
  });

  return (
    <div className={classes.body}>
      <div className={classes.barChart}>
        <StackedBarChart
          member={members}
          projectID={projectID}
          commitsArray={commitsArray}
          MRsArray={MRsArray}
        />
      </div>
      <MemberList
        members={members}
        commitsArray={commitsArray}
        MRsArray={MRsArray}
        projectID={projectID}
      ></MemberList>
    </div>
  );
}
export default AllProjectInfo;
