import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: '25ch',
        },
      },
    pageTitle: {
        fontWeight: 'bold', 
        fontSize: '1.6rem'
    },
    subHeader: {
        fontWeight: 'bold', 
        fontSize: '1.4rem'
    },
    subHeader1: {
        fontWeight: 'bold', 
        fontSize: '1.2rem'
    },
    divider: {
        height: '0.15rem',
    },
    headCell: {
        fontWeight: "bold",
        fontSize: "1.2rem",
    }, 
    row: {
        hover: {
            color: "#7553ff",
        }
    }
}));

export default useStyles; 