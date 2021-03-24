import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  buttons: {
    [theme.breakpoints.up("lg")]: {
      marginTop: "4vh",
      marginLeft: "20px",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: "12vh",
    },
    marginTop: "15vh",
    flexDirection: "column",
    marginLeft: "-80px",
    display: "flex",
    justify: "space-between",
  },
  button: {
    margin: "5px",
    height: "5vh",
    width: "23vh",
    display: "flex",
    justifyContent: "space-evenly",
  },
  cards: { 
  },
  icon: {
    background: "none",
  },
  buttonContainer: { 
    marginTop: "3vh",
    marginLeft: "1vw",
  },
  scoreboardContainer:{ 
    marginLeft:"12.5vw"
  }
}));

export default useStyles;
