import React from "react"; 
import useStyles from '../style/NoProjectSelectedStyle'
import icon from '../logo/embarrassed.png'


const ProjectNotSelected = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.body}>
            <img src={icon} alt="oops" className={classes.icon}/> 
            <h1 className={classes.errorMsg}>Oops! It looks like you have not selected any projects yet!<br></br>
            Please navigate to 'Projects' and select a project. </h1>
            


        </div>



    )
}

export default ProjectNotSelected