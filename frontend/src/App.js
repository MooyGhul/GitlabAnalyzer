import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/Login';
import NotFound from './components/NotFound';
import './style/App.css'
import NavbarSide from './NavbarSide';

function App() {
  return (
    <BrowserRouter>
        <Switch>
            <Redirect exact from='/' to='/login' />
            <Route exact path='/login'> <Login /> </Route>
            <Route exact path='/token'> <NavbarSide /> </Route>
            <Route component={NotFound} />
        </Switch>
    </BrowserRouter>
  );
}

export default App;