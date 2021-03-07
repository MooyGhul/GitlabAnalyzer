import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card1: {
    backgroundColor: "#e4e3ff",
    marginTop: "2vh",
    [theme.breakpoints.up("lg")]: {
      width: "20vw",
      height: "80%",
      marginTop: "3vh",
    },
    [theme.breakpoints.down("md")]: {
      width: "35vw",
      height: "80%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "30vw",
      height: "80%",
    },
  },
  card2: {
    backgroundColor: "#e4e3ff",
    marginTop: "2vh",
    [theme.breakpoints.up("lg")]: {
      width: "20vw",
      height: "80%",
      marginTop: "3vh",
    },
    [theme.breakpoints.down("md")]: {
      width: "35vw",
      height: "80%",
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
    [theme.breakpoints.up("lg")]: {
      marginTop: "-2vh",
    },
    marginTop: "-4vh",
    marginBottom: "-2vh",
  },
  title: {
    fontWeight: "bold",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2rem",
    },
    fontSize: "1.4rem",
  },
  values: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2rem",
    },
    fontSize: "1.6rem",
    justifyContent: "space-evenly",
  },
}));

export default useStyles;
