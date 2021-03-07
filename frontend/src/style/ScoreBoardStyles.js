import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  buttons: {
    [theme.breakpoints.up("lg")]: {
      marginTop: "6vh",
      marginLeft: "20px",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: "12vh",
    },
    marginTop: "15vh",
    flexDirection: "column",
    marginLeft: "-80px",
    display: "flex",
    justify: "space-between",
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
  },
}));

export default useStyles;
