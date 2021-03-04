import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.up("md")]: {
      marginTop: "22vh",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: "37vh",
    },
    backgroundColor: "#d1d0ff",
  },

  large: {
    height: "18vh",
    width: "18vh",
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
  },
}));

export default useStyles;
