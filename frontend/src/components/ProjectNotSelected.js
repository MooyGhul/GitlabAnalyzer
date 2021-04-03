import React from "react"; 
import useStyles from '../style/NoProjectSelectedStyle'


const ProjectNotSelected = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.body}>

            <h1 className={classes.errorMsg}>No project selected</h1>


        </div>



    )
}

export default ProjectNotSelected