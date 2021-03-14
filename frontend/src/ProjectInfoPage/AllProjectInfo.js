import React, { useState, useEffect } from "react";
import axios from "axios";
import StackedBarChart from "./StackedBarChart";
import { useStyles } from "./AllProjectInfoStyle";
import { DataGrid } from "@material-ui/data-grid";
import { useHistory } from "react-router-dom";

function AllProjectInfo(props) {
  const classes = useStyles();
  const [commits, setCommits] = useState([]);
  const [MRs, setMRs] = useState([]);
  const history = useHistory();
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

  const rows = [];
  for (var i = 0; i < members.length; i++) {
    var obj = {};
    obj["id"] = i;
    obj["studentID"] = members[i];
    obj["commits"] = commitsArray[i];
    obj["merge_requests"] = MRsArray[i];
    obj["wordCountMR"] = "Not Implemented";
    obj["wordCountIssue"] = "Not Implemented";
    rows.push(obj);
  }

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "studentID", headerName: "Student ID", width: 200 },
    { field: "commits", headerName: "Total commits", width: 230 },
    { field: "merge_requests", headerName: "Total MRs", width: 200 },
    { field: "wordCountMR", headerName: "Review (words)", width: 250 },
    { field: "wordCountIssue", headerName: "Issue (words)", width: 250 },
  ];

  const buttonClickHandler = (e) => {
    console.log(e.row.id);
    history.push("/overview/" + projectID + "/" + e.row.id);
  };

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
      <div className={classes.memberList}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          onRowClick={(e) => buttonClickHandler(e)}
        />
      </div>
    </div>
  );
}
export default AllProjectInfo;
