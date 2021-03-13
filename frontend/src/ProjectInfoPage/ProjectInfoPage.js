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


    const [members, setMembers] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        const result = await axios.get(
          `http://localhost:8080/project/${projectID}/members`
        );
  
        setMembers(result.data);
      };
      fetchData();
    }, [projectID]);
    
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
    

    let commitsArray = []

    members.forEach(member => {
      let count = 0
      commits.forEach(commit =>{ 
        if (member===commit.author){
          count ++
        }        
      }
      )
      commitsArray.push(count);
    }
    )
    console.log(commitsArray)

    let MRsArray = []

    members.forEach(member => {
      let count = 0
      MRs.forEach(MR =>{ 
        console.log(MR.author)
        if (member===MR.author){
          count ++
        }        
      }
      )
      MRsArray.push(count);
    }
    )
    console.log(MRsArray)
 
    const rows = [];  
    for (var i = 0; i < members.length; i++) {
      var obj = {};
      obj["id"] = i;
      obj["studentID"] = members[i];
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
    for (i=0; i<members.length; i++){
      colorListCommit.push('rgba(252, 36, 131, 0.9');
    }

    let colorListMR = []
    for (i=0; i<members.length; i++){
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
            labels: members,
            datasets: [
              {
                label: 'Commits',
                data:  commitsArray,
                maintainAspectRatio:true,
                backgroundColor: colorListCommit,
                borderWidth: 4,  
              },
              {
                label: 'Merge requests',
                data:  MRsArray,
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
  