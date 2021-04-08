import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useStyles } from "./ProjectInfoStyle";
import StackedBarChart from "./StackedBarChart";
import MemberList from "./MemberList";
import useFullPageLoader from "../components/useFullPageLoader";
import useProjectNotSelected from "../components/useProjectNotSelected";

function ProjectInfoPage({
  onMemberIdChange,
  project_id,
  onProjectLoadedStateChange,
  projectLoaded,
  onNewProjectLoaded,
  previousProjectId,
}) {
  const location = useLocation();
  const [members, setMembers] = useState([]);
  const [commits, setCommits] = useState([]);
  const [MRs, setMRs] = useState([]);
  const [comments, setComments] = useState([]);
  const [issues, setIssues] = useState([]);
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [dataLoaded, setDataLoaded] = useState(false);
  const [noProjectSelected, showErrorPage] = useProjectNotSelected();
  let commitsArray = [];
  let MRsArray = [];
  let commentsArray = [];
  let issuesArray = [];
  const classes = useStyles();
  const [projectId, setProjectId] = useState(project_id);

  useEffect(() => {
    console.log("projectLoaded at the beginning of useEffect: ", projectLoaded);

    console.log("PROJECT ID", projectId);
    showLoader();
    const updateProjectId = () => {
      if (projectId === -1) {
        showErrorPage();
      } else {
        try {
          setProjectId(location.state.id);
          onNewProjectLoaded(location.state.id);
        } catch (err) {
          setProjectId(project_id);
          onNewProjectLoaded(project_id);
        }
      }
    };

    const loadProject = async () => {
      let projectUrl = `/project/${projectId}/load`;
      if (process.env.NODE_ENV === "development") {
        projectUrl = `${process.env.REACT_APP_DEVHOST}/project/${projectId}/load`;
        await axios.post(projectUrl);
      }
      console.log("Project has been loaded");

      if (projectLoaded === "noProjectLoaded") {
        onProjectLoadedStateChange("projectLoaded");
      }

      if (projectLoaded === "projectLoaded" && previousProjectId !== projectId) {
        onProjectLoadedStateChange("newProjectLoaded");
      }

      console.log(
        "Previous project ID INSIDE LOAD PROJECT: ",
        previousProjectId
      );
      console.log("Current project ID ISNIDE LOAD PROJECT: ", projectId);
    };

    const fetchData = async () => {
      let mrUrl = `/project/${projectId}/merge_requests`;
      let commitUrl = `/project/${projectId}/commits`;
      let memberUrl = `/project/${projectId}/members`;
      let commentUrl = `/project/${projectId}/comments`;
      let issueUrl = `/project/${projectId}/issues`;

      if (process.env.NODE_ENV === "development") {
        mrUrl = `${process.env.REACT_APP_DEVHOST}/project/${projectId}/commits`;
        commitUrl = `${process.env.REACT_APP_DEVHOST}/project/${projectId}/merge_requests`;
        memberUrl = `${process.env.REACT_APP_DEVHOST}/project/${projectId}/members`;
        commentUrl = `${process.env.REACT_APP_DEVHOST}/project/${projectId}/comments`;
        issueUrl = `${process.env.REACT_APP_DEVHOST}/project/${projectId}/issues`;
      }
      const mrData = await axios.get(mrUrl);
      const commitData = await axios.get(commitUrl);
      const memberData = await axios.get(memberUrl);
      const commentData = await axios.get(commentUrl);
      const issueData = await axios.get(issueUrl);

      if (memberData.data === "") {
        setMembers([]);
      } else {
        setMembers(memberData.data);
      }
      setCommits(commitData.data);
      setMRs(mrData.data);
      setComments(commentData.data);
      setIssues(issueData.data);
      setDataLoaded(true);
      console.log("DATA HAVE BEEN FETCHED");
    };
    updateProjectId();

    console.log("Previous project ID: ", previousProjectId);
    console.log("ProjectLoaded? ", projectLoaded);

    if (projectLoaded === "noProjectLoaded") {
      console.log("No project was previously added. Loading project.");
      loadProject();
    }

    if (projectLoaded === "projectLoaded" && previousProjectId === projectId) {
      console.log("A project is loaded.");
      fetchData().then(hideLoader());
    }

    if (projectLoaded === "projectLoaded" && previousProjectId !== projectId) {
      console.log("A different project is loaded");
      loadProject();
    }

    if (projectLoaded === "newProjectLoaded") {
      console.log("ALSDKFLASDKFLASDKF");
      fetchData().then(hideLoader());
    }

    // eslint-disable-next-line
  }, [projectId, projectLoaded]);
  console.log("MEMBERS ", members);
  members.forEach((member) => {
    let countCommit = 0;
    let countMR = 0;
    let countComment = 0;
    let countIssue = 0;

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

    comments.forEach((comment) => {
      if (member === comment.commenter) {
        countComment++;
      }
    });
    commentsArray.push(countComment);

    issues.forEach((issue) => {
      if (member === issue.author) {
        countIssue++;
      }
    });
    issuesArray.push(countIssue);
  });

  return (
    <div>
      <div className={classes.body}>
        <div className={classes.barChart}>
          <StackedBarChart
            members={members}
            projectID={projectId}
            commitsArray={commitsArray}
            MRsArray={MRsArray}
            commentsArray={commentsArray}
            issuesArray={issuesArray}
          />
        </div>
        <MemberList
          members={members}
          commitsArray={commitsArray}
          MRsArray={MRsArray}
          projectID={projectId}
          issuesArray={issuesArray}
          commentsArray={commentsArray}
          onMemberIdChange={onMemberIdChange}
        />
      </div>
      {loader}
      {noProjectSelected}
    </div>
  );
}

export default ProjectInfoPage;
