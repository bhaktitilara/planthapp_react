import React, {lazy, Suspense} from 'react'
import {BrowserRouter, Switch} from 'react-router-dom'
// import Layout from "../layout/PrivateLayout";
import RouteLoader from "../common/loader/RouteLoader";
import PrivateRoute from './PrivateRoute';
import routes from './routes'
import PublicRoute from "./PublicRoute";
// import NotFound from "../components/permission/NotFound";

const AppRouter = () => {
    return (
        (
            <BrowserRouter>
                <Suspense fallback={<RouteLoader/>}>
                    <Switch>
                        {routes.map((route, key) => {
                            const {path, exact, isPrivate, component, restricted, isAdmin} = route
                            const props = {
                                key,
                                path,
                                exact,
                                component: lazy(() => new Promise(resolve => setTimeout(() => resolve(component), 200)))
                            }
                            return isPrivate ? <PrivateRoute isAdmin={isAdmin} {...props} /> : <PublicRoute restricted={restricted} {...props} />
                        })}
                    </Switch>
                </Suspense>
            </BrowserRouter>
        )
    )
}

export default AppRouter
