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
    dateText: {
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
    tableCell: {
        borderRightWidth: 1,
        borderColor: 'red',
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
    },
    dropDownBorder: {
        borderBottomWidth: 10,
        borderColor: 'rgb(70, 12, 163)',
    }
  }));

  export default useStyles;