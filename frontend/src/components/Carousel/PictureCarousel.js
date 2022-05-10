import React, {useEffect, useState, cloneElement} from 'react';
import {FaChevronLeft, FaChevronRight} from "react-icons/fa";

const PictureCarousel = ({children}) => {

    const [active, setActive] = useState(0);

    useEffect(() => {
        console.log(children);
        // children[0].props.className = "abudhabi"
        // console.log(children);
    }, [])

    return (
        <div className="carousel-div">
            {children.map((el, index) => {
                return cloneElement(el, {
                    className: `slide${active === index ? " active-slide" : ''}`,
                    key: index
                });
            })}
            <div className="slider-button carousel-left-button"
                 onClick={() => setActive(prevState => prevState === 2 ? 0 : prevState + 1)}>
                <FaChevronLeft size={50} opacity={.7}/>
            </div>
            <div className="slider-button carousel-right-button"
                 onClick={() => setActive(prevState => prevState === 0 ? 2 : prevState - 1)}>
                <FaChevronRight size={50} opacity={.7}/>
            </div>
        </div>
    );
};

export default PictureCarousel;