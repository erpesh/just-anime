import React, {useContext} from 'react';
import HomePage from "../pages/HomePage";
import {Navigate} from "react-router";
import AuthContext from "../context/AuthContext";

const PrivateRoute = ({children, ...rest}) => {
    const {user} = useContext(AuthContext)
    return user? <HomePage/> : <Navigate to="/login" />

};

export default PrivateRoute;