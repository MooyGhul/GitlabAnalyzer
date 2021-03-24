import React, {useState, useEffect} from "react";
import axios from "axios";
import StackedBarChart from "./StackedBarChart";
import { useStyles } from "./AllProjectInfoStyle";
import MemberList from "./MemberList";
import useFullPageLoader from "../components/useFullPageLoader"

const AllProjectInfo = (props) => {
  const classes = useStyles();
  const [commits, setCommits] = useState([]);
  const [MRs, setMRs] = useState([]);
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  
  let members = props.member;
  let projectID = props.projectID;
  let commitsArray = [];
  let MRsArray = [];
  let projectName = props.projectName;
  
  useEffect(() => {
    const fetchData = async () => {
      showLoader();
      let mrUrl = `/project/${projectID}/merge_requests`;
      let commitUrl = `/project/${projectID}/commits`;

      if(process.env.NODE_ENV === 'development') {
        mrUrl = `${process.env.REACT_APP_DEVHOST}/project/${projectID}/commits`
        commitUrl = `${process.env.REACT_APP_DEVHOST}/project/${projectID}/merge_requests`
      }

      const mrData = await axios.get(mrUrl);
      const commitData = await axios.get(commitUrl)
     
      setCommits(commitData.data);
      setMRs(mrData.data);
    };
    
    fetchData().then(hideLoader());
  // eslint-disable-next-line
  }, [])


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
    <div className={classes.body}>
      <div className={classes.barChart}>
        <StackedBarChart
          member={members}
          projectID={projectID}
          commitsArray={commitsArray}
          MRsArray={MRsArray}
        />
      </div>
      <MemberList
        members={members}
        commitsArray={commitsArray}
        MRsArray={MRsArray}
        projectID={projectID}
        projectName={projectName}
      />
      {loader}
    </div>
  );
}
export default AllProjectInfo;
