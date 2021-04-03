import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  body: {
    // left: "20%",
    // width: "80%",
  },

  memberList: {
    position: "absolute",
    width: "65%",
    height: "45%",
    top: "50%",
    left: "20%", 
  },

  barChart: {
    position: "absolute",
    bottom: "5%",
    top: "5%",
    width: "40%",
    height: "50%",
    left: "25%",
  },
}));
export { useStyles };
