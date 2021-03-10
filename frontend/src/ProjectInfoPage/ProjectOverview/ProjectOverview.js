import styles from './ProjectOverview.module.css'
import MemberList from './MemberList'  
import { useLocation } from 'react-router-dom';

function ProjectOverview(){   
    const location = useLocation();

    return(
        <div className={styles.ProjectOverview}>
            <img className={styles.exportIcon} src="https://img.icons8.com/color/48/000000/export-pdf.png" alt="export"/>         
            {console.log(location.state.id)}
            <MemberList/> 
            
        </div>
    );
}

export default ProjectOverview