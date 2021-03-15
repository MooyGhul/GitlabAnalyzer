import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  body: {
    left: "20%",
    width: "80%",
  },

  memberList: {
    position: "absolute",
    width: "65%",
    height: "30%",
    top: "60%",
    left: "30%",
  },

  barChart: {
    position: "absolute",
    bottom: "5%",
    top: "15%",
    width: "40%",
    height: "50%",
    left: "40%",
  },
}));
export { useStyles };
