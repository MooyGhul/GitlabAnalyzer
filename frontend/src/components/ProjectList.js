import styles from "../style/projectList.module.css"
import { DataGrid } from '@material-ui/data-grid';
import React,{useState, useEffect} from 'react';
import axios from 'axios';
import { setRef } from "@material-ui/core";


const ProjectList = (props) => {
        
    const columns = [
        { field: 'id', headerName: 'ID', width:200 },
        { field: 'projectName', headerName: 'Project', width: 400 },
     
    ]
 
    const [data, setData] = useState ([]);
    useEffect(() => {    
        
          const fetchData = async () => {
            await axios.post('http://localhost:8080/project/create?token=XQUSyUSDiQUxsy6CoP8_');
            await axios.post('http://localhost:8080/project/add?url=http://cmpt373-1211-14.cmpt.sfu.ca:8929/root/gitlabanalyzer');
            const result = await axios.get('http://localhost:8080/project/all')
            
            setData(result.data);
          };
          fetchData();
        }, []); 
     
    let rows = []
    data.forEach(project => rows.push({id: project.repoId, projectName:project.repoName}))


    

    return (           
        
        <div className={styles.projectList}>
            <div style={{ display: 'flex', height: '100%' }}>
                <div style={{ flexGrow: 2 }}>
                <DataGrid rows={rows} columns={columns} pageSize={10} checkboxSelection />
                </div>
            </div>
            {console.log(data)}
    </div> 
    );
    }

    export default ProjectList;