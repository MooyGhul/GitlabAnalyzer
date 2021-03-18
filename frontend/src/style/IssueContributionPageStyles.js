import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
    text: {
        textAlign: 'center'
    },
    graphTitle: {
        textAlign: 'center', 
        fontWeight: 'bold',
    },
    table: {
        borderTopWidth: 1, 
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderColor: '#eee',
        borderStyle: 'solid',
    },
    header: {
        backgroundColor: "#e4e3ff"
    },
    dateColumn: {
        minWidth: 100,
        fontWeight: 'bold',
    }, 
    issueColumn: {
        minWidth: 300,
        fontWeight: 'bold',
    },
    noteColumn: {
        fontWeight: 'bold',
        minWidth: 500,
    },
    dropDownColumn: {
        minWidth: 50
    },
    icon: {
        background: 'none'
    },
    noteText: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: 400
    },
    charts: {
        paddingTop: '100px',
        paddingRight: '200px',
        paddingBottom: '100px',
        paddingLeft: '200px',
        overflow: "visible",
        display: "block",
    }, 
    dropDownRow: {
        backgroundColor: 'rgb(142,154,175, 0.15)',
        borderBottom: "medium solid #7553ff",
    },
    expandBtn: {
        position: "fixed",
        bottom: "1vh",
        right: "1vw",
        backgroundColor: "#7553ff",
        width: "8%",
        color: theme.palette.common.white
    },
  }));

  export default useStyles;