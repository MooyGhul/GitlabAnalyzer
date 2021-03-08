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
    expandBtn: {
        position: "fixed",
        bottom: "1vh",
        right: "1vw",
        backgroundColor: "#7553ff",
        color: theme.palette.common.white
    },
    accordian: {
        marginTop: "12vh",
    },
}));

export default useStyles;