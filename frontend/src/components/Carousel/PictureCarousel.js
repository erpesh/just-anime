import React, {useState, cloneElement} from 'react';
import {FaChevronLeft, FaChevronRight} from "react-icons/fa";

const PictureCarousel = ({children, size}) => {

    const [active, setActive] = useState(0);

    return (
        <div className="carousel-div">
            {children.map((el, index) => {
                return cloneElement(el, {
                    className: `slide${active === index ? " active-slide" : ''}`,
                    key: index
                });
            })}
            <div className="slider-button carousel-left-button"
                 onClick={() => setActive(prevState => {
                     return prevState === 0 ? size - 1 : prevState - 1})}>
                <FaChevronLeft size={50} opacity={.7}/>
            </div>
            <div className="slider-button carousel-right-button"
                 onClick={() => setActive(prevState => {
                     return active === size - 1 ? 0 : prevState + 1})}>
                <FaChevronRight size={50} opacity={.7}/>
            </div>
        </div>
    );
};

export default PictureCarousel;