import React, {useEffect, useState} from 'react';
import styled from 'styled-components'
import {FaAngleDoubleUp, FaArrowCircleUp} from "react-icons/fa";


const GoToTopButton = () => {

    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 1000){
            setVisible(true)
        }
        else if (scrolled <= 1000){
            setVisible(false)
        }
    };

    const scrollToTop = () =>{
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisible);
        return function () {
            window.removeEventListener("scroll", toggleVisible)
        }
    }, [])

    return (
        <div className="go-to-top-div">
            <FaAngleDoubleUp onClick={scrollToTop}
                             style={{display: visible ? 'inline' : 'none'}}
                             color={"red"}/>
        </div>
    );

};

export default GoToTopButton;