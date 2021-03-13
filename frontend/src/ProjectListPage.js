<<<<<<< HEAD
import Header from "./components/Header";
import Button from "@material-ui/core/Button"; 
import { useHistory } from "react-router-dom";
import { DataGrid } from "@material-ui/data-grid";
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./style/projectList.module.css"; 
import {useStyles} from './style/ProjectListPageStyle'

function ProjectListPage(props) {
  const history = useHistory(); 
  const [errorMsg, setErrorMsg] = useState('');
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
=======
import React from 'react'; 
import Header from './components/Header';
import Button from '@material-ui/core/Button'; 
import ProjectList from './components/ProjectList';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import {Grid} from "@material-ui/core";

const useStyles = makeStyles({

    analyzeButton: {
      position: "absolute",
      top: "85%",
      left: "68%"
    },
    batchButton: {
      position: "absolute",
      top: "85%",
      left: "55%"
    },
  });

  function ProjectListPage() {
    const history = useHistory();
    const classes = useStyles();

    const buttonClickHandler = () => {
            history.push({
              pathname:'/projectInfo/' + 2,
              state: {id:2},
            });
    }

    return ( 
        <Grid container>
>>>>>>> origin/master

  let projectIdArray = [];

  const getValue = (e) => { 
    console.log(e.selectionModel);
    projectIdArray = e.selectionModel; 
    return projectIdArray;
  };

  const buttonClickHandler = (event) => {
    let projectName; 

    if (projectIdArray.length === 0) {
      setErrorMsg('You have not selected any projects!.');  
    } else if (projectIdArray.length === 1) {
      rows.forEach(project =>{
        if (project.id === parseInt(projectIdArray[0])){
          console.log(project.projectName)
          projectName = project.projectName
        }
    
      })

      history.push({
        pathname: "/projectInfo",
        state: { id: projectIdArray[0], projectName: projectName
            
<<<<<<< HEAD

        },
      });
    } else { 
      console.log("multiple projects have been selected ");
    }
  };   

 

  return (
    <div>
      <Header pageTitle="Project List" />
      
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
=======
          <ProjectList/>     
        
          <Button variant="contained" color="primary" className={classes.analyzeButton} onClick={buttonClickHandler}>
            Next
          </Button> 

          <Button variant="contained" color="secondary" className={classes.batchButton}>
            Batch Process
          </Button>    

        </Grid>
    );
  }
  
  export default ProjectListPage;
>>>>>>> origin/master
