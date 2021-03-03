import styles from './ProjectOverview.module.css'
import MemberList from './MemberList'  
import { useLocation } from 'react-router-dom';
import React,{useState, useEffect} from 'react';
import axios from 'axios'; 


function ProjectOverview(){   
    const location = useLocation();
    const projectID = location.state.id
    const [data, setData] = useState ([]);
    useEffect(() => {    
        
          const fetchData = async () => {
            const result = await axios.get(`http://localhost:8080/project/${projectID}/members`)
            
            setData(result.data);
          };
          fetchData();
        }, []); 
    console.log(data);
 

    return(
        <div className={styles.ProjectOverview}>
            <img className={styles.exportIcon} src="https://img.icons8.com/color/48/000000/export-pdf.png" alt="export"/>         
            {console.log(location.state.id)}
            <MemberList/> 
            
        </div>
    );
}

export default ProjectOverview