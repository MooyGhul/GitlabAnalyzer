import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  memberList: {
    position: "absolute",
    width: "60%",
    height: "30%",
    top: "15%",
    right: "10%",
  },

  barChart: {
    position: "absolute",
    bottom: "5%",
    top: "50%",
    width: "40%",
    height: "50%",
    left: "35%",
  },
}));
export { useStyles };
