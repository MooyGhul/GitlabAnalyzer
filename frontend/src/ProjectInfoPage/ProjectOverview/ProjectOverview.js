import styles from './ProjectOverview.module.css'
import MemberList from './MemberList'


function ProjectOverview(){
    return(
        <div className={styles.ProjectOverview}>
            <img className={styles.exportIcon} src="https://img.icons8.com/color/48/000000/export-pdf.png"/>
            <MemberList/>
        </div>
    );
}

export default ProjectOverview