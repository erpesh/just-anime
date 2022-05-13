import React from 'react';
import TopAiring from "../components/Slider/TopAiring";
import Slider from "../components/Slider";

const HomePage = () => {

    return (
        <div className="home-page">
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