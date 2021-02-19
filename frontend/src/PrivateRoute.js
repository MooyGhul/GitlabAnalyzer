import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Authentication from "./Authentication";

const PrivateRoute = ({ component: Component, ...rest}) => {

    console.log("Did this work?");


    return(
        <Route {...rest} render={props => (
            Authentication.isAuthenticated() ?
                (<Component {...props} />)
                : (<Redirect to ="/login" />)
        )} />
    );
}

export default PrivateRoute;