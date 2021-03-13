import { Grid, TableContainer, Table, TableCell, TableHead, TableRow, TableBody, IconButton, Collapse, Box, Typography } from '@material-ui/core';
import Header from './components/Header';
import Banner from "./components/Banner";
import React from 'react';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import IssueBarChart from './components/IssueContribution';
import {useState} from 'react';
import {IssuesWordCount} from "./mockDataDir/MockIssues";
import useStyles from './style/IssueContributionPageStyles'; 

const rows = [
    {id: 1, date: 'Jan 30, 2020', issue: '#1 add a filter to main page', note: 'Sometimes I’ll start a sentence and I don’t even know where it’s going. I just hope I find it along the way - Michael Scott'},
    {id: 2, date: 'Mar 8, 2020 ', issue: '#2 fix a bug that doesnt work because of reasons', note: 'I’m not superstitious, but I am a little stitious.'},
    {id: 3, date: 'Mar 10, 2020', issue: '#3 fix a bug that is breaking things because I need a longer example to illustrate this wraps', note: 'Dont ever, for any reason, do anything, to anyone, for any reason, ever, no matter what, no matter where, or who, or who you are with, or where you are going, or where youve been, ever, for any reason whatsoever.'}
]

function Row(props) {
    const {row} = props;
    const [open, setOpen] = React.useState(false);
    const styles = useStyles(); 

    return (
        <React.Fragment>
            <TableRow className={styles.root}>
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
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6} className={open ? styles.dropDownRow : styles.empty}>
                    <Collapse in={open} timeout="auto" unmountOnExit >
                        <Box margin={1}>
                            <Typography variant="h7" gutterBottom component="div">Full Note: {row.note}</Typography>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function IssueContributionPage(props) {
    const styles = useStyles(); 
    const dateVar = props.date;
    const [issuesData] = useState(IssuesWordCount); 

    return (
        <Grid container justify='center' alignItems='center' spacing={5}>
            <Grid item xs={12}>
                <Header pageTitle="Issue Contribution"/>
                <Banner></Banner>
            </Grid>
            <Grid item xs={8} className={styles.text}>
                <Typography variant="h5" className={styles.dateText}>Issues created for {dateVar}</Typography>
                <IssueBarChart className={styles.charts} issuesDataProp={issuesData}></IssueBarChart>
            </Grid>
            <Grid item xs={8}>
                <TableContainer className={styles.table}>
                    <Table aria-label="collapsible table">
                        <TableHead className={styles.header}>
                                <TableRow>
                                    <TableCell className={styles.dateColumn} align='left'>Date</TableCell>
                                    <TableCell className={styles.issueColumn} align='left'>Issue</TableCell>
                                    <TableCell className={styles.noteColumn} align='left'>Note</TableCell>
                                    <TableCell className={styles.dropDownColumn} align='left'></TableCell>
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