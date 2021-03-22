import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import {getDisplayDate} from '@material-ui/pickers/_helpers/text-field-helper';
import {
  Drawer, List, ListItem, 
  ListItemIcon, ListItemText,
  Container, Typography,
  Grid
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home"
import InfoIcon from "@material-ui/icons/Info";
import ProjectInfoPage from './ProjectInfoPage/ProjectInfoPage';

import Login from './components/Login';
import UrlToken from './components/UrlToken';
import ProjectListPage from './ProjectListPage';
import OverviewPage from './OverviewPage';
import PrivateRoute from './PrivateRoute';
import CodeContributionPage from "./components/CodeContributionsPage/CodeContributionPage";
import CommentContributionPage from './components/CommentContributionPage/CommentContributionPage'
import IssueContributionPage from './components/IssueContribution/IssueContributionPage';
import NotFound from './components/NotFound';

const useStyles = makeStyles((theme) => ({
  drawerPaper: {width: 'inherit'},
  link: {
    textDecoration: 'none', 
    color: theme.palette.text.primary
  }
}));

const NavbarSide = () => {
  const classes = useStyles();
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
            <Link to="/" className={classes.link}>
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
              <ListItemText primary={"Project List"} />
            </ListItem>
            </Link>


            <Link to="/projectInfo/:projectId" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary={"Project Overview"} />
            </ListItem>
            </Link>

          <Link to="/overview/:project_id/:member_id" className={classes.link}>
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
          <Route exact path="/">
            <Container>
              {/* Server */}
              <UrlToken />
            </Container>
          </Route>

          <Route exact path="/projectList">
            <Container>
              <ProjectListPage />
            </Container>
          </Route>

          <Route exact path="/projectInfo/:projectId">
            <Grid container>
                <ProjectInfoPage />
            </Grid>
          </Route>

          <Route exact path="/overview/:project_id/:member_id">
            <Container>
              <OverviewPage />
              {/* Member Overview */}
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