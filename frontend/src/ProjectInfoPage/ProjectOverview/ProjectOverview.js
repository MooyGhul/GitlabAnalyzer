import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@material-ui/data-grid";
import { useHistory } from "react-router-dom";
import { useStyles } from "./ProjectOverviewStyle";

function ProjectOverview() {
  const location = useLocation();
  const projectID = location.state.id;
  const history = useHistory();
  const classes = useStyles();

  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `http://localhost:8080/project/${projectID}/members`
      );

      setData(result.data);
    };
    fetchData();
  }, [projectID]);

  const rows = [];

  for (var i = 0; i < data.length; i++) {
    var obj = {};
    obj["id"] = i;
    obj["studentID"] = data[i];
    rows.push(obj);
  }

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "studentID", headerName: "Student ID", width: 200 },
  ];

  const buttonClickHandler = (event) => {
    history.push("/overview");
  };

  return (
    <div className={classes.projectOverview}>
      
      {console.log(location.state.id)}

      <h3>Please select a student from the member list below.</h3>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        onRowClick={buttonClickHandler}
        className={classes.memberList}
      />
    </div>
  );
}

export default ProjectOverview;
