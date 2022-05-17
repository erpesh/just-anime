import React, {useEffect, useState} from 'react';
import TopAiring from "../components/Slider/TopAiring";
import Slider from "../components/Slider";
import Carousel from "../components/Carousel";

const HomePage = () => {

    const [pageWidth, setPageWidth] = useState(window.innerWidth);

    function handleResize() {
        setPageWidth(window.innerWidth);
    }
    const fet = async () => {
        const data = await fetch("https://api.jikan.moe/v4/watch/promos/popular")
            .then(response => response.json())
    }

    useEffect(() => {
        fet()
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [pageWidth])

    return (
        <div className="home-page">
            <Carousel pageWidth={pageWidth}/>
            <div style={{maxWidth: pageWidth < 400 ? `${pageWidth * 0.95}px` : `${pageWidth * 0.81}px`}} className="top-airing">
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