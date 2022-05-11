import React from 'react';
import './carousel.css';
import PictureCarousel from "./PictureCarousel";

const Carousel = () => {
    return (
        <PictureCarousel>
            <div
                style={{background: "deepskyblue"}}
            >

            </div>
            <div
                style={{background: "lightgreen"}}
            >

            </div>
            <div
                style={{background: "orange"}}
            >

            </div>
        </PictureCarousel>
    );
};

export default Carousel;