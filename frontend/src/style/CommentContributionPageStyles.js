import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        display: "flex",
        flexDirection: "column",
        '& > *': {
            borderBottom: 'unset',
        },
    },
    head: {
        backgroundColor: "#d1d0ff",
        color: theme.palette.common.white,
    },
    table: {
        margin: "10% auto 0 auto",
        width: "90%"
    },
    wordCount: {
        paddingLeft: "5em"
    },
    rowBody: {
        fontSize: "1.1rem",
        width: "80%",
    },
    expandBtn: {
        position: "fixed",
        bottom: "1vh",
        right: "1vw",
        backgroundColor: "#7553ff",
        color: theme.palette.common.white
    },
    expandBody: {
        backgroundColor: "rgb(142,154,175, 0.15)",
    },
    icon: {
        background: "none",
        hover: "none"
    },
    mrIcon: {
        color: "white",
        backgroundColor: "#0096c7",
        marginLeft: "2vw"
    },
    issueIcon: {
        color: "white",
        backgroundColor: "#f4a261",
        marginLeft: "2vw"
    },
    graph: {
        margin: "0 auto 0 auto",
    }
}));

export default useStyles;