import WideHeader from "./WideHeader/WideHeader";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AllProjectInfo from "./AllProjectInfo";
import getMemberList from "../data/memberListGetter";

function ProjectInfoPage(props) {
  const location = useLocation();
  const projectId = props.project_id===-1 ? location.state.id : props.project_id;
  const [projectName] = useState("");
  const [members, setMembers] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      setMembers(await getMemberList(projectId));
      // TO DO : May need to put project name somewwhere
      // let getProjectNameUrl = `/project/${projectId}`;

      // if(process.env.NODE_ENV === 'development') {
      //   getProjectNameUrl = `${process.env.REACT_APP_DEVHOST}/project/${projectId}`
      // }
    };
    fetchData()
      .then(()=> {
        console.log('Successful data retrieval (project_id, projectName)');
      }).catch(() => {
        console.log('Failed retrieve data (project_id, projectName)');
      });
// eslint-disable-next-line
}, []);


  return (
    <div>
      <WideHeader id={projectId} projectName={projectName} />
      <AllProjectInfo member={members} projectID={projectId} onMemberIdChange={props.onMemberIdChange}/>
    </div>
  );
}

export default ProjectInfoPage;
