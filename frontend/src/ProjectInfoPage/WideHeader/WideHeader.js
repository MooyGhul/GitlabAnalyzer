import React from 'react';  
import ProjectTitle from './ProjectTitle';
import styles from "./WideHeader.module.css"

function WideHeader() {
  
  return(
      
      <div className={styles.body}>      
        <ProjectTitle  
          projectTitle="Sudoku Solver"
          projectID="1234"
        />     
      </div>  
    );
}

export default WideHeader;