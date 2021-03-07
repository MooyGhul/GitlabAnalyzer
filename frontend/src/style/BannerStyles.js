import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.up("xl")]: {
      height: "25vh",
    },

    [theme.breakpoints.up("lg")]: {
      height: "25vh",
    },
    [theme.breakpoints.down("md")]: {
      height: "42vh",
    },
    [theme.breakpoints.down("sm")]: {
      height: "36vh",
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
