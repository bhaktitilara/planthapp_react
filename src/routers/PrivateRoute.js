import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { LOGIN_PATH} from "../config/path";
import {getRole, isLogin} from "../config/function";
import Unauthorized from "../components/permission/Unauthorize";
import {ROLE_ADMIN} from "../config/const";

const PrivateRoute = ({component: Component, isAdmin, ...rest }) => {

    return (
        <Route
            {...rest}
            render={(props) =>
                !isLogin() ? (
                    <Redirect to={LOGIN_PATH} />
                ) : isAdmin && getRole() === ROLE_ADMIN ? <Unauthorized/> : (
                    <Component {...props} />
                )
            }
        />
    )
}

export default PrivateRoute
