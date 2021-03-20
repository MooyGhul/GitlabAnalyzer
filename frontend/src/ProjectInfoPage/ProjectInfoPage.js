import Header from "../components/Header";
import WideHeader from "./WideHeader/WideHeader";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AllProjectInfo from "./AllProjectInfo";
import {useParams} from "react-router-dom";

function ProjectInfoPage(props) {
  const location = useLocation();
  const projectId = location.state.id;
  const [projectName, setProjectName] = useState(location.state.projectName);

  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let getProjectNameUrl = `/project/${projectId}`;

      console.log("-----getProjectNameUrl-----");
      console.log("getProjectNameUrl :" + getProjectNameUrl + "; END OF IT.");
      console.log("-----END-----");

      const result = await axios.get(
          process.env.NODE_ENV === 'development' ?
              `${process.env.REACT_APP_DEVHOST}/project/${projectId}/members` :
              `/project/${projectId}/members`
      );

      if(process.env.NODE_ENV === 'development') {
        getProjectNameUrl = `${process.env.REACT_APP_DEVHOST}/project/${projectId}`
      }

      setMembers(result.data);

      console.log("-----resultMembers-----");
      console.log("resultMembers : " + members + "; END OF IT.");
      console.log("-----END-----");
    };
    fetchData()
      .then(()=> {
        console.log('Successful data retrieval (project_id, projectName)');
      }).catch(() => {
      console.log('Failed retrieve data (project_id, projectName)');
    });
  }, [projectId, members]);

  return (
    <div>
      <Header pageTitle="Project Overview"/>
      <WideHeader id={projectId} projectName={projectName} />
      <AllProjectInfo member={members} projectID={projectId} />
    </div>
  );
}

export default ProjectInfoPage;
