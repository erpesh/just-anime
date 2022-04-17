import React, {useContext} from 'react';
import AuthContext from "../context/AuthContext";
import {Link} from "react-router-dom";

const LoginPage = () => {
    const {loginUser} = useContext(AuthContext)

    return (
        <div className="page">
            <form onSubmit={loginUser}>
                <input type="text" name="username" placeholder="Enter Username"/>
                <input type="password" name="password" placeholder="Enter Password"/>
                <input type="submit"/>
            </form>
            <p>Do not have an account? You can <Link to="/register"> register.</Link>

            </p>
        </div>
)}

export default LoginPage;