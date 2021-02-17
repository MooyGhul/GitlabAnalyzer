import React from 'react'; 
import Header from './components/Header';
import Button from '@material-ui/core/Button'; 
import ProjectList from './components/ProjectList';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter } from 'react-router-dom';
 
const useStyles = makeStyles({

    analyzeButton: {
      position: "absolute",
      top: "85%",
      left: "65%"
    },
    batchButton: {
      position: "absolute",
      top: "85%",
      left: "55%"
    },
  });

  function ProjectListPage(props) { 
    const classes = useStyles();
    return (
      <BrowserRouter>
        <div>    

          <Header
            pageTitle="Project List"
          />   
            
          <ProjectList/>     
        
          <Button variant="contained" color="primary" className={classes.analyzeButton}>
            Start Analysis
          </Button> 

          <Button variant="contained" color="secondary" className={classes.batchButton}>
            Batch Process
          </Button>    

        </div>
      </BrowserRouter>
    );
  }
  
  export default ProjectListPage;