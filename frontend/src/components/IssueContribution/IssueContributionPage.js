import { Grid, TableContainer, Table, TableCell, TableHead, TableRow, TableBody, Typography } from '@material-ui/core';
import Header from '../Header';
import Banner from "../Banner";
import React from 'react';
import IssueBarChart from '../IssueContribution';
import {useState} from 'react';
import {IssuesWordCount} from "../../mockDataDir/MockIssues";
import useStyles from '../../style/IssueContributionPageStyles'; 
import Row from './IssueTableDropDown'
import {rows} from '../../mockDataDir/MockIssueTable'

const IssueContributionPage = (props) => {
    const styles = useStyles(); 
    const dateVar = props.date;
    const [issuesData] = useState(IssuesWordCount); 

    return (
        <Grid container justify='center' alignItems='center' spacing={5}>
            <Grid item xs={12}>
                <Header pageTitle="Issue Contribution"/>
                <Banner/>
            </Grid>
            <Grid item xs={8} className={styles.text}>
                <Typography variant="h5" className={styles.dateText}>Issues created for {dateVar}</Typography>
                <IssueBarChart className={styles.charts} issuesDataProp={issuesData}/>
            </Grid>
            <Grid item xs={8}>
                <TableContainer className={styles.table}>
                    <Table aria-label="collapsible table">
                        <TableHead className={styles.header}>
                                <TableRow>
                                    <TableCell className={styles.dateColumn} align='left'>Date</TableCell>
                                    <TableCell className={styles.issueColumn} align='left'>Issue</TableCell>
                                    <TableCell className={styles.noteColumn} align='left'>Note</TableCell>
                                    <TableCell className={styles.dropDownColumn} align='left'/>
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


export default IssueContributionPage;