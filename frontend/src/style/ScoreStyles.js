import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card1: {
    backgroundColor: "#e4e3ff",
    height: "90%",
    [theme.breakpoints.up("lg")]: {
      width: "20vw",
    },
    [theme.breakpoints.down("md")]: {
      width: "35vw",
    },
    [theme.breakpoints.down("sm")]: {
      width: "30vw",
      height: "80%",
    },
  },
  card2: {
    backgroundColor: "#e4e3ff",
    height: "90%",
    [theme.breakpoints.up("lg")]: {
      width: "17vw",
    },
    [theme.breakpoints.down("md")]: {
      width: "35vw",
    },
    [theme.breakpoints.down("sm")]: {
      width: "30vw",
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
      fontSize: "1.2rem",
    },
    fontSize: "1.4rem",
  },
  values: {
    display: "flex",
    margin: "3vh 0 3vh 0",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2rem",
    },
    fontSize: "1.6rem",
    justifyContent: "space-evenly",
  },
}));

export default useStyles;
