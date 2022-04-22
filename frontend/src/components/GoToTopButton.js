import React, {useState} from 'react';
import styled from 'styled-components'
import {FaArrowCircleUp} from "react-icons/fa";

export const Button = styled.div`
   position: fixed; 
   width: 100%;
   height: 100px;  
   left: 50%;
   bottom: 40px;
   font-size: 3rem;
   z-index: 1;
   cursor: pointer;
   color: green;
`

const GoToTopButton = () => {

    const [visible, setVisible] = useState(false)
    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300){
            setVisible(false)
        }
        else if (scrolled <= 300){
            setVisible(true)
        }
    };

    const scrollToTop = () =>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
            /* you can also use 'auto' behaviour
               in place of 'smooth' */
        });
    };

    window.addEventListener('scroll', toggleVisible);

    return (
        <div>
        <Button>
            <FaArrowCircleUp onClick={scrollToTop}
                             style={{display: visible ? 'inline' : 'none'}} />
        </Button>
        </div>
    );

};

export default GoToTopButton;