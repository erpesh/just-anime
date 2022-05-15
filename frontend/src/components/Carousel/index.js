import React from 'react';
import './carousel.css';
import PictureCarousel from "./PictureCarousel";

const Carousel = () => {
    return (
        <PictureCarousel>
            <div
            >
                <img className="carousel-image" alt="One Punch Man" src="https://wallpapercave.com/wp/wp6882964.jpg"/>
            </div>
            <div
                style={{background: "lightgreen"}}
            >
                <img className="carousel-image" alt="One Punch Man" src="https://wallpapercave.com/wp/wp8969483.jpg"/>
            </div>
            <div
                style={{background: "orange"}}
            >

            </div>
        </PictureCarousel>
    );
};

export default Carousel;