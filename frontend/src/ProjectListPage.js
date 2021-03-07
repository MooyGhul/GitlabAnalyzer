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

          <Header
            pageTitle="Project List"
          />   
            
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