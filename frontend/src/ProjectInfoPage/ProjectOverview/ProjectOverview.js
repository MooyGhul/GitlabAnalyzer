import styles from './ProjectOverview.module.css'
import MemberList from './MemberList'


function ProjectOverview(){
    return(
        <div className={styles.ProjectOverview}>
            <MemberList/>
        </div>
    );
}

export default ProjectOverview