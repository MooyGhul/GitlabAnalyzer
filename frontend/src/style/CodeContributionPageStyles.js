import {makeStyles} from "@material-ui/core/styles";

export const useGraphStyles = makeStyles((theme) => ({
  graph: {
    width: "60vw",
    height: "30vh",
    margin: "20px 0 20px 0",
  },

  contents:{ 
    width:"100%",  
    [theme.breakpoints.up("lg")]: {
      marginTop: "30vh", 
    },
    [theme.breakpoints.down("md")]: {
      marginTop: "25vh", 
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: "20vh", 
    }, 
  },

  table: {
    margin: "0 auto 0 auto",
    width: "90%",
  },

  container:{
    position: "absolute",
    top:"2vh",
    left:"0", 
    width:"100%", 
  }
}));

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
  banner: {
    background: "#d1d0ff",
    fontWeight: "bold",
    fontSize: "1.0rem",
  },
  dropDownIcon: {
    background: "white",
  },

});

export const useDropdownStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  }
});
