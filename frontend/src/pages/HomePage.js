import React from 'react';
import TopAiring from "../components/TopAiring";
import Carousel from "../components/Carousel";
import Slider from "../components/Slider";

const HomePage = () => {

    return (
        <div className="home-page">
            {/*<TopAiring/>*/}
            {/*<Carousel/>*/}
            <Slider>
                <TopAiring/>
                {/*<div*/}
                {/*    style={{background: "deepskyblue", padding: "20px"}} className="slider-item"*/}
                {/*>*/}
                {/*    Text*/}
                {/*</div>*/}
                {/*<div*/}
                {/*    style={{background: "lightgreen", padding: "20px"}} className="slider-item"*/}
                {/*>*/}
                {/*    Text*/}
                {/*</div>*/}
                {/*<div*/}
                {/*    style={{background: "orange", padding: "20px"}} className="slider-item"*/}
                {/*>*/}
                {/*    Text*/}
                {/*</div>*/}
                {/*<div*/}
                {/*    style={{background: "deepskyblue", padding: "20px"}} className="slider-item"*/}
                {/*>*/}
                {/*    Text*/}
                {/*</div>*/}
                {/*<div*/}
                {/*    style={{background: "lightgreen", padding: "20px"}} className="slider-item"*/}
                {/*>*/}
                {/*    Text*/}
                {/*</div>*/}
                {/*<div*/}
                {/*    style={{background: "orange", padding: "20px"}} className="slider-item"*/}
                {/*>*/}
                {/*    Text*/}
                {/*</div>*/}
                {/*<div*/}
                {/*    style={{background: "deepskyblue", padding: "20px"}} className="slider-item"*/}
                {/*>*/}
                {/*    Text*/}
                {/*</div>*/}
                {/*<div*/}
                {/*    style={{background: "lightgreen", padding: "20px"}} className="slider-item"*/}
                {/*>*/}
                {/*    Text*/}
                {/*</div>*/}
                {/*<div*/}
                {/*    style={{background: "orange", padding: "20px"}} className="slider-item"*/}
                {/*>*/}
                {/*    Text*/}
                {/*</div>*/}
            </Slider>
        </div>
);
};

export default HomePage;