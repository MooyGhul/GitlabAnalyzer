import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "500px",
    backgroundColor: "#e4e3ff",
  },
  titles: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  title: {
    fontWeight: "bold",
  },
}));

export default useStyles;
