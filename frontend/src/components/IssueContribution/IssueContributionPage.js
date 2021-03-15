import { Grid, TableContainer, Table, TableCell, TableHead, TableRow, TableBody, Typography } from '@material-ui/core';
import Banner from "../Banner";
import React from 'react';
import IssueBarChart from '../IssueContribution';
import {useState} from 'react';
import {useParams} from "react-router";
import {IssuesWordCount} from "../../mockDataDir/MockIssues";
import Navbar from '../Navbar/Navbar';
import useStyles from '../../style/IssueContributionPageStyles'; 
import Row from './IssueTableDropDown'
import {rows} from '../../mockDataDir/MockIssueTable'

const IssueContributionPage = (props) => {
    const styles = useStyles(); 
    const dateVar = props.date;
    const [issuesData] = useState(IssuesWordCount); 
    const {member_id} = useParams();
    const classes = useStyles(props);

    return (
        <Grid container className={classes.root}>

        {/* <Grid container justify='center' alignItems='center' spacing={5}> */}
            <Grid container spacing={0}>
              <Grid item xs={12} >
                {/*<Header pageTitle="Overview Test" />*/}
                <Navbar />
              </Grid>
            <Grid item xs={12} >
              <Banner memberName={member_id}/>
            </Grid>
            </Grid>
            <Grid container justify='center' alignItems='center' spacing={5}> 
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
        </Grid>
    )
}


export default IssueContributionPage;