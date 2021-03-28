import WideHeader from "./WideHeader/WideHeader";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AllProjectInfo from "./AllProjectInfo";

function ProjectInfoPage(props) {
  const location = useLocation();
  console.log(props);
  const projectId = props.project_id===-1 ? location.state.id : props.project_id;
  const [projectName] = useState("");
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      

      console.log("project id is : " + props.project_id);

      const result = await axios.get(
          process.env.NODE_ENV === 'development' ?
              `${process.env.REACT_APP_DEVHOST}/project/${projectId}/members` :
              `/project/${projectId}/members`
      );

      // TO DO : May need to put project name somewwhere
      // let getProjectNameUrl = `/project/${projectId}`;

      // if(process.env.NODE_ENV === 'development') {
      //   getProjectNameUrl = `${process.env.REACT_APP_DEVHOST}/project/${projectId}`
      // }

      setMembers(result.data);

    };
    fetchData()
      .then(()=> {
        console.log('Successful data retrieval (project_id, projectName)');
      }).catch(() => {
      console.log('Failed retrieve data (project_id, projectName)');
    });
  }, [projectId, members,props.project_id]);

  return (
    <div>
      <WideHeader id={projectId} projectName={projectName} />
      <AllProjectInfo member={members} projectID={projectId} onMemberIdChange={props.onMemberIdChange}/>
    </div>
  );
}

export default ProjectInfoPage;
