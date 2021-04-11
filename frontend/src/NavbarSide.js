import React from "react"; 
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
  Grid,
} from "@material-ui/core";
import ProjectInfoPage from "./ProjectInfoPage/ProjectInfoPage";
import { useState } from "react";
import UrlToken from "./components/UrlToken";
import ProjectListPage from "./ProjectListPage";
import CodeContributionPage from "./components/CodeContributionsPage/CodeContributionPage";
import CommentContributionPage from "./components/CommentContributionPage/CommentContributionPage";
import IssueContributionPage from "./components/IssueContribution/IssueContributionPage";
import ListAltIcon from "@material-ui/icons/ListAlt";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SettingsIcon from "@material-ui/icons/Settings";
import BarChartIcon from "@material-ui/icons/BarChart";
import GitHubIcon from "@material-ui/icons/GitHub"; 
import MenuIcon from "@material-ui/icons/Menu";
import useStyles from "./style/NavbarSideStyle";
import ScoreBreakdown from "./components/ScoreBreakdown/ScoreBreakdown";
import WeightConfigurationPage from "./components/WeightConfigurationPage/WeightConfigurationPage";

const NavbarSide = () => {
  const classes = useStyles();
  const [member_id, setMemberId] = useState(-1);
  const [project_id, setProjectId] = useState(-1);
  const [token, setToken] = useState();
  const [sidebar, setSidebar] = useState(false); 
  const [projectLoaded, setProjectLoaded] = useState(false);

  const [startDate, setStartDate] = useState(new Date('January 1, 2021 00:00:00'));
  const [endDate, setEndDate] = useState(new Date('Dec 31, 2021 00:00:00'));

  const handleStartDate = (newDate) => {
    setStartDate(newDate)
  };

  const handleEndDate = (newDate) => {
    setEndDate(newDate)
  };

  const toggle = () => {
    setSidebar(!sidebar); 
  };

  const handleTokenAccess = (newToken) => {
    setToken(newToken);  
  };

  const handleMemberIDChange = (newMemberId) => {
    setMemberId(newMemberId);  
  };

  const handleProjectIDChange = (newProjectId) => {
    setProjectId(newProjectId); 
  }; 

  const handleProjectLoadedChange = (dataLoadedState) => {
    setProjectLoaded(true);
  }

  return (
    <Router>
      <h1 className={classes.header}>Gitlab Analyzer</h1>
      <MenuIcon className={classes.menuIcon} onClick={toggle} />

      <Grid container>
        <div style={{ display: "flex" }}>
          <Grid item>
            <Drawer 
              variant="persistent" 
              open={sidebar}
              classes={{ paper: classes.drawerPaper }}
            >
              <List className={classes.list}>
                <Link to="/token" className={classes.link}>
                  <ListItem button className={classes.listItem}>
                    <ListItemIcon className={classes.icon}>
                      <GitHubIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Import"} />
                  </ListItem>
                </Link>

                <Link to="/projectList" className={classes.link}>
                  <ListItem button>
                    <ListItemIcon className={classes.link}>
                      <ListAltIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Projects"} />
                  </ListItem>
                </Link>

                <Link className={classes.link} to={{pathname: "/projectInfo/:project_id"}}>
                  <ListItem button>
                    <ListItemIcon className={classes.link}>
                      <BarChartIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Project Overview"} />
                  </ListItem>
                </Link>

                <Link
                  to="/overview/:project_id/:member_id/codecontribution"
                  className={classes.link} 
                >
                  <ListItem button>
                    <ListItemIcon className={classes.link}>
                      <AccountCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Member Overview"} />
                  </ListItem>
                </Link>

                <Link to="/Settings" className={classes.link}>
                  <ListItem button>
                    <ListItemIcon className={classes.link}>
                      <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Settings"} />
                  </ListItem>
                </Link>
              </List>
            </Drawer>
          </Grid>

          <Container fixed>
            <Switch>
              <Route exact path="/token">
                <Container>
                  <UrlToken handleTokenAccess={handleTokenAccess}
                  />
                </Container>
              </Route>

              <Route exact path="/projectList">
                <Container>
                  <ProjectListPage onProjectIdChange={handleProjectIDChange} />
                </Container>
              </Route>

              <Route exact path={`/projectInfo/:project_id`}>
                <Grid container>
                  <ProjectInfoPage
                    onMemberIdChange={handleMemberIDChange}
                    onProjectLoadedStateChange={handleProjectLoadedChange}
                    dataLoaded={projectLoaded}
                    project_id={project_id} 
                  />
                </Grid>
              </Route>

              <Route
                exact
                path={`/overview/:project_id/:member_id/codecontribution`}
              >
                <Container>
                  <CodeContributionPage
                    project_id={project_id}
                    member_id={member_id}  
                  />
                </Container>
              </Route>

              <Route
                exact
                path="/overview/:project_id/:member_id/commentContribution"
              >
                <Container>
                  <CommentContributionPage
                    project_id={project_id}
                    member_id={member_id}
                  />
                </Container>
              </Route>

              <Route
                exact
                path="/overview/:project_id/:member_id/issueContribution"
              >
                <Container>
                  <IssueContributionPage
                    project_id={project_id}
                    member_id={member_id}
                  />
                </Container>
              </Route>

              <Route
                exact
                path="/overview/:project_id/:member_id/breakdown"
              >
                <Container>
                  <ScoreBreakdown
                    project_id={project_id}
                    member_id={member_id}
                  />
                </Container>
              </Route>
              <Route exact path="/Settings">
                <Container><WeightConfigurationPage token={token} startDate={startDate} endDate={endDate} handleStartDate={handleStartDate} handleEndDate={handleEndDate}/></Container>
              </Route>
            </Switch>
          </Container>
        </div>
      </Grid>
    </Router>
  );
};

export default NavbarSide;
