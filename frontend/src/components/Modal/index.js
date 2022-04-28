import React from 'react';
import './modal.css';

const Modal = ({isModalActive, setIsModalActive}) => {
    console.log(isModalActive)
    return (
        <div className={isModalActive ? "modal active" : "modal"} onClick={() => setIsModalActive(false)}>
            <div className={isModalActive ? "modal__container active" : "modal__container"} onClick={event => event.stopPropagation()}>

            </div>
        </div>
    );
};

export default Modal;