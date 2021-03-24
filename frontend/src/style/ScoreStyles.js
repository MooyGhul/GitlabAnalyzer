import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card1: { 
    backgroundColor: "rgb(227,228,254)",
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
    justifyContent: "space-evenly",
  },
  title: {
    fontWeight: "bold",
    [theme.breakpoints.up("lg")]: {
      margin: "2vh 0 2vh 0",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.0rem",
    },
    fontSize: "1.2rem",
  },
  values: {
    display: "flex",
    margin: "3vh 0 3vh 0",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.0rem",
    },
    fontSize: "1.4rem",
    justifyContent: "space-evenly",
  },
}));

export default useStyles;
