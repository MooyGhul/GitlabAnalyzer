import Header from "../components/Header";
import WideHeader from "./WideHeader/WideHeader";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AllProjectInfo from "./AllProjectInfo";

function ProjectInfoPage(props) {
  const location = useLocation();
  const projectID = location.state.id;
  const projectName = location.state.projectName;

  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `http://localhost:8080/project/${projectID}/members`
      );

      setMembers(result.data);
    };
    fetchData();
  }, [projectID]);

  return (
    <div>
      <Header pageTitle="Project Overview"/>
      <WideHeader id={projectID} projectName={projectName} />
      <AllProjectInfo member={members} projectID={projectID} />
    </div>
  );
}

export default ProjectInfoPage;
