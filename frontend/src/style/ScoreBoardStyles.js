import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  buttons: {
    [theme.breakpoints.up("md")]: {
      marginTop: "5vh",
    },
    [theme.breakpoints.down("md")]: {
      marginTop: "12vh",
      marginLeft: "0px",
    },
    display: "flex",
    justify: "space-between",
  },
  button: {
    margin: "5px",
  },
}));

export default useStyles;
