import React from 'react';
import TopAiring from "../components/Slider/TopAiring";
import Slider from "../components/Slider";
import Carousel from "../components/Carousel";

const HomePage = () => {

    return (
        <div className="home-page">
            <Carousel/>
            <div className="top-airing">
                <div className="airing-header">
                    Popular airing Animes
                </div>
                <Slider>
                    <TopAiring/>
                </Slider>
            </div>

        </div>
);
};

export default HomePage;