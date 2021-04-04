 import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; 
import { useStyles } from "./ProjectInfoStyle";
import StackedBarChart from "./StackedBarChart";
import MemberList from "./MemberList";
import useFullPageLoader from "../components/useFullPageLoader"


function ProjectInfoPage(props) {
  const location = useLocation();
  const projectId = props.project_id===-1 ? location.state.id : props.project_id;
  const [projectName] = useState("");
  const [members, setMembers] = useState([]);
  const [commits, setCommits] = useState([]);
  const [MRs, setMRs] = useState([]); 
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  let commitsArray = [];
  let MRsArray = [];
  const classes = useStyles()
  
  useEffect(() => {
    const fetchData = async () => {
      showLoader();
      let mrUrl = `/project/${projectId}/merge_requests`;
      let commitUrl = `/project/${projectId}/commits`;

      const result = await axios.get(
          process.env.NODE_ENV === 'development' ?
              `${process.env.REACT_APP_DEVHOST}/project/${projectId}/members` :
              `/project/${projectId}/members`
      ); 

      if(process.env.NODE_ENV === 'development') {
        mrUrl = `${process.env.REACT_APP_DEVHOST}/project/${projectId}/commits`
        commitUrl = `${process.env.REACT_APP_DEVHOST}/project/${projectId}/merge_requests`
      }

      const mrData = await axios.get(mrUrl);
      const commitData = await axios.get(commitUrl)
      
      setMembers(result.data);
      setCommits(commitData.data);
      setMRs(mrData.data);

    };
    fetchData().then(hideLoader());
// eslint-disable-next-line
}, []);


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
    </div>
    </div>
  );
}

export default ProjectInfoPage;
