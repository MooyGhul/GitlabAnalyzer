import React from 'react'; 
import Header from './components/Header';
import Button from '@material-ui/core/Button'; 
import ProjectList from './components/ProjectList';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

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

  function ProjectListPage(props) {
    const history = useHistory();
    const classes = useStyles();

    const buttonClickHandler = event => {
            history.push('/projectInfo');
    }

    return ( 
        <div>    

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

        </div> 
    );
  }
  
  export default ProjectListPage;