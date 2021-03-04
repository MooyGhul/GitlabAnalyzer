import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#e4e3ff",
        marginRight: "20px",
        height: "90%",
        marginTop: "2vh",
        [theme.breakpoints.down("sm")]: {
            width: "90%",
            height: "80%",
            marginLeft: "5%"
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
