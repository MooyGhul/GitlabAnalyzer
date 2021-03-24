import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card1: { 
    backgroundColor: "rgb(236,242,245)",
    height: "90%", 
    [theme.breakpoints.up("lg")]: {
      width: "35vw",  
    },
    [theme.breakpoints.down("md")]: {
      width: "30vw",
      fontSize:"10px"
    },
    [theme.breakpoints.down("sm")]: {
      width: "25vw",
      height: "80%",
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
      margin: "2vh 0 2vh 0",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.0rem",
    },
    fontSize: "1.0rem",
  },
  values: {
    display: "flex",
    margin: "3vh 0 3vh 1.5vw",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2rem",
    },
    fontSize: "1.0rem",
    justifyContent: "space-around",

  },
}));

export default useStyles;
