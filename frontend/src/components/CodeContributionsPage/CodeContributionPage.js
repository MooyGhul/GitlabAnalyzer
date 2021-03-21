import CodeContributionTable from "./CodeContributionTable";
import {Grid, Typography} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import axios from "axios";
import moment from "moment";
import Banner from "../Banner";
import {useParams} from "react-router-dom";
import {ComingSoonMsg} from "../../shared/ComingSoonMsg";
import BarChart from "../Charts/BarChart";
import BarChartProperties from "../Charts/BarChartProperties";
import {Contributions} from "../../mockDataDir/mockGraphContri";
import {useGraphStyles} from "../../style/CodeContributionPageStyles";
import Navbar from '../Navbar/Navbar';

const CodeContributionPage = () => {
  const [codeContributionRows, setCodeContributionRows] = useState([]);
  const {project_id, member_id} = useParams();
  const [graphData] = useState(Contributions);
  const classes = useGraphStyles();

  const createData = (id, type, date, name, score) => {
    return {id, type, date, name, score};
  }

  useEffect(() => {
    const codeContributionData = (commitData, mrData) => {
      let ccArray = [];
      for(let i = 0; i < commitData.length; i++) {
        let createdDate = new Date(commitData[i].commitDate);
        ccArray.push(createData(commitData[i].commitId,
          'commit',
          '' + moment(createdDate).format('LLL'),
          commitData[i].commitName,
          ComingSoonMsg.msg));
      }

      for(let i = 0; i < mrData.length; i++) {
        if (mrData[i].status === 'merged') {
          let mergedDate = new Date(mrData[i].mergedAt);
          ccArray.push(createData(mrData[i].id,
            'MR',
            '' + moment(mergedDate).format('LLL'),
            mrData[i].mergeRequestName,
            ComingSoonMsg.msg));
        }
      }

      ccArray.sort((a,b) => {
        let dateA = new Date(a.date);
        let dateB = new Date(b.date);
        return dateA - dateB;
      }).reverse();

      setCodeContributionRows(ccArray);
    };

    const fetchData = async () => {
      let mrUrl = `/project/${project_id}/merge_requests`;
      let commitUrl = `/project/${project_id}/commits`;

      if(process.env.NODE_ENV === 'development') {
        mrUrl = `${process.env.REACT_APP_DEVHOST}/project/${project_id}/merge_requests`
        commitUrl = `${process.env.REACT_APP_DEVHOST}/project/${project_id}/commits`
      }
      const resultCommit = await axios.get(commitUrl);
      const resultMR = await axios.get(mrUrl);
      const commitData = resultCommit.data;
      const mrData = resultMR.data;

      codeContributionData(commitData, mrData);
    }

    fetchData()
      .then(()=> {
        console.log('Successful data retrieval');
      }).catch(() => {
      console.log('Failed retrieve data');
    });

  },[project_id]);

  return(
    <Grid container>
      <Grid container spacing={0}>
        <Grid item xs={12} >
          <Navbar />
        </Grid>
        <Grid item xs={12} >
          <Banner memberName={member_id}/>
        </Grid>
      </Grid>

      <Grid container justify='center' alignItems='center' spacing={5}>
      <Grid item xs={8} className={classes.text}>
        <Typography variant="h5">Code Contributions</Typography>
        <BarChart data={graphData} codeContribution={true}
                  barLabel1={BarChartProperties.codeContribution.labelMRs}
                  barColour1={BarChartProperties.codeContribution.barColourMRs}
                  barLabel2={BarChartProperties.codeContribution.labelCommits}
                  barColour2={BarChartProperties.codeContribution.barColourCommits}/>
      </Grid>
      <Grid item xs={10}>
        <CodeContributionTable codeContributionRows={codeContributionRows}/>
      </Grid>
      </Grid>
    </Grid>
 );
}

export default CodeContributionPage;