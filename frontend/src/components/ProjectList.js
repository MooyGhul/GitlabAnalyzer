import styles from "../style/projectList.module.css"
import { DataGrid } from '@material-ui/data-grid';
import React,{useState, useEffect} from 'react';
import axios from 'axios';


const ProjectList = (props) => {
        
    const columns = [
        { field: 'id', headerName: 'ID', width:200 },
        { field: 'projectName', headerName: 'Project Name', width: 400 },
    ]
 
    const [data, setData] = useState ([]);
    useEffect(() => {    
        
          const fetchData = async () => {
            const result = await axios.get('http://localhost:8080/project/all')
            
            setData(result.data);
          };
          fetchData();
        }, []); 
     
    const rows = data.map(project => ({id: project.repoId, projectName:project.repoName}))  

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