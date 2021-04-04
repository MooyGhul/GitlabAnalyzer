import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useStyles } from "./ProjectInfoStyle";
import StackedBarChart from "./StackedBarChart";
import MemberList from "./MemberList";
import useFullPageLoader from "../components/useFullPageLoader";
import useProjectNotSelected from "../components/useProjectNotSelected";

function ProjectInfoPage(props) {
  const location = useLocation();

  // const projectId = useRef();
  const [projectName] = useState("");
  const [members, setMembers] = useState([]);
  const [commits, setCommits] = useState([]);
  const [MRs, setMRs] = useState([]);
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [
    noProjectSelected,
    showErrorPage,
    hideErrorPage,
  ] = useProjectNotSelected();
  let commitsArray = [];
  let MRsArray = [];
  const classes = useStyles();
  const idTest = useRef(-1);
  const [projectId, setProjectId] = useState(0);
  // const [storedProjectId, setStoredProjectId] = useLocalStorage('projectId', 0);



  // const projectId = props.projectSelected===-1 && location != undefined ? -1 : location.state.id;

  useEffect(() => { 
    const defined = () => {
      try {
        setProjectId(location.state.id);
        idTest.current=location.state.id;
        console.log("idTest is now ", idTest)
      } catch (err) {
        console.log("location state is undefined ", idTest)
        return false;
        // console.log("ERROR", err);
        // showErrorPage();
      }
    };

    const fetchData = async () => {
      showLoader();
      let mrUrl = `/project/${projectId}/merge_requests`;
      let commitUrl = `/project/${projectId}/commits`;

      const result = await axios.get(
        process.env.NODE_ENV === "development"
          ? `${process.env.REACT_APP_DEVHOST}/project/${projectId}/members`
          : `/project/${projectId}/members`
      );

      if (process.env.NODE_ENV === "development") {
        mrUrl = `${process.env.REACT_APP_DEVHOST}/project/${projectId}/commits`;
        commitUrl = `${process.env.REACT_APP_DEVHOST}/project/${projectId}/merge_requests`;
      }

      const mrData = await axios.get(mrUrl);
      const commitData = await axios.get(commitUrl);

      setMembers(result.data);
      setCommits(commitData.data);
      setMRs(mrData.data);
    };
    const result = defined();
    if (result == false) {
      console.log("Oh no");  
      console.log("projectID is now ", projectId)
    } else { 
      fetchData().then(hideLoader());
    }
  }, [projectId, props]);

  members.forEach((member) => {
    let count = 0;
    commits.forEach((commit) => {
      if (member === commit.author) {
        count++;
      }
    });
    commitsArray.push(count);
  });

  members.forEach((member) => {
    let count = 0;
    MRs.forEach((MR) => {
      if (member === MR.author) {
        count++;
      }
    });
    MRsArray.push(count);
  });

  return (
    <div>
      {/* <WideHeader id={projectId} projectName={projectName} /> */}
      {/* <AllProjectInfo member={members} projectID={projectId} onMemberIdChange={props.onMemberIdChange}/>       */}
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
          onMemberIdChange={props.onMemberIdChange}
        />
        {loader}
        {noProjectSelected}
      </div>
    </div>
  );
}

export default ProjectInfoPage;
 