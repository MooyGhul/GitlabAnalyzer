import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  body: {
    textAlign:"center"
  },

  memberList: {
    position: "absolute",
    width: "65%",
    height: "45%",
    top: "52%", 
    left: "50%",
    transform: "translate(-50%, 0%)"
  },

  barChart: {
    position: "absolute", 
    top: "10%",
    width: "40%",
    height: "50%",
    left: "50%",
    transform: "translate(-50%, 0%)"
  },
}));
export { useStyles };
