import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/Login';
import UrlToken from './components/UrlToken';
import OverviewPage from './OverviewPage';
function App() {

  return (
    <BrowserRouter>
        <Switch>
            <Redirect exact from='/' to='/login' />
            <Route exact path='/login' component={Login} />
            <Route exact path='/token' component={UrlToken} />
            <Route exact path='/overview' component={OverviewPage} />
        </Switch>
    </BrowserRouter>

  );
}

export default App;