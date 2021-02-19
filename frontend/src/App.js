import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/Login';
import UrlToken from './components/UrlToken';
import OverviewPage from './OverviewPage';
import PrivateRoute from './PrivateRoute';
import NotFound from './components/NotFound';

function App() {

  return (
    <BrowserRouter>
        <Switch>
            <Redirect exact from='/' to='/login' />
            <Route exact path='/login'> <Login /> </Route>
            <Route exact path='/token'> <UrlToken /> </Route>
            <PrivateRoute path='/overview' component={OverviewPage} />
            <Route component={NotFound} />
        </Switch>
    </BrowserRouter>

  );
}

export default App;