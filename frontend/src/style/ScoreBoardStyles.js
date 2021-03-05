import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  buttons: {
    [theme.breakpoints.up("md")]: {
      marginTop: "5vh",
      marginLeft: "-60px"
    },
    [theme.breakpoints.down("md")]: {
      marginTop: "12vh",
      marginLeft: "0px",
      flexDirection: "column"
    },
    display: "flex",
    justify: "space-between",
  },
  language: {
    [theme.breakpoints.down("md")]: {
      margin: "5px"
    },
    margin: "5px 0 0 -55px",
  },
  button: {
    margin: "5px",
    height: "5vh",
    width: "23vh",
    display: "flex",
    justifyContent: "space-evenly",
  },
  icon: {
    backgroundColor: "#3f51b5",
  }
}));

export default useStyles;
