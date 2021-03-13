import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/Login';
import UrlToken from './components/UrlToken';
import ProjectListPage from './ProjectListPage';
import OverviewPage from './OverviewPage';
import PrivateRoute from './PrivateRoute';
import ProjectInfoPage from './ProjectInfoPage/ProjectInfoPage';
import NotFound from './components/NotFound';
import CodeContributionPage from "./components/CodeContributionsPage/CodeContributionPage";
import './style/App.css'

function App() {

  return (
    <BrowserRouter>
        <Switch>
            <Redirect exact from='/' to='/login' />
            <Route exact path='/login'> <Login /> </Route>
            <Route exact path='/token'> <UrlToken /> </Route>
            <PrivateRoute path='/projectList' component={ProjectListPage} />
            <PrivateRoute path='/projectInfo/:project_id' component={ProjectInfoPage} />
            <PrivateRoute path='/overview/:project_id/:member_id' component={OverviewPage} />
            <Route exact path='/codecontributions' component={CodeContributionPage} />
          <Route component={NotFound} />
        </Switch>
    </BrowserRouter>
  );
}

export default App;