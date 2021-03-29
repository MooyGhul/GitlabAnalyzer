import Header from "../components/Header";
import WideHeader from "./WideHeader/WideHeader";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AllProjectInfo from "./AllProjectInfo";
import getMemberList from "../data/memberListGetter";

function ProjectInfoPage() {
  const location = useLocation();
  const projectID = location.state.id;
  const projectName = location.state.projectName;

  const [members, setMembers] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      setMembers(await getMemberList(projectID));
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
