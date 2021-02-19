import React from 'react';
import { Redirect, Route } from 'react-router-dom';
// import { isFullyLogin} from "./LoginStatus";

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest}) => {

    console.log("Did this work?");
    console.log({isAuthenticated});

    return(
        <Route {...rest} render={props => (
            isAuthenticated ?
                (<Component {...props} />)
                : (<Redirect to ="/login" />)
        )} />
    );
}

export default PrivateRoute;