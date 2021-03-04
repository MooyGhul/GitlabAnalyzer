import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#e4e3ff",
    marginRight: "20px",
    height: "90%"
  },
  titles: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  title: {
    fontWeight: "bold",
    fontSize: "1.4rem"
  },
  values: {
  display: "flex",
  fontSize: "1.6rem",
  justifyContent: "space-evenly",
  }
}));

export default useStyles;
