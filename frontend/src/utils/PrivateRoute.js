import React from 'react';
import HomePage from "../pages/HomePage";
import {Navigate} from "react-router";

const PrivateRoute = ({children, ...rest}) => {
    const auth = 1
    return auth? <HomePage/> : <Navigate to="/login" />

};

export default PrivateRoute;