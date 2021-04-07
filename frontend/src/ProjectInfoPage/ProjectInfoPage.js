import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useStyles } from "./ProjectInfoStyle";
import StackedBarChart from "./StackedBarChart";
import MemberList from "./MemberList";
import useFullPageLoader from "../components/useFullPageLoader";
import useProjectNotSelected from "../components/useProjectNotSelected";

function ProjectInfoPage({onMemberIdChange,project_id}) {
  const location = useLocation(); 
  // const [projectName] = useState("");
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
    defined();
    if (projectId!==-1) { 
      fetchData().then(hideLoader());
    }
  // eslint-disable-next-line
  }, [projectId]);

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
        {loader}
        {noProjectSelected}
      </div>
    </div>
  );
}

export default ProjectInfoPage;
