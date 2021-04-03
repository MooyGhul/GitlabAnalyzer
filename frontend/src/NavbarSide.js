import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import {
  Drawer, List, ListItem, 
  ListItemIcon, ListItemText,
  Container, Grid
} from "@material-ui/core"; 
import ProjectInfoPage from './ProjectInfoPage/ProjectInfoPage';
import {useState} from 'react';
import UrlToken from './components/UrlToken';
import ProjectListPage from './ProjectListPage';
import CodeContributionPage from "./components/CodeContributionsPage/CodeContributionPage";
import CommentContributionPage from './components/CommentContributionPage/CommentContributionPage'
import IssueContributionPage from './components/IssueContribution/IssueContributionPage';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import BarChartIcon from '@material-ui/icons/BarChart';
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: '8%',
    backgroundColor: "#0E0824",  
    boxShadow:"2px 2px 5px "
  },
  link: {
    textDecoration: 'none', 
    color: "rgb(225, 225, 225)",
  }, 
  list :{    
    position: "absolute",
    top: "30%"
  },   

  icon: {
    color:"rgb(225,225,225)",
    display: "flex"
  }
}));

const NavbarSide = (props) => {
  const classes = useStyles();
  const [member_id, setMemberId] = useState(-1);
  const [project_id, setProjectId] = useState(-1);

  const handleMemberIDChange = (newMemberId) => {
    setMemberId(newMemberId);
  }

  const handleProjectIDChange = (newProjectId) => {
    console.log("handleProjectIDChange is called, and project ID is set to " + newProjectId);
    setProjectId(newProjectId);
  }

  return (
    <Router>
      <Grid container >
      <div style={{display: 'flex'}} >
        <Grid item>
          <Drawer
          style={{width:'240px'}}
          variant="persistent"
          anchor="left"
          open={true}
          classes={{paper:classes.drawerPaper}}
        >
          <List className={classes.list}>
            <Link to="/token" className={classes.link}>
            <ListItem button>
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
              <ListItemText primary={"Projects"} getProjectId/>
            </ListItem>
            </Link>


            <Link to="/projectInfo/:project_id" className={classes.link}>
            <ListItem button>
              <ListItemIcon className={classes.link}>
                <BarChartIcon />
              </ListItemIcon>
              <ListItemText primary={"Project Overview"} />
            </ListItem>
            </Link>

          <Link to="/overview/:project_id/:member_id/codecontribution" className={classes.link}>
            <ListItem button>
              <ListItemIcon className={classes.link}>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary={"Member Overview"} />
            </ListItem>
            </Link>

          <Link to="/Configurations" className={classes.link}>
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
              <UrlToken />
            </Container>
          </Route>

          <Route exact path="/projectList">
            <Container>
              <ProjectListPage onProjectIdChange={handleProjectIDChange}/>
            </Container>
          </Route>

          <Route exact path="/projectInfo/:project_id">
            <Grid container>
              <ProjectInfoPage onMemberIdChange={handleMemberIDChange} project_id={project_id} />
            </Grid>
          </Route>

          <Route exact path="/overview/:project_id/:member_id/codecontribution">
            <Container>
              <CodeContributionPage project_id={project_id} member_id={member_id}/>
            </Container>
          </Route>

          <Route exact path="/overview/:project_id/:member_id/commentContribution">
            <Container>
              <CommentContributionPage project_id={project_id} member_id={member_id}/>
            </Container>
          </Route>

          <Route exact path="/overview/:project_id/:member_id/issueContribution">
            <Container>
              <IssueContributionPage project_id={project_id} member_id={member_id}/>
            </Container>
          </Route>

          <Route exact path="/Configurations">
            <Container>
              Configurations
            </Container>
          </Route>

        </Switch>
        </Container>
      </div>
      </Grid>
    </Router> 
  );
}

export default NavbarSide;
