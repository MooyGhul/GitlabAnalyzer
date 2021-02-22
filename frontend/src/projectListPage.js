import React from 'react'; 
import Header from './components/Header';
import Button from '@material-ui/core/Button'; 
import ProjectList from './components/ProjectList';
import { makeStyles } from '@material-ui/core/styles'; 
import App from './App';
<<<<<<< HEAD
import ReactDOM from 'react-dom';
import UrlToken from './components/UrlToken';
=======
import ReactDOM from 'react-dom'; 
>>>>>>> c8fd7763b4318c2978a6e2fc993373c45cff4a45
 
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
    const classes = useStyles();

    const buttonClickHandler = event => {
        ReactDOM.render(
          <React.StrictMode>
              <App />
          </React.StrictMode>,
          document.getElementById('root')
      );
    }

    return ( 
        <div>    

          <Header
            pageTitle="Project List"
<<<<<<< HEAD
          />    
=======
          />   
>>>>>>> c8fd7763b4318c2978a6e2fc993373c45cff4a45
            
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