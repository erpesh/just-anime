import React, {useEffect, useState} from 'react';
import Carousel from "../components/Carousel";
import RecentEpisodes from "../components/RecentEpisodes";
import Slider from "../components/Slider";

const HomePage = () => {

    const [pageWidth, setPageWidth] = useState(window.innerWidth);

    function handleResize() {
        setPageWidth(window.innerWidth);
    }

    function calculateSliderWidth() {
        if (pageWidth > 1125) {
            return 5*190 + 4*30;
        }else if(pageWidth > 900){
            return 4*190 + 3*30;
        }else if(pageWidth > 660){
            return 3*190 + 2*30;
        }else if(pageWidth > 450){
            return 2*190 + 2*15;
        }else if(pageWidth > 300){
            return 2*140 + 2*10;
        }
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [pageWidth])

    return (
        <div className="home-page">
            <Carousel pageWidth={pageWidth}/>
            <Slider calculateWidth={calculateSliderWidth}/>
            <RecentEpisodes calculateWidth={calculateSliderWidth}/>
        </div>
);
};

export default HomePage;