import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  buttons: {
    [theme.breakpoints.up("md")]: {
      marginTop: "80px",
      marginLeft: "0px",
    },
    marginLeft: "80px",
    display: "flex",
    justify: "space-between",
  },

  button: {
    margin: "15px",
  },
}));

export default useStyles;
