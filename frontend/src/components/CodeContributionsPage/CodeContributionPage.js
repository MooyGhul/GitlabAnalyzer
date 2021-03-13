import CodeContributionTable from "./CodeContributionTable";
import Header from "../Header";
import {Grid} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import axios from "axios";
import moment from "moment";

function CodeContributionPage (props) {
  const [commitData, setCommitData] = useState([]);
  const [mrData, setMRData] = useState([]);
  const [codeContributionRows, setCodeContributionRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const resultCommit = await axios.get('http://localhost:8080/project/2/commits');
      setCommitData(resultCommit.data);

      const resultMR = await axios.get('http://localhost:8080/project/2/merge_requests');
      setMRData(resultMR.data);
    };
    fetchData()
    .then(res => {
      console.log('Successful data retrieval');
      codeContributionData();

    }).catch(() => {
      console.log('Failed retrieve data');
    });

  },[]);

  console.log(commitData);
  console.log(mrData);
  console.log('Rows: ');
  console.log(codeContributionRows);

  const createData = (id, type, date, details, score) => {
    return {id, type, date, details, score};
  }

  const codeContributionData = () => {
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

    setCodeContributionRows(ccArray.sort((a,b) => {
      let dateA = new Date(a.date);
      let dateB = new Date(b.date);
      return dateA - dateB;
    }).reverse());
  };

  return(
    <Grid container spacing={4}>
      <Grid item xs={12} >
        <Header
          pageTitle='Code Contribution Page'
        />
      </Grid>
      <Grid item xs={12} >
      </Grid>
      <Grid item xs={12}>
        <CodeContributionTable codeContributionRows={codeContributionRows}/>
      </Grid>
    </Grid>
 );
}

export default CodeContributionPage;