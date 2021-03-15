import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    analyzeButton: {
      position: "absolute",
      bottom: "5%",
      left: "68%",
    },
    batchButton: {
      position: "absolute",
      bottom: "5%",
      left: "55%",
      width: "9%"
    },

    errorMsg:{
      position: "absolute",
      top: "15%",      
      left: "50%",
      transform: "translate(-50%, -50%)"

    }

  });

  export {useStyles}  