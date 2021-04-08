import CodeContributionTable from "./CodeContributionTable";
import {Grid} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Banner from "../Banner";
import {useParams} from "react-router-dom";
import {ComingSoonMsg} from "../../shared/ComingSoonMsg";
import BarChart from "../Charts/BarChart";
import BarChartProperties from "../Charts/BarChartProperties";
import {useGraphStyles} from "../../style/CodeContributionPageStyles";
import Navbar from "../Navbar/Navbar";
import InnerNavBar from "../InnerNavBar";
import {useInnerNavStyle} from "../../style/InnerNavStyle"
import {formatTableDate, getGraphData} from "../../helper";

const CodeContributionPage = () => {
  const [codeContributionRows, setCodeContributionRows] = useState([]);
  const {project_id, member_id} = useParams();
  const classes = useGraphStyles();
  const innerNavStyle = useInnerNavStyle();
  const [graphData, setGraphData] = useState([]);

  const createMRData = (id, iid, date, name, url, mrScore, totalCommitScore, relatedCommits) => {
    return {id, iid, date, name, url, mrScore, totalCommitScore, relatedCommits};
  }

  const createCommitData = (id, date, name, url, score) => {
    return {id, date, name, url, score};
  }

  const createGraphData = (year, MRDaily, CommitDaily) => {
    return {year, MRDaily, CommitDaily};
  }

  useEffect(() => {
    const codeContributionData = (commitData, mrData) => {
      let commitArray = [];
      let mrArray = [];
      let commitCountsData = [];
      let mrCountsData = [];

      formatData(mrData, mrArray, commitData, commitArray);

      const commitCounts = getGraphData(commitData, "commitDate");
      const mrCounts = getGraphData(mrData, "mergedAt");
      for(let i = 0; i < commitCounts.length; i++) {
        commitCountsData.push(createGraphData(commitCounts[i].year, 0, commitCounts[i].data));
      }
      for(let i = 0; i < mrCounts.length; i++) {
        mrCountsData.push(createGraphData(mrCounts[i].year, mrCounts[i].data, 0));
      }

      const ccGraphData = mergeCounts(commitCountsData, mrCountsData);
      setGraphData(ccGraphData);

      let ccArray = [...commitArray, ...mrArray];
      ccArray.sort((a, b) => {
          let dateA = new Date(a.date);
          let dateB = new Date(b.date);
          return dateB - dateA;
        });

      setCodeContributionRows(ccArray);
    };

    const formatData = (mrData, mrArray, commitData, commitArray) => {
      for(let mrDataIndex = 0; mrDataIndex < mrData.length; mrDataIndex++) {
        const relatedCommitIds = commitData.filter(val => {
          return mrData[mrDataIndex].commitIds.includes(val.commitId);
        });

        let relatedCommitsArray = [];
        for(let relatedCommitIndex = 0; relatedCommitIndex < relatedCommitIds.length; relatedCommitIndex++){
          const commitDate = new Date(relatedCommitIds[relatedCommitIndex].commitDate);
          const newCommitData = createCommitData(relatedCommitIds[relatedCommitIndex].commitId,
            '' + formatTableDate(commitDate),
            relatedCommitIds[relatedCommitIndex].commitName,
            relatedCommitIds[relatedCommitIndex].url,
            ComingSoonMsg.msg);
          relatedCommitsArray.push(newCommitData);
        }

        const mrDate = new Date(mrData[mrDataIndex].mergedAt);
        const newMrData = createMRData(mrData[mrDataIndex].id,
          mrData[mrDataIndex].iid,
          '' + formatTableDate(mrDate),
          mrData[mrDataIndex].mergeRequestName,
          mrData[mrDataIndex].url,
          ComingSoonMsg.msg,
          ComingSoonMsg.msg,
          relatedCommitsArray);

        mrArray.push(newMrData);
      }
    }

    const mergeCounts = (commitCountsData, mrCountsData) => {
      let merged;
      for(let i = 0; i < commitCountsData.length; i++) {
        for(let j = 0; j < mrCountsData.length; j++) {
          if (commitCountsData[i].year === mrCountsData[j].year) {
            commitCountsData[i].MRDaily += mrCountsData[j].MRDaily;
            mrCountsData.splice(j, 1);
          }
        }
      }

      merged = [...commitCountsData, ...mrCountsData];
      merged.sort((a,b) => {
        let dateA = new Date(a.year);
        let dateB = new Date(b.year);
        return dateA - dateB;
      });

      return merged;
    };

    const fetchData = async () => {
      let mrUrl = `/project/${project_id}/member/${member_id}/merge_requests`;
      let commitUrl = `/project/${project_id}/member/${member_id}/commits`;

      if(process.env.NODE_ENV === 'development') {
        mrUrl = `${process.env.REACT_APP_DEVHOST}/project/${project_id}/member/${member_id}/merge_requests`;
        commitUrl = `${process.env.REACT_APP_DEVHOST}/project/${project_id}/member/${member_id}/commits`;
      }

      const resultCommit = await axios.get(commitUrl);
      const resultMR = await axios.get(mrUrl);
      const commitData = resultCommit.data;
      const mrData = resultMR.data;

      codeContributionData(commitData, mrData);
    };

    fetchData()
      .then(()=> {
        console.log('Successful data retrieval');
      }).catch(() => {
      console.log('Failed retrieve data');
    });
  },[project_id, member_id]);
  console.log(graphData);
  console.log(codeContributionRows);

  return (
    <Grid container spacing={5} justify="center" alignItems="center">
      <Grid item xs={12}>
        <Grid item xs={12}>
          <Navbar />
        </Grid>
        <Grid item xs={12}>
          <Banner memberName={member_id} />
        </Grid>
      </Grid>
      <Grid item xs={12} align="center">
        <InnerNavBar codeStyle={innerNavStyle.actionItemCode}/>
      </Grid>

      <Grid className={classes.graph}>
        <BarChart
          data={graphData}
          codeContribution={true}
          barLabel1={BarChartProperties.codeContribution.labelMRs}
          barColour1={BarChartProperties.codeContribution.barColourMRs}
          barLabel2={BarChartProperties.codeContribution.labelCommits}
          barColour2={BarChartProperties.codeContribution.barColourCommits}
          maintainRatio={false}
        />
      </Grid>

      <Grid item className={classes.table}>
        <CodeContributionTable codeContributionRows={codeContributionRows} />
      </Grid>
    </Grid>
  );
};

export default CodeContributionPage;