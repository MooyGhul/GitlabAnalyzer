import Header from '../components/Header'; 
import WideHeader from './WideHeader/WideHeader'; 
import axios from "axios";
import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useHistory } from "react-router-dom";
import { useStyles } from "./ProjectInfoStyle";
import { useLocation } from "react-router-dom"; 
import {Bar} from "react-chartjs-2";

  function ProjectInfoPage(props) {
    const location = useLocation();
    const projectID = location.state.id;
    const history = useHistory();
    const classes = useStyles();
     
    const [commits, setCommits] = useState([]);
    const [MRs, setMRs] = useState([])

    useEffect(() => {
      const fetchData = async () => {
        const commitData = await axios.get(
          `http://localhost:8080/project/${projectID}/commits`
          
        );
  
        setCommits(commitData.data);
      };
      fetchData();
    }, [projectID]);

    useEffect(() => {
      const fetchData = async () => {
        const mrData = await axios.get(
          `http://localhost:8080/project/${projectID}/merge_requests`
          
        );
  
        setMRs(mrData.data);
      };
      fetchData();
    }, [projectID]);

    // eslint-disable-next-line
    let resultMR = MRs.reduce( (acc, o) => (acc[o.author] = (acc[o.author] || 0)+1, acc), {} );
    let MRCount = Object.values(resultMR)


    // eslint-disable-next-line
    let resultCommit = commits.reduce( (acc, o) => (acc[o.author] = (acc[o.author] || 0)+1, acc), {} );

    let memberList = [];
    for (var member in resultCommit){ 
      memberList.push(member)      
    } 
    let commitCount = Object.values(resultCommit)
   
    const rows = [];  
    for (var i = 0; i < memberList.length; i++) {
      var obj = {};
      obj["id"] = i;
      obj["studentID"] = memberList[i];
      rows.push(obj);
    }
  
    const columns = [
      { field: "id", headerName: "ID", width: 100 },
      { field: "studentID", headerName: "Student ID", width: 200 },
    ];
     
    const buttonClickHandler = (event) => {
      history.push("/overview");
    };
    
    let colorListCommit = []
    for (i=0; i<memberList.length; i++){
      colorListCommit.push('rgba(252, 36, 131, 0.9');
    }

    let colorListMR = []
    for (i=0; i<memberList.length; i++){
      colorListMR.push('rgba(53,63,196,0.9)');
    }

    
    return ( 
      <div>
        <Header/>
        <WideHeader/>
                 
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          onRowClick={buttonClickHandler}
          className={classes.memberList} 
        />  


        <div className={classes.barChart}>
        <Bar
          data={{
            labels: memberList,
            datasets: [
              {
                label: 'Commits',
                data:  commitCount,
                maintainAspectRatio:true,
                backgroundColor: colorListCommit,
                borderWidth: 4,  
              },
              {
                label: 'Merge requests',
                data:  MRCount,
                maintainAspectRatio:true,
                backgroundColor: colorListMR,
                borderWidth: 4,  
              }
            ]              
          }}
          options ={
            { 
            responsive: true,
            scales: {
              xAxes: [{
                  stacked: true
              }],
              yAxes: [{
                  ticks: {beginAtZero: true},
                  stacked: true
              }]
          }
            
          }}
          className={classes.barChart}
          
          />
          </div>      
      </div>
    );
  }
  
  export default ProjectInfoPage;
  