import React from "react";
import { useSelector } from "react-redux";
import { Route,Redirect } from "react-router-dom";

interface authRouteProps {
    roles: string[];
    [x: string]: any;
}

const AuthRoute: React.FC<authRouteProps> = ({ roles, ...routeProps }) => {
    const user = useSelector((state:any) => state.user.currUser);
    if(user && user.role && roles.includes(user.role)){
        return <Route {...routeProps} />
    }
    return <Redirect to="/sign-in" />
}

export default AuthRoute;