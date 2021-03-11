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
        margin: "4% auto 0 auto",
        width: "90%"
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
    }
}));

export default useStyles;