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

    graph: {
        width: "60vw",
        height: '30vh',
        margin: "20px 0 20px 0"
    }, 
 
    table: {
        margin: "0 auto 0 auto",
        width: "90%"
    },
    header: {
        backgroundColor: "#d1d0ff",
        color: theme.palette.common.white,
    },
    headCell: {
        fontWeight: "bold",
        fontSize: "1.2rem"
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
    empty: {
        
    }
  }));

  export default useStyles;