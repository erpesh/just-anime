import React, {useContext} from 'react';
import HomePage from "../pages/HomePage";
import AuthContext from "../context/AuthContext";

const PrivateRoute = ({children, ...rest}) => {
    const {user} = useContext(AuthContext)
    return user? <HomePage isAuth/> : <HomePage/>

};

export default PrivateRoute;