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
  },
  mrIcon: {
    color: "white",
    background: "#fc8053",
    marginRight: "2vw",
  },
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
  banner: {
    background: "#d1d0ff",
    fontWeight: "bold",
    fontSize: "1.0rem",
  },
  cell: {
    width: 200,
  },
  smallCell: {
    width: 50,
  },
  dropDownIcon: {
    background: "white",
  },
});
