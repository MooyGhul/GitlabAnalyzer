import CodeContributionTable from "./CodeContributionTable";
import {Grid, Switch} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Banner from "../Banner";
import { useLocation } from "react-router-dom";
import { ComingSoonMsg } from "../../shared/ComingSoonMsg";
import BarChart from "../Charts/BarChart";
import BarChartProperties from "../Charts/BarChartProperties";
import {useGraphStyles, useSwitchStyles} from "../../style/CodeContributionPageStyles";
import InnerNavBar from "../InnerNavBar";
import {useInnerNavStyle} from "../../style/InnerNavStyle";
import {formatTableDate, getGraphData} from "../../helper";
import {Scores} from "../../mockDataDir/mockGraphContri";
import useProjectNotSelected from "../../components/useProjectNotSelected";

const CodeContributionPage = (props) => {
  const [codeContributionRows, setCodeContributionRows] = useState([]);
  const classes = useGraphStyles();
  const innerNavStyle = useInnerNavStyle();
  const switchStyle = useSwitchStyles();
  const [countsData, setCountsData] = useState([]);
  const [scoreData, setScoreData] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [project_id, setProjectId] = useState(props.project_id);
  const [member_id, setMemberId] = useState(props.member_id);
  const [noProjectSelected, showErrorPage] = useProjectNotSelected();
  const location = useLocation();
  const [scoreMode, setScoreMode] = useState(false);

  const createData = (id, type, date, name, url, score) => {
    return { id, type, date, name, url, score };
  };

  const createGraphData = (year, MRDaily, CommitDaily) => {
    return { year, MRDaily, CommitDaily };
  };

  console.log("HERE IS THE MEMBER ID", member_id)
  useEffect(() => {
    const defined = () => {
      if (project_id === -1) {
        showErrorPage();
      }
      else if (member_id === -1) {
        try {
          setProjectId(location.state.project_id);
          setMemberId(location.state.member_id);
        } catch (err) {
          setProjectId(props.project_id);
          setMemberId(props.member_id);
          showErrorPage();
        }
      }
      else{
        setProjectId(props.project_id);
        setMemberId(props.member_id);
      }
    };

    const codeContributionData = (commitData, mrData) => {
      let commitArray = [];
      let mrArray = [];
      let commitCountsData = [];
      let mrCountsData = [];

      formatData(commitData, commitArray, mrArray);
      formatData(mrData, commitArray, mrArray);

      const commitCounts = getGraphData(commitArray, "date");
      const mrCounts = getGraphData(mrArray, "date");
      for(let i = 0; i < commitCounts.length; i++) {
        commitCountsData.push(createGraphData(commitCounts[i].year, 0, commitCounts[i].data));
      }
      for(let i = 0; i < mrCounts.length; i++) {
        mrCountsData.push(createGraphData(mrCounts[i].year, mrCounts[i].data, 0));
      }

      const ccCountsData = mergeCounts(commitCountsData, mrCountsData);
      setCountsData(ccCountsData);
      setScoreData(Scores);
      setGraphData(Scores);

      let ccArray = [...commitArray, ...mrArray];
      ccArray.sort((a, b) => {
        let dateA = new Date(a.date);
        let dateB = new Date(b.date);
        return dateB - dateA;
      });

      setCodeContributionRows(ccArray);
    };

    const formatData = (dataType, commitArray, mrArray) => {
      for (let i = 0; i < dataType.length; i++) {
        let dataTypeIndex = dataType[i];
        const isCommitData = dataTypeIndex.hasOwnProperty('commitId');
        const isMergedMRData = !isCommitData && (dataTypeIndex.status === 'merged');

        if (isCommitData || isMergedMRData) {
          let id;
          let date;
          let name;
          let type;

          if (isCommitData) {
            id = dataTypeIndex.commitId;
            type = "commit";
            date = new Date(dataTypeIndex.commitDate);
            name = dataTypeIndex.commitName;
          } else if (isMergedMRData) {
            id = dataTypeIndex.id;
            type = "MR";
            date = new Date(dataTypeIndex.mergedAt);
            name = dataTypeIndex.mergeRequestName;
          }

          const newData = createData(
            id,
            type,
            "" + formatTableDate(date),
            name,
            dataTypeIndex.url,
            ComingSoonMsg.msg
          );

          if (newData.type === "commit") {
            commitArray.push(newData);
          } else if (newData.type === "MR") {
            mrArray.push(newData);
          }
        }
      }
    };

    const mergeCounts = (commitCountsData, mrCountsData) => {
      let merged;
      for (let i = 0; i < commitCountsData.length; i++) {
        for (let j = 0; j < mrCountsData.length; j++) {
          if (commitCountsData[i].year === mrCountsData[j].year) {
            commitCountsData[i].MRDaily += mrCountsData[j].MRDaily;
            mrCountsData.splice(j, 1);
          }
        }
      }

      merged = [...commitCountsData, ...mrCountsData];
      merged.sort((a, b) => {
        let dateA = new Date(a.year);
        let dateB = new Date(b.year);
        return dateB - dateA;
      });

      return merged;
    };

    const fetchData = async () => {
      let mrUrl = `/project/${project_id}/member/${member_id}/merge_requests`;
      let commitUrl = `/project/${project_id}/member/${member_id}/commits`;

      if (process.env.NODE_ENV === "development") {
        mrUrl = `${process.env.REACT_APP_DEVHOST}/project/${project_id}/member/${member_id}/merge_requests`;
        commitUrl = `${process.env.REACT_APP_DEVHOST}/project/${project_id}/member/${member_id}/commits`;
      }

      const resultCommit = await axios.get(commitUrl);
      const resultMR = await axios.get(mrUrl);
      const commitData = resultCommit.data;
      const mrData = resultMR.data;

      codeContributionData(commitData, mrData);
    };
    defined();

    if (member_id !== -1) {
      fetchData()
        .then(() => {
          console.log("Successful data retrieval");
        })
        .catch(() => {
          console.log("Failed retrieve data");
        });
    }
    // eslint-disable-next-line
  }, [project_id, member_id, props]);

  const handleSwitch = (event) => {
    setScoreMode(event.target.checked);
    scoreMode ? setGraphData(scoreData) : setGraphData(countsData);
  }

  return (
    <div>
      <Grid
        container
        spacing={5}
        justify="center"
        alignItems="center"
        className={classes.container}
      >
        <Grid item xs={12}>
          <Grid item xs={12}>
            <Banner memberName={member_id} />
          </Grid>
        </Grid>
        <Grid item xs={12} align="center">
          <InnerNavBar codeStyle={innerNavStyle.actionItemCode} />
        </Grid>

      <Grid className={classes.graph}>
        <Switch
          classes={switchStyle}
          checked={scoreMode}
          onChange={handleSwitch}
          name='graphSwitch'
          />

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
      {noProjectSelected}
    </div>
  );
};

export default CodeContributionPage;
