import Header from "./components/Header";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { DataGrid } from "@material-ui/data-grid";
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./style/projectList.module.css";

const useStyles = makeStyles({
  analyzeButton: {
    position: "absolute",
    top: "85%",
    left: "68%",
  },
  batchButton: {
    position: "absolute",
    top: "85%",
    left: "55%",
  },
});

function ProjectListPage(props) {
  const history = useHistory();
  const classes = useStyles();

  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "projectName", headerName: "Project Name", width: 400 },
  ];

  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:8080/project/all");

      setData(result.data);
    };
    fetchData();
  }, []);

  const rows = data.map((project) => ({
    id: project.repoId,
    projectName: project.repoName,
  }));

  let projectIdArray = [];

  const getValue = (e) => { 
    console.log(e.selectionModel);
    projectIdArray = e.selectionModel; 
    return projectIdArray;
  };

  const buttonClickHandler = (event) => {
    
    if (projectIdArray.length === 0) {
      console.log("Please select a project.");
      console.log(projectIdArray);
    } else if (projectIdArray.length === 1) {
      history.push({
        pathname: "/projectInfo",
        state: { id: projectIdArray[0] },
      });
    } else { 
      console.log("multiple projects have been selected ");
    }
  };

  return (
    <div>
      <Header pageTitle="Project List" />
      <div className={styles.projectList}>
        <div style={{ display: "flex", height: "100%" }}>
          <div style={{ flexGrow: 2 }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              checkboxSelection
              onSelectionModelChange={(e) => getValue(e)}
            />
          </div>
        </div>
      </div>

      <Button
        variant="contained"
        color="primary"
        className={classes.analyzeButton}
        onClick={buttonClickHandler}
      >
        Next
      </Button>

      <Button
        variant="contained"
        color="secondary"
        className={classes.batchButton}
      >
        Batch Process
      </Button>
    </div>
  );
}

export default ProjectListPage;
