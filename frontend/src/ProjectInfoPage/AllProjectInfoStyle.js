import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  body:{ 
    // position: 'absolute',
    left: '20%',
    width:'80%',
  },

  memberList: {
    
    position: "absolute",
    width: "60%",
    height: "30%",
    top:'55%',
    right: "10%",
  },

  barChart: {
    position: "absolute",
    bottom: "5%",
    top: "10%",
    width: "40%",
    height: "50%",
    left: "35%",
  },
}));
export { useStyles };
