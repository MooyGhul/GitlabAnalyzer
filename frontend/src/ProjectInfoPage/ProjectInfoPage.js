import Header from "../components/Header";
import WideHeader from "./WideHeader/WideHeader";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useHistory } from "react-router-dom";
import { useStyles } from "./ProjectInfoStyle";
import { useLocation } from "react-router-dom";
import Chart from "./StackedBarChart";

function ProjectInfoPage(props) {
  const location = useLocation();
  const projectID = location.state.id;
  const projectName = location.state.projectName;
  const history = useHistory();
  const classes = useStyles();

  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `http://localhost:8080/project/${projectID}/members`
      );

      setMembers(result.data);
    };
    fetchData();
  }, [projectID]);

  const rows = [];
  for (var i = 0; i < members.length; i++) {
    var obj = {};
    obj["id"] = i;
    obj["studentID"] = members[i];
    rows.push(obj);
  }

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "studentID", headerName: "Student ID", width: 200 },
    { field: "commits", headerName:"Total commits", width: 200},
    { field: "merge_requests", headerName: "Total MRs", width: 200},
    { field: "wordCountMR", headerName: "Review word(count)", width: 200},
    { field: "wordCountIssue", headerName: "Issue (word count)", width: 200},
  ];

  const buttonClickHandler = (event) => {
    history.push("/overview");
  };

  return (
    <div>
      <Header />
      <WideHeader id={projectID} projectName={projectName} />
 
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          onRowClick={buttonClickHandler}
          className={classes.memberList}
        /> 

<div className={classes.barChart}>
        <Chart member={members} projectID={projectID} />
      </div>
     
    </div>
  );
}

export default ProjectInfoPage;
