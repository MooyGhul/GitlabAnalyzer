import {Grid, TableContainer, Table, TableCell, TableHead, TableRow, TableBody, Typography} from '@material-ui/core';
import Banner from "../Banner";
import {IssuesWordCount} from "../../mockDataDir/MockIssues";
import Navbar from '../Navbar/Navbar';
import React, { useEffect, useState} from 'react';
import useStyles from '../../style/IssueContributionPageStyles'; 
import Row from './IssueTableDropDown'
import axios from 'axios';
import {getIssueGraphData} from '../../helper';
import BarChart from '../Charts/BarChart';
import BarChartProperties from '../Charts/BarChartProperties';
import {useParams} from "react-router";

const IssueContributionPage = (props) => {
    const styles = useStyles(); 

    const [issues, setIssues] = useState([]); 
    const [graphData, setGraphData] = useState([]);
    const {project_id, member_id} = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const issueResult = await axios.get(
                `/project/${project_id}/member/${member_id}/issues`
            );
            setIssues(issueResult.data); 
            const issueCounts = getIssueGraphData(issueResult.data);
            setGraphData(issueCounts);
        }
        fetchData().then(() => {
            console.log("Successfully obtained issues");
        }).catch((e) => {
            console.log("Failed to obtain issues");
            console.log(e);
        });
    }, [project_id, member_id, setGraphData]);

    return (
        <Grid container justify='center' alignItems='center' spacing={5}>
            <Grid container spacing={0}>
              <Grid item xs={12} >
                <Navbar />
              </Grid>
              <Grid item xs={12} >
                <Banner memberName={member_id}/>
              </Grid>
            </Grid>
            <Grid item xs={8} className={styles.text}>
                <Typography variant="h5" className={styles.graphTitle}>Issue Word Count Per Day</Typography>
                <BarChart data={graphData} issue={true} barLabel1={BarChartProperties.issues.label} barColour1={BarChartProperties.issues.barColour}/>
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
                            {issues.map((issue) => (
                                <Row key={issue.issueId} row={issue}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
}


export default IssueContributionPage;