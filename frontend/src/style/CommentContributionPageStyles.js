import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        display: "flex",
        flexDirection: "column"
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
        marginLeft: "5vh"
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    accordian: {
        justifyContent: "space-evenly",
        marginTop: "12vh",
        width: "100%"
    },
    tableHeader: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
        marginLeft: "5vh"
    },
    title: {
        marginLeft: "2vh"
    }
}));

export default useStyles;