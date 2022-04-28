import React, {useContext} from 'react';
import AuthContext from "../context/AuthContext";
import {Link} from "react-router-dom";

const LoginPage = () => {
    const {loginUser} = useContext(AuthContext)

    return (
        <div className="login-page">
            <main className="login-page-main">
                <form onSubmit={loginUser}>
                    <input type="text" name="username" placeholder="Enter Username"/>
                    <input type="password" name="password" placeholder="Enter Password"/>
                    <input type="submit" className="log-submit" value="my-friend"/>
                </form>
                <p>Do not have an account? You can <Link to="/register"> register.</Link>

                </p>
            </main>
            <aside className="login-aside">
            </aside>
        </div>
)}

export default LoginPage;