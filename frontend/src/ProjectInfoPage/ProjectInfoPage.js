import WideHeader from "./WideHeader/WideHeader";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AllProjectInfo from "./AllProjectInfo";
import useFullPageLoader from "../components/useFullPageLoader";
 
const ProjectInfoPage = (props) => {
  const location = useLocation();
  const projectId = props.project_id===-1 ? location.state.id : props.project_id;
  const [projectName] = useState("");
  const [members, setMembers] = useState([]);
  const [loader, showLoader, hideLoader] = useFullPageLoader();

  useEffect(() => {
    showLoader();
    const loadProject = async() => {
      await axios.post(process.env.NODE_ENV === 'development' ?         
      `${process.env.REACT_APP_DEVHOST}/project/${projectID}/load` :
      `/project/${projectID}/load`)
    }
    const fetchData = async () => {
        const result = await axios.get(
          process.env.NODE_ENV === 'development' ?
              `${process.env.REACT_APP_DEVHOST}/project/${projectID}/members` :
              `/project/${projectID}/members`
      );
      
      if (result.data===""){
        setMembers([])
      }
      else{
        setMembers(result.data);
      }
    }; 
    loadProject();
    fetchData().then(hideLoader());
     // eslint-disable-next-line
  }, [projectID]); 
  
  return (
    <div>
      <Header pageTitle="Project Overview"/>
      <WideHeader id={projectID} projectName={projectName} />
      <AllProjectInfo member={members} projectID={projectID} />
      {loader}
    </div>
   
  );
}

export default ProjectInfoPage;
