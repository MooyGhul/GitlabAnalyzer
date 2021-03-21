import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import {getDisplayDate} from '@material-ui/pickers/_helpers/text-field-helper';
import {
  Drawer, List, ListItem, 
  ListItemIcon, ListItemText,
  Container, Typography
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
      <div style={{display: 'flex'}}>
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

            <Link to="/about" className={classes.link}>
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

          <Link to="/about" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary={"Member Overview"} />
            </ListItem>
            </Link>

          <Link to="/about" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary={"Configurations"} />
            </ListItem>
            </Link>
          </List>
        </Drawer>

        <Switch>
          <Route exact path="/">
            <Container>
              {/* Server */}
              <UrlToken />
            </Container>
          </Route>

          <Route exact path="/about">
            <Container>
              Project List
            </Container>
          </Route>

          <Route exact path="/projectInfo/:projectId">
            <Container>
              <ProjectInfoPage />
            </Container>
          </Route>

          <Route exact path="/Member_Overview">
            <Container>
              Member Overview
            </Container>
          </Route>

          <Route exact path="/about">
            <Container>
              Configurations
            </Container>
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default NavbarSide;