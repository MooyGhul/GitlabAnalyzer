import { Grid, TableContainer } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import {makeStyles} from "@material-ui/core/styles";
import Banner from "../components/Banner";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton'
import React from 'react';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useStyles = makeStyles((theme) => ({
    text: {
        textAlign: 'center'
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
    },
    dropDown: {
        minWidth:50
    },
    icon: {
        background: 'none'
    },
    noteText: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: 400
    }
  }));

function getIssueContributionGraph() {
    return 1; 
}

const columns = [
    {field: 'date', headerName: 'Date', width: 170}, 
    {field: 'issue', headerName: 'Issue', width: 500},
    {field: 'note', headerName: 'Note', width: 650},  
]

const rows = [
    {id: 1, date: 'Jan 30, 2020', issue: '#1 add a filter to main page', note: 'Sometimes I’ll start a sentence and I don’t even know where it’s going. I just hope I find it along the way - Michael Scott'},
    {id: 2, date: 'Mar 8, 2020 ', issue: '#2 fix a bug that doesnt work because of reasons', note: 'I’m not superstitious, but I am a little stitious.'},
    {id: 3, date: 'Mar 10, 2020', issue: '#3 fix a bug that is breaking things because', note: 'Dont ever, for any reason, do anything, to anyone, for any reason, ever, no matter what, no matter where, or who, or who you are with, or where you are going, or where youve been, ever, for any reason whatsoever.'}
]

const useRowStyles = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
  });

function Row(props) {
    const {row} = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
    const styles = useStyles(); 

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell component="th" scope="row">{row.date}</TableCell>
                <TableCell>{row.issue}</TableCell>
                <TableCell className={styles.noteText}>{row.note}</TableCell>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={()=>setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon className={styles.icon}/> : <KeyboardArrowDownIcon className={styles.icon}/>}
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h7" gutterBottom component="div" className={styles.noteColumn}>Full Note:</Typography>
                            <Typography variant="h8">{row.note}</Typography>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function IssueContributionPage() {
    const styles = useStyles(); 
    return (
        <Grid container justify='center' alignItems='center'>
            <Grid item xs={12}>
                <Header pageTitle="Issue Contribution"/>
                <Banner></Banner>
            </Grid>
            <Grid item xs={12} className={styles.text}>
                <h2>Issues created for *Insert date here*</h2>
            </Grid>
            <Grid item xs={12} className={styles.text}>
                <h2>Insert issue bar chart here</h2>
            </Grid>
            <Grid item xs={8}>
                <TableContainer className={styles.table}>
                    <Table aria-label="collapsible table">
                        <TableHead className={styles.header}>
                                <TableRow>
                                    <TableCell className={styles.dateColumn} align='left'>Date</TableCell>
                                    <TableCell className={styles.issueColumn} align='left'>Issue</TableCell>
                                    <TableCell className={styles.noteColumn} align='left'>Note</TableCell>
                                    <TableCell className={styles.dropDown} align='left'></TableCell>
                                </TableRow>
                        </TableHead>
                        <TableBody>
                                {rows.map((row) => (
                                    <Row key={Row.id} row={row}/>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
}