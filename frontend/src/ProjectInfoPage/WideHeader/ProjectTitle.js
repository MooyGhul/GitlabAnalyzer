import React from 'react'; 
 import styles from './ProjectTitle.module.css'

const ProjectTitle = (props) => {

    return (
    <div className={styles.projectTitle}>
        <h1>{props.projectTitle}</h1>
        <h3>Project ID: {props.projectID}</h3>
    </div>
    
    )
}

export default ProjectTitle;