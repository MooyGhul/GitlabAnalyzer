import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    pageTitle: {
        fontWeight: 'bold', 
        fontSize: '1.6rem'
    },
    subHeader: {
        fontWeight: 'bold', 
        fontSize: '1.4rem'
    },
    divider: {
        height: '0.15rem',
    },

    headCell: {
        fontWeight: "bold",
        fontSize: "1.2rem",
    }, 
}));

export default useStyles; 