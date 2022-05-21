import React from 'react';
import TopAiring from "./TopAiring";
import SliderContainer from "./SliderContainer";

const Slider = ({calculateWidth}) => {
    return (
        <div style={{maxWidth: calculateWidth()}} className="top-airing">
            <div className="airing-header">
                <span>Season Anime</span>
            </div>
            <SliderContainer>
                <TopAiring/>
            </SliderContainer>
        </div>
    );
};

export default Slider;