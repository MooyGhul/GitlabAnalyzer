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
    accordian: {
        marginTop: "12vh",
    },
}));

export default useStyles;