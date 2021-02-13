import React from 'react'; 
import Header from './components/Header';
import Button from '@material-ui/core/Button'; 
import ProjectList from './components/ProjectList';
import styles from "./style/projectListPage.module.css"

function ProjectListPage(props) {
    
    return (
      <div>
        <Header
          pageTitle="Project Lists"
        />   
        
        <ProjectList/>     

        <Button variant="contained" color="primary" className={styles.startAnalysisButton}>
          Start Analysis
        </Button>

        <Button variant="contained" color="secondary" className={styles.batchProcessButton}>
          Batch Process
        </Button> 

      </div>
    );
  }
  
  export default ProjectListPage;