import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  buttons: {
    marginTop: "80px",
    display: "flex",
    flexDirection: "column",
    justify: "space-evenly",
  },

  button: {
    margin: "15px",
  },
}));

export default useStyles;
