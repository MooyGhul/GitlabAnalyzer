import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card1: { 
    backgroundColor: "rgb(236,242,245)",
    height: "90%", 
    [theme.breakpoints.up("lg")]: {
      width: "30vw",  
    },
    [theme.breakpoints.down("md")]: {
      height:"50%",
      width: "30vw",
      fontSize:"10px"
    },
    [theme.breakpoints.down("sm")]: {
      width: "25vw",
      height: "20%",
      fontSize:"10px"
    },
  }, 

  titles: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  title: {
    fontWeight: "bold",
    [theme.breakpoints.up("lg")]: { 
      fontSize: "1.0rem",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.0rem",
    },
    fontSize: "1.0rem",
  },
  values: {
    display: "flex", 
    marginLeft: "20px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2rem",
    },
    fontSize: "1.0rem",
    justifyContent: "space-around",

  },
}));

export default useStyles;
