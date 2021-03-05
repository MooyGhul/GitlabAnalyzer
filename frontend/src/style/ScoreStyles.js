import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    card1: {
        backgroundColor: "#e4e3ff",
        height: "90%",
        width: "40vh",
        marginTop: "2vh",
        [theme.breakpoints.down("sm")]: {
            marginRight: "20px",
            width: "30vh",
            height: "80%",
            marginLeft: "-8vh",
        },
    },
    card2: {
        backgroundColor: "#e4e3ff",
        height: "90%",
        width: "30vh",
        marginTop: "2vh",
        marginLeft: "-10vh",
        [theme.breakpoints.down("sm")]: {
        marginRight: "20px",
            width: "30vh",
            height: "80%",
            marginLeft: "-8vh",
        },
    },
    titles: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    title: {
        fontWeight: "bold",
        [theme.breakpoints.down("sm")]: {
            fontSize: "1.2rem",
        },
        fontSize: "1.4rem"
    },
    values: {
        display: "flex",
        [theme.breakpoints.down("sm")]: {
             fontSize: "1.2rem",
        },
        fontSize: "1.6rem",
        justifyContent: "space-evenly",
    }
}));

export default useStyles;
