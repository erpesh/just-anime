import React from 'react';
import './modal.css';
import Auth from "../Auth";

const Modal = ({isModalActive, setIsModalActive, setIsLoginActive, isLoginActive}) => {
    return (
        <div className={isModalActive ? "modal active" : "modal"} onClick={() => setIsModalActive(false)}>
            <div className={isModalActive ? "modal__container active" : "modal__container"} onClick={event => event.stopPropagation()}>
                <Auth isLoginActive={isLoginActive} setIsLoginActive={setIsLoginActive} setIsModalActive={setIsModalActive}/>
            </div>
        </div>
    );
};

export default Modal;