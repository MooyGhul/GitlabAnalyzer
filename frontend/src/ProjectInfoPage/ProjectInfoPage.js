import Header from "../components/Header";
import WideHeader from "./WideHeader/WideHeader";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AllProjectInfo from "./AllProjectInfo";
import {useParams} from "react-router-dom";

function ProjectInfoPage(props) {
  const location = useLocation();

  const {projectId} = useParams();
  const [projectName, setProjectName] = useState([]);

  console.log("-----LOCATION-----");
  console.log("projectId : " + projectId + "; END OF IT.");
  console.log("-----END-----");

  //const projectName = location.state.projectName;

  //const projectID = location.state.id;
  // console.log("useParams() : " + useParams());
  // console.log("projectId : " + projectId + "!!!!!");
  // console.log("location.state.id : " + location.state.id);

  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let getProjectNameUrl = `/project/${projectId}`;

      const result = await axios.get(
          process.env.NODE_ENV === 'development' ?
              `${process.env.REACT_APP_DEVHOST}/project/${projectId}/members` :
              `/project/${projectId}/members`
      );

      if(process.env.NODE_ENV === 'development') {
        getProjectNameUrl = `${process.env.REACT_APP_DEVHOST}/project/${projectId}`
      }

      setMembers(result.data);
      
      const resultCommit = await axios.get(getProjectNameUrl);
      setProjectName(resultCommit.data);
    };
    fetchData();
  }, [projectId]);

  return (
    <div>
      <Header pageTitle="Project Overview"/>
      <WideHeader id={projectId} projectName={projectName} />
      <AllProjectInfo member={members} projectID={projectId} />
    </div>
  );
}

export default ProjectInfoPage;
