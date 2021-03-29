import {
  Grid,
  TableContainer,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody, 
} from "@material-ui/core";
import Banner from "../Banner";
<<<<<<< HEAD
import React, { useEffect, useState} from 'react';
import useStyles from '../../style/IssueContributionPageStyles'; 
import Row from './IssueTableDropDown'
import axios from 'axios';
import {getGraphData} from '../../helper';
import BarChart from '../Charts/BarChart';
import BarChartProperties from '../Charts/BarChartProperties';
=======
import Navbar from "../Navbar/Navbar";
import React, {useEffect, useState} from "react";
import useStyles from "../../style/IssueContributionPageStyles";
import Row from "./IssueTableDropDown";
import axios from "axios";
import {getGraphData} from "../../helper";
import BarChart from "../Charts/BarChart";
import BarChartProperties from "../Charts/BarChartProperties";
>>>>>>> master
import {useParams} from "react-router";
import InnerNavBar from "../InnerNavBar";
import {useInnerNavStyle} from "../../style/InnerNavStyle"
import ExpandAllBtn from "../ExpandAllBtn"; 

const IssueContributionPage = () => {
    const classes = useStyles();
    const [expandAll, setExpandAll] = React.useState(false);
    const [issues, setIssues] = useState([]); 
    const [graphData, setGraphData] = useState([]);
    const {project_id, member_id} = useParams();
    const innerNavStyle = useInnerNavStyle();

  useEffect(() => {
    const fetchData = async () => {
      const issueResult = await axios.get(
        process.env.NODE_ENV === "development"
          ? `${process.env.REACT_APP_DEVHOST}/project/${project_id}/member/${member_id}/issues`
          : `/project/${project_id}/member/${member_id}/issues`
      );
      setIssues(issueResult.data);
      const issueCounts = getGraphData(issueResult.data, "openedDate");
      setGraphData(issueCounts);
    };
    fetchData()
      .then(() => {
        console.log("Successfully obtained issues");
      })
      .catch((e) => {
        console.log("Failed to obtain issues");
        console.log(e);
      });
  }, [project_id, member_id, setGraphData]);

<<<<<<< HEAD
    return (
        <Grid container>
            <Grid container spacing={0}>
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
            </Grid>
=======
  return (
    <Grid container spacing={5} justify="center" alignItems="center">
      <Grid item xs={12}>
        <Grid item xs={12}>
          <Navbar />
        </Grid>
        <Grid item xs={12}>
          <Banner memberName={member_id} />
>>>>>>> master
        </Grid>
      </Grid>

      <Grid item xs={12} align="center">
        <InnerNavBar issueStyle={innerNavStyle.actionItemIssue} />
      </Grid>

      <Grid className={classes.graph}>
        <BarChart
          data={graphData}
          barLabel1={BarChartProperties.issues.label}
          barColour1={BarChartProperties.issues.barColour}
          maintainRatio={false}
        />
      </Grid>
      <Grid item>
        <ExpandAllBtn expandAll={expandAll} setExpandAll={setExpandAll}/>
      </Grid>

      <Grid item className={classes.table}>
        <TableContainer>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow className={classes.header}>
                <TableCell className={classes.headCell} align="left">
                  Date
                </TableCell>
                <TableCell className={classes.headCell} align="left">
                  Issue
                </TableCell>
                <TableCell className={classes.headCell} align="left">
                  Note
                </TableCell>
                <TableCell className={classes.dropDownColumn} align="left" />
              </TableRow>
            </TableHead>
            <TableBody>
              {issues.map((issue) => (
                <Row key={issue.issueId} row={issue} expandAll={expandAll} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default IssueContributionPage;
