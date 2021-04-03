import { makeStyles } from "@material-ui/core"; 

const useStyles = makeStyles((theme) => ({
    body:{
        position: "absolute", 
        background: "white",    
        top:"0",
        left:"0",
        width:"100%",
        height:"100%"
    },

    errorMsg:{
        position: "absolute",
        top:"50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    },

    icon: {
        width:"20%",
        height: "auto",
    }
  }));

  export default useStyles;
  