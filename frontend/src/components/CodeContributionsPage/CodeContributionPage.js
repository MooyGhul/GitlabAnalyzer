import CodeContributionTable from "./CodeContributionTable";
import Header from "../Header";
import {Grid} from "@material-ui/core";
import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import moment from "moment";
import Banner from "../Banner";
import {useParams} from "react-router-dom";

function CodeContributionPage () {
  const [commitData, setCommitData] = useState([]);
  const [mrData, setMRData] = useState([]);
  const [codeContributionRows, setCodeContributionRows] = useState([]);
  const {projectId, memberId} = useParams();

  const createData = (id, type, date, details, score) => {
    return {id, type, date, details, score};
  }

  const codeContributionData = useCallback(() => {
    let ccArray = [];
    for(let i = 0; i < commitData.length; i++) {
      let createdDate = new Date(commitData[i].commitDate);
      ccArray.push(createData(commitData[i].commitId,
        'commit',
        '' + moment(createdDate).format('LLL'),
        commitData[i].commitName,
        14));
    }

    for(let i = 0; i < mrData.length; i++) {
      if (mrData[i].status === 'merged') {
        let createdDate = new Date(mrData[i].createdAt);
        let mergedDate = new Date(mrData[i].mergedAt);
        ccArray.push(createData(mrData[i].id,
          'MR',
          '' + moment(createdDate).format('LLL'),
          'Merge Request merged at ' + moment(mergedDate).format('LLL'),
          24));
      }
    }

    ccArray.sort((a,b) => {
      let dateA = new Date(a.date);
      let dateB = new Date(b.date);
      return dateA - dateB;
    }).reverse();

    return ccArray;
  },[commitData, mrData]);

  useEffect(() => {
    const fetchData = async () => {
      const resultCommit = await axios.get('http://localhost:8080/project/2/commits');
      setCommitData(resultCommit.data);

      const resultMR = await axios.get('http://localhost:8080/project/2/merge_requests');
      setMRData(resultMR.data);
      setCodeContributionRows(codeContributionData);

    };
    fetchData()
      .then(()=> {
        console.log('Successful data retrieval');
      }).catch(() => {
      console.log('Failed retrieve data');
    });
  },[projectId, memberId, codeContributionRows, codeContributionData]);

  return(
    <Grid container spacing={4}>
      <Grid item xs={12} >
        <Header
          pageTitle='Code Contribution Page'
        />
        <Banner />
      </Grid>
      <Grid item xs={2} >
      </Grid>
      <Grid item xs={8} >
        **I am a graph**
      </Grid>
      <Grid item xs={2} >
      </Grid>
      <Grid item xs={1} >
      </Grid>
      <Grid item xs={10}>
        <CodeContributionTable codeContributionRows={codeContributionRows}/>
      </Grid>
      <Grid item xs={1} >
      </Grid>
    </Grid>
 );
}

export default CodeContributionPage;