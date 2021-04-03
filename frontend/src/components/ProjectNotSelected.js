import React from "react"; 
import useStyles from '../style/NoProjectSelectedStyle'


const ProjectNotSelected = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.body}>

            <p>No project selected</p>


        </div>



    )
}

export default ProjectNotSelected