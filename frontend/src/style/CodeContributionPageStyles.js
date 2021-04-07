import {makeStyles} from "@material-ui/core/styles";

export const useGraphStyles = makeStyles({
 
  graph: {
    width: "60vw",
    height: "30vh",
    margin: "20px 0 20px 0",
  },

  table: {
    margin: "0 auto 0 auto",
    width: "90%",
  },

  container:{
    position: "absolute",
    top:"0",
    left:"0"
  }
});

export const useTableStyles = makeStyles({
  banner: {
    background: "#d1d0ff",
    fontWeight: "bold",
    fontSize: "1.2rem",
  },
  expandBtn: {
    position: "fixed",
    bottom: "1vh",
    right: "1vw",
    backgroundColor: "#7553ff",
    width: "8%",
    color: "white"
  }
});

export const usePaginationStyle = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginRight: theme.spacing(65),
  },
  icons: {
    backgroundColor: "none",
  },
}));

export const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  cell: {
    width: 300,
  },
  mrIcon: {
    color: "white",
    background: "#fc8053",
  },
  cIcon: {
    color: "white",
    background: "#6179ff",
  },
  dropDownIcon: {
    background: "white",
  },
});
