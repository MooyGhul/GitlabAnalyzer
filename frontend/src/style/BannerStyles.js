import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor:"rgb(208,209,253,0.7)",
    position: "absolute",
    width:"100%",  
    [theme.breakpoints.up("lg")]: {
      height: "30vh", 
    },
    [theme.breakpoints.down("md")]: {
      height: "25vh", 
    },
    [theme.breakpoints.down("sm")]: {
      height: "20vh", 
    }, 
  },

  large: {
    height: "18vh",
    width: "18vw",
  },

  profile: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10px",
  },

  details: {
    fontSize: "35px",
    position: "relative",
    left: "20%",
    marginBottom:"3vh",
    fontWeight:"bold"
  },
}));

export default useStyles;
