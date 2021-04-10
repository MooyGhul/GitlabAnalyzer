import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useStyles } from "./ProjectInfoStyle";
import StackedBarChart from "./StackedBarChart";
import MemberList from "./MemberList";
import useFullPageLoader from "../components/useFullPageLoader";
import useProjectNotSelected from "../components/useProjectNotSelected";

function ProjectInfoPage({onMemberIdChange,project_id, onProjectLoadedStateChange, projectLoaded }) {
  const location = useLocation(); 
  const [members, setMembers] = useState([]);
  const [commits, setCommits] = useState([]);
  const [MRs, setMRs] = useState([]);
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [
    noProjectSelected,
    showErrorPage, 
  ] = useProjectNotSelected();
  let commitsArray = [];
  let MRsArray = [];
  const classes = useStyles(); 
  const [projectId, setProjectId] = useState(project_id); 


  useEffect(() => {    
    const defined = () => {
      if (projectId === -1) {
        showErrorPage();
      } else {
        try {
          setProjectId(location.state.id); 
        } catch (err) {
          setProjectId(project_id);
        }
      }
    };

    const loadProject = async () => {
      showLoader()
      let projectUrl = `${process.env.REACT_APP_DEVHOST}/project/${projectId}/load`;
      await axios.post(projectUrl);
    }

    const fetchData = async () => {  
      let mrUrl = `/project/${projectId}/merge_requests`;
      let commitUrl = `/project/${projectId}/commits`;
      let memberUrl = `/project/${projectId}/members`;

      if (process.env.NODE_ENV === "development") {        
        mrUrl = `${process.env.REACT_APP_DEVHOST}/project/${projectId}/commits`;
        commitUrl = `${process.env.REACT_APP_DEVHOST}/project/${projectId}/merge_requests`;
        memberUrl = `${process.env.REACT_APP_DEVHOST}/project/${projectId}/members`;
      }
      const mrData = await axios.get(mrUrl);
      const commitData = await axios.get(commitUrl);
      const memberData = await axios.get(memberUrl);
  
      if (memberData.data===""){
        setMembers([])
      }
      else{
      setMembers(memberData.data);
      }
      setCommits(commitData.data);
      setMRs(mrData.data);
    };  

    defined(); 
    if (!projectLoaded) {
      showLoader();
      loadProject().then(() => {
        hideLoader();
        fetchData();
        onProjectLoadedStateChange(true);
      });
    }

    if (projectId!==-1) { 
      fetchData()
    }
  
  // eslint-disable-next-line
  }, [projectId]);

  console.log(members)  
  members.forEach((member) => {
    let countCommit = 0;
    let countMR = 0;

    commits.forEach((commit) => {
      if (member === commit.author) {
        countCommit++;
      }
    });
    commitsArray.push(countCommit);

    MRs.forEach((MR) => {
      if (member === MR.author) {
        countMR++;
      }
    }); 
    MRsArray.push(countMR);
  }); 
 

  return (
    <div> 
      <div className={classes.body}>
        <div className={classes.barChart}>
          <StackedBarChart
            member={members}
            projectID={projectId}
            commitsArray={commitsArray}
            MRsArray={MRsArray}
          />
        </div>
        <MemberList
          members={members}
          commitsArray={commitsArray}
          MRsArray={MRsArray}
          projectID={projectId}
          onMemberIdChange={onMemberIdChange}
        />
        
      </div>
      {loader}
      {noProjectSelected}
    </div>
   
  );
}

export default ProjectInfoPage;
