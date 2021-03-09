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
 
    useEffect(() => {
      const fetchData = async () => {
        const result = await axios.get(
          `http://localhost:8080/project/${projectID}/commits`
        );
  
        setCommits(result.data);
      };
      fetchData();
    }, [projectID]);

    // eslint-disable-next-line
    let result = commits.reduce( (acc, o) => (acc[o.author] = (acc[o.author] || 0)+1, acc), {} );

    let memberList = [];
    
    for (var member in result){
      console.log(member)
      memberList.push(member)      
    } 
    let commitCount = Object.values(result)

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

    return ( 
      <div>
        <Header/>
        <WideHeader/>
        
        {console.log(location.state.id)}

         
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
                label: 'Contribution',
                data:  commitCount,
                maintainAspectRatio:true,
                backgroundColor: ['rgba(252, 36, 131, 0.9', 'rgba(53,63,196,0.9)'],
                borderWidth: 4,  
              }
            ]              
          }}
          options ={
            { 
            responsive: true,
            scales: {
              x: {
                  stacked: true
              },
              y: {
                  stacked: true
              }
          }
            
          }}
          className={classes.barChart}
          
          />
          </div>      
      </div>
    );
  }
  
  export default ProjectInfoPage;
  