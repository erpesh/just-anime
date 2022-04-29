import './auth.css'
import React, {useContext} from 'react';
import AuthContext from "../../context/AuthContext";

const Login = ({setIsLoginActive, setIsModalActive}) => {
    const {loginUser} = useContext(AuthContext)

    return (
        <div className="login__container">
            <form onSubmit={loginUser} className="login__form">
                <p className="popup__header" style={{fontSize: '2rem', fontWeight: '800'}}>Login</p>
                <div className="field-container">
                    <input className="input__auth" type="text" name="username" placeholder="Username"/>
                </div>
                <div className="field-container">
                    <input className="input__auth" type="password" name="password" placeholder="Password"/>
                </div>
                <div className="field-container">
                    <input onClick={() => setIsModalActive(false)} type="submit" className="log-submit" value="Login"/>
                </div>
                <p className="question">Do not have an account?<span className="question-span" onClick={() => setIsLoginActive(false)}> Register here.</span></p>
            </form>

        </div>
    );
};

export default Login;