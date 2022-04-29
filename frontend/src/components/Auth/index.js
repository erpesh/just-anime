import React from 'react';
import Register from "./Register";
import Login from "./Login";

const Auth = ({isLoginActive, setIsLoginActive, setIsModalActive}) => {

    return (
        <>
            {isLoginActive ? <Login
                setIsLoginActive={setIsLoginActive}
                setIsModalActive={setIsModalActive}/> :
                <Register
                    setIsLoginActive={setIsLoginActive}
                    setIsModalActive={setIsModalActive}/>}
        </>
    );
};

export default Auth;