import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";
import {DataGrid} from "@material-ui/data-grid";
import React, {useState, useEffect} from "react";
import axios from "axios";
import styles from "./style/projectList.module.css";
import {useStyles} from "./style/ProjectListPageStyle"; 
import useFullPageLoader from "./components/useFullPageLoader";

const ProjectListPage = (props) => {
  const history = useHistory();
  const [errorMsg, setErrorMsg] = useState("");
  const classes = useStyles();
  const [loader, showLoader, hideLoader] = useFullPageLoader(); 

  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "projectName", headerName: "Project Name", width: 400 },
  ];

  const [data, setData] = useState([]);
  useEffect(() => {
    showLoader();
    const fetchData = async () => {
      const result = await axios.get( process.env.NODE_ENV === 'development' ?
          `${process.env.REACT_APP_DEVHOST}/project/all`:
          "/project/all");
      setData(result.data);
    };
    fetchData().then(hideLoader());
    // eslint-disable-next-line
  }, [])
  

  const rows = data.map((project) => ({
    id: project.repoId,
    projectName: project.repoName,
  }));

  let projectIdArray = [];

  const getValue = (e) => {
    projectIdArray = e.selectionModel;
    return projectIdArray;
  };

  const buttonClickHandler = (event) => {
    let projectName;

    if (projectIdArray.length === 0) {
      setErrorMsg("You have not selected any projects!.");
    } else if (projectIdArray.length === 1) {
      rows.forEach((project) => {
        if (project.id === parseInt(projectIdArray[0])) {
          console.log(project.projectName);
          projectName = project.projectName;
        }
      });

      props.onProjectIdChange(projectIdArray[0]);

      history.push({
        pathname: "/projectInfo/" + projectIdArray[0],
        state: { id: projectIdArray[0], projectName: projectName },
      });
    } else {
      console.log("multiple projects have been selected ");
    }
  };

  return (
    <div>
      <div className={styles.projectList}>
        <div style={{ display: "flex", height: "100%", marginTop: "5%" }}>
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
      <h3 className={classes.errorMsg}>{errorMsg}</h3>

      <Button
        id="select-project"
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
      {loader}
    </div>
  
  );
}

export default ProjectListPage;
