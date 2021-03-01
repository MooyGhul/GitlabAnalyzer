import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#e4e3ff",
    marginRight: "20px",
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
