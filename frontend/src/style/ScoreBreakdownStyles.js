import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles({
  container: {
    position: "absolute",
    top: "0",
    left: "0"
  },
  table: {
    margin: "0 auto 0 auto",
    width: "90%",
  },
  banner: {
    background: "#d1d0ff",
    fontWeight: "bold",
    fontSize: "1.2rem",
  },
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  cell: {
    width: 300,
  },
});