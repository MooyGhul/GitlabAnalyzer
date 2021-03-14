import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/Login';
import UrlToken from './components/UrlToken';
import ProjectListPage from './ProjectListPage';
import OverviewPage from './OverviewPage';
import PrivateRoute from './PrivateRoute';
import ProjectInfoPage from './ProjectInfoPage/ProjectInfoPage';
import CommentContributionPage from './components/CommentContributionPage/CommentContributionPage'
import IssueContributionPage from './components/IssueContribution/IssueContributionPage';
import NotFound from './components/NotFound';
import './style/App.css'

function App() {

  return (
    <BrowserRouter>
        <Switch>
            <Redirect exact from='/' to='/login' />
            <Route exact path='/login'> <Login /> </Route>
            <Route exact path='/token'> <UrlToken /> </Route>
            <PrivateRoute exact path='/projectList' component={ProjectListPage} />
            <PrivateRoute exact path='/projectInfo/:projectId' component={ProjectInfoPage} />
            <PrivateRoute exact path='/overview/:project_id/:member_id' component={OverviewPage} />
            <PrivateRoute exact path='/overview/:project_id/:member_id/commentContribution' component={CommentContributionPage} />
            <PrivateRoute exact path='/overview/:project_id/:member_id/issueContribution' component={IssueContributionPage} />
            <Route exact path='/project/:project_id/:member_id/codecontributions' component={CodeContributionPage} />
          <Route component={NotFound} />
        </Switch>
    </BrowserRouter>
  );
}

export default App;