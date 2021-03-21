import {Grid, TableContainer, Table, TableCell, TableHead, TableRow, TableBody, Typography} from '@material-ui/core';
import Banner from "../Banner";
import Navbar from '../Navbar/Navbar';
import React, { useEffect, useState} from 'react';
import useStyles from '../../style/IssueContributionPageStyles'; 
import Row from './IssueTableDropDown'
import axios from 'axios';
import {getGraphData} from '../../helper';
import BarChart from '../Charts/BarChart';
import BarChartProperties from '../Charts/BarChartProperties';
import {useParams} from "react-router";
import Button from "@material-ui/core/Button";

const IssueContributionPage = () => {
    const classes = useStyles();
    const [expandAll, setExpandAll] = React.useState(false);
    const [issues, setIssues] = useState([]); 
    const [graphData, setGraphData] = useState([]);
    const {project_id, member_id} = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const issueResult = await axios.get(process.env.NODE_ENV === 'development' ?
                `${process.env.REACT_APP_DEVHOST}/project/${project_id}/member/${member_id}/issues` :
                `/project/${project_id}/member/${member_id}/issues`
            );
            setIssues(issueResult.data); 
            const issueCounts = getGraphData(issueResult.data, "openedDate");
            setGraphData(issueCounts);
        };
        fetchData().then(() => {
            console.log("Successfully obtained issues");
        }).catch((e) => {
            console.log("Failed to obtain issues");
            console.log(e);
        });
    }, [project_id, member_id, setGraphData]);

    const handleExpand = () => {
        setExpandAll(!expandAll)
    }

    return (
        <Grid container>
            <Grid container spacing={0}>
              <Grid item xs={12} >
                <Navbar />
              </Grid>
              <Grid item xs={12} >
                <Banner memberName={member_id}/>
              </Grid>
            </Grid>
            <Grid container spacing={5}>
            <Grid item>
            </Grid>
            <Grid container justify='center' alignItems='center' spacing={5}>
              <Grid item xs={8} className={styles.text}>
                  <Typography variant="h5" className={styles.graphTitle}>Issue Word Count Per Day</Typography>
                  <BarChart data={graphData} barLabel1={BarChartProperties.issues.label} barColour1={BarChartProperties.issues.barColour}/>
              </Grid>
                <Grid item>
                    <Button variant="contained" onClick={handleExpand} className={classes.expandBtn}>
                        {expandAll ? "Collapse All" : "Expand All"}
                    </Button>
                </Grid>
              <Grid item xs={8}>
                  <TableContainer className={classes.table}>
                      <Table aria-label="collapsible table">
                          <TableHead className={classes.header}>
                                  <TableRow>
                                      <TableCell className={classes.dateColumn} align='left'>Date</TableCell>
                                      <TableCell className={classes.issueColumn} align='left'>Issue</TableCell>
                                      <TableCell className={classes.noteColumn} align='left'>Note</TableCell>
                                      <TableCell className={classes.dropDownColumn} align='left'/>
                                  </TableRow>
                          </TableHead>
                          <TableBody>
                              {issues.map((issue) => (
                                  <Row key={issue.issueId} row={issue} expandAll={expandAll}/>
                              ))}
                          </TableBody>
                      </Table>
                  </TableContainer>
              </Grid>
              </Grid>
            </Grid>
        </Grid>
    )
}


export default IssueContributionPage;