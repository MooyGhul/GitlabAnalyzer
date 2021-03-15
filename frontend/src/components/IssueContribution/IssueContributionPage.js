import {Grid, TableContainer, Table, TableCell, TableHead, TableRow, TableBody, Typography} from '@material-ui/core';
import Header from '../Header';
import Banner from "../Banner";
import React from 'react';
import {useState} from 'react';
import {IssuesWordCount} from "../../mockDataDir/MockIssues";
import useStyles from '../../style/IssueContributionPageStyles'; 
import Row from './IssueTableDropDown'
import {rows} from '../../mockDataDir/MockIssueTable'
import axios from 'axios';
import {getIssueGraphData} from '../../helper';
import BarChart from '../Charts/BarChart';
import BarChartProperties from '../Charts/BarChartProperties';

const IssueContributionPage = (props) => {
    const styles = useStyles(); 
    const [issuesData] = useState(IssuesWordCount); 
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
            console.log("Successfully obtained comments");
        }).catch((e) => {
            console.log("Failed to obtain comments");
            console.log(e);
        });
    }, [project_id, member_id, setGraphData]);

    return (
        <Grid container justify='center' alignItems='center' spacing={5}>
            <Grid item xs={12}>
                <Header pageTitle="Issue Contribution"/>
                <Banner/>
            </Grid>
            <Grid item xs={8} className={styles.text}>
                <Typography variant="h5" className={styles.graphTitle}>Issue Word Count Per Day</Typography>
                <BarChart data={issuesData} issue={true} barLabel1={BarChartProperties.comments.label} barColour1={BarChartProperties.issues.barColour}/>
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