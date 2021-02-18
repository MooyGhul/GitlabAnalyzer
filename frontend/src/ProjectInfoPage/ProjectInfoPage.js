import Header from '../components/Header'; 
import MemberList from './MemberList';
import './ProjectInfoPage.css'


function ProjectInfoPage(props) {
     
    return (
      <div>
        
        <Header
          pageTitle="Project Information"
        />
        <MemberList/>
         
  
      </div>
    );
  }
  
  export default ProjectInfoPage;