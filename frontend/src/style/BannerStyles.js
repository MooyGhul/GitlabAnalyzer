import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.up("lg")]: {
      height: "25vh",
    },
    [theme.breakpoints.down("md")]: {
      height: "42vh",
    },
    [theme.breakpoints.down("sm")]: {
      height: "36vh",
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
