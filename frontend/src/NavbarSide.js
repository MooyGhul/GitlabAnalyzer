import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import {
  Drawer, List, ListItem, 
  ListItemIcon, ListItemText,
  Container, Grid
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home"
import InfoIcon from "@material-ui/icons/Info";
import ProjectInfoPage from './ProjectInfoPage/ProjectInfoPage';
import {useState} from 'react';
import UrlToken from './components/UrlToken';
import ProjectListPage from './ProjectListPage';
import OverviewPage from './OverviewPage';

const useStyles = makeStyles((theme) => ({
  drawerPaper: {width: 'inherit'},
  link: {
    textDecoration: 'none', 
    color: theme.palette.text.primary
  }
}));

const NavbarSide = (props) => {
  const classes = useStyles();
  const test = "test_hello_world";
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
      <Grid container>
      <div style={{display: 'flex'}}>
        <Grid item>
          <Drawer
          style={{width:'240px'}}
          variant="persistent"
          anchor="left"
          open={true}
          classes={{paper:classes.drawerPaper}}
        >
          <List>
            <Link to="/token" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={"Server"} />
            </ListItem>
            </Link>

            <Link to="/projectList" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary={"Project List"} getProjectId/>
            </ListItem>
            </Link>


            <Link to="/projectInfo/{project_id}" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary={"Project Overview"} />
            </ListItem>
            </Link>

          <Link to="/overview/:project_id/{member_id}" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary={"Member Overview"} />
            </ListItem>
            </Link>

          <Link to="/Configurations" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary={"Configurations"} />
            </ListItem>
            </Link>
          </List>
        </Drawer>
        </Grid>

        <Container fixed>
          <Switch>
          <Route exact path="/token">
            <Container>
              <UrlToken test={test}/>
            </Container>
          </Route>

          <Route exact path="/projectList">
            <Container>
              <ProjectListPage test={test} onProjectIdChange={handleProjectIDChange}/>
            </Container>
          </Route>

          <Route exact path="/projectInfo/:project_id">
            <Grid container>
                <ProjectInfoPage test={test} onMemberIdChange={handleMemberIDChange} project_id={project_id} />
            </Grid>
          </Route>

          <Route exact path="/overview/:project_id/:member_id">
            <Container>
              <OverviewPage test={test} project_id={project_id} member_id={member_id}/>
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