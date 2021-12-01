import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {DASHBOARD_PATH} from "../config/path";
import {isLogin} from "../config/function";

const PublicRoute = ({component: Component, restricted, ...rest}) => {
    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route {...rest} render={props => (
            isLogin() && restricted ?
                <Redirect to={DASHBOARD_PATH} />
                : <Component {...props} />
        )} />
    );
};

export default PublicRoute;
