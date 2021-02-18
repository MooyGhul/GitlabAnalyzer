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
//            <Route exact path='/login'> <Login /> </Route>
//            <Route exact path='/token'> <UrlToken /> </Route>
//            <Route exact path='/overview'> <OverviewPage /> </Route>
        </Switch>
    </BrowserRouter>

  );
}

export default App;