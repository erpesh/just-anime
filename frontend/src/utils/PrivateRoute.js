import React, {useContext} from 'react';
import AuthContext from "../context/AuthContext";
import ProfilePage from "../pages/ProfilePage";
import {Navigate} from "react-router";

const PrivateRoute = ({children, ...rest}) => {
    const {user} = useContext(AuthContext)

    const NotAuthCase = () => {

        return (
            <Navigate to="/"/>
        )
    }

    return user? <ProfilePage/> : <Navigate to="/"/>

};

export default PrivateRoute;