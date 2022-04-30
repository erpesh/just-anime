import React from 'react';
import Register from "./Register";
import Login from "./Login";
import {CSSTransition, SwitchTransition} from "react-transition-group";

const Auth = ({isLoginActive, setIsLoginActive, setIsModalActive}) => {

    return (
        <>
            <SwitchTransition mode="out-in">
                <CSSTransition
                    timeout={300}
                    key={isLoginActive}
                    classNames="sign"
                >
                    {isLoginActive ?
                        <Login
                            setIsLoginActive={setIsLoginActive}
                            setIsModalActive={setIsModalActive}/> :
                        <Register
                            setIsLoginActive={setIsLoginActive}
                            setIsModalActive={setIsModalActive}/>}
                </CSSTransition>
            </SwitchTransition>
        </>
    );
};

export default Auth;