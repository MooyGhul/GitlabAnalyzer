import React from 'react';
import Header from '../components/Header'; 
import WideHeader from './WideHeader/WideHeader';
import ProjectOverview from './ProjectOverview/ProjectOverview';

function ProjectInfoPage(props) {
 
    return (
      <div>
        <WideHeader/>

        <Header
          pageTitle="Project Information"
        />

        <ProjectOverview/>     
           
      </div>
    );
  }
  
  export default ProjectInfoPage;