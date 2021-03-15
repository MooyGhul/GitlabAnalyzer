import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  buttons: {
    [theme.breakpoints.up("lg")]: {
      marginTop: "4vh",
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
  cards: {
    marginTop: "4vh",
  },
  icon: {
    background: "none",
  },
}));

export default useStyles;
