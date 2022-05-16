import React, {useEffect, useState} from 'react';
import './carousel.css';
import PictureCarousel from "./PictureCarousel";

const Carousel = () => {

    const [pageWidth, setPageWidth] = useState(window.innerWidth);

    function handleResize() {
        setPageWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        console.log(pageWidth);
        return () => window.removeEventListener('resize', handleResize);
    }, [pageWidth])

    return (<>
            <PictureCarousel size={4}>
                <div
                    style={{maxWidth: "100vw"}}
                >
                    <img className="carousel-background" alt="background"
                         src="https://t3.ftcdn.net/jpg/04/71/08/18/360_F_471081885_DML2ZXCsUstxpuJWAto1B262LDJw5cMq.jpg"/>
                    <img className="carousel-poster" src="https://cdn.myanimelist.net/images/anime/1074/111944l.jpg"
                         alt="Anime image"/>
                    <div className="carousel-text">
                        <p>No Game No Life</p>
                        Dive into the endless world of games with Sora and Shiro
                    </div>
                </div>
                <div
                    style={{maxWidth: "100vw"}}
                >
                    <img className="carousel-background" alt="background"
                         src="https://t3.ftcdn.net/jpg/04/71/08/18/360_F_471081885_DML2ZXCsUstxpuJWAto1B262LDJw5cMq.jpg"/>
                    <img className="carousel-poster" src="https://cdn.myanimelist.net/images/anime/10/78745l.jpg"
                         alt="Anime image"/>
                    <div className="carousel-text">
                        <p>My Hero Academia</p>
                        Become the strongest hero and defeat the villains with Midoriya
                    </div>
                </div>
                <div
                    style={{maxWidth: "100vw"}}
                >
                    <img className="carousel-background" alt="background"
                         src="https://t3.ftcdn.net/jpg/04/71/08/18/360_F_471081885_DML2ZXCsUstxpuJWAto1B262LDJw5cMq.jpg"/>
                    <img className="carousel-poster" src="https://cdn.myanimelist.net/images/anime/4/19644l.jpg"
                         alt="Anime image"/>
                    <div className="carousel-text">
                        <p>Cowboy Bebop</p>
                        Travel through space with professional bounty hunter Spike and his team
                    </div>
                </div>
                <div
                    style={{maxWidth: "100vw"}}
                >
                    <img className="carousel-background" alt="background"
                         src="https://t3.ftcdn.net/jpg/04/71/08/18/360_F_471081885_DML2ZXCsUstxpuJWAto1B262LDJw5cMq.jpg"/>
                    <img className="carousel-poster" src="https://cdn.myanimelist.net/images/anime/1295/106551l.jpg"
                         alt="Anime image"/>
                    <div className="carousel-text">
                        <p>Kaguya-sama: Love is War</p>
                        Watch the love battle between Kaguya and Miyuki - the best students of the elite school
                    </div>
                </div>
                <div style={{maxWidth: "100vw", position: 'relative'}}>
                    <img className="carousel-background" alt="background"
                         src="https://t3.ftcdn.net/jpg/04/71/08/18/360_F_471081885_DML2ZXCsUstxpuJWAto1B262LDJw5cMq.jpg"/>
                    <img className="carousel-poster" src="https://cdn.myanimelist.net/images/anime/1441/122795l.jpg"
                         alt="Anime image"/>
                    <div className="carousel-text"><span>55555555555555533333Spy x Family</span></div>
                </div>
            </PictureCarousel>
            {/*<PictureCarousel>*/}
            {/*    <div*/}
            {/*        style={{maxWidth:"100vw", position:"relative"}}*/}
            {/*    >*/}
            {/*        <img className="carousel-background" alt="background" src="https://t3.ftcdn.net/jpg/04/71/08/18/360_F_471081885_DML2ZXCsUstxpuJWAto1B262LDJw5cMq.jpg"/>*/}
            {/*        <img className="carousel-poster" src="https://cdn.myanimelist.net/images/anime/1074/111944l.jpg" alt="Anime image"/>*/}
            {/*        <div className="carousel-text">*/}
            {/*            <Link to={`/anime/19815`}>*/}
            {/*                <p>No Game No Life</p>*/}
            {/*                Dive into the endless world of games with Sora and Shiro*/}
            {/*            </Link>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div*/}
            {/*        style={{maxWidth:"100vw", position: 'relative'}}*/}
            {/*    >*/}
            {/*        <img className="carousel-background" alt="background" src="https://t3.ftcdn.net/jpg/04/71/08/18/360_F_471081885_DML2ZXCsUstxpuJWAto1B262LDJw5cMq.jpg"/>*/}
            {/*        <img className="carousel-poster" src="https://cdn.myanimelist.net/images/anime/1074/111944l.jpg" alt="Anime image"/>*/}
            {/*        <div className="carousel-text">*/}
            {/*            <Link to={`/anime/19815`}>*/}
            {/*                <p>No Game No Life</p>*/}
            {/*                Dive into the endless world of games with Sora and Shiro*/}
            {/*            </Link>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div*/}
            {/*        style={{background: "orange", maxWidth:"100vw"}}*/}
            {/*    >*/}
            {/*        <img className="carousel-background" alt="background" src="https://t3.ftcdn.net/jpg/04/71/08/18/360_F_471081885_DML2ZXCsUstxpuJWAto1B262LDJw5cMq.jpg"/>*/}
            {/*        <img className="carousel-poster" src="https://cdn.myanimelist.net/images/anime/1074/111944l.jpg" alt="Anime image"/>*/}
            {/*        <div className="carousel-text">*/}
            {/*            <Link to={`/anime/19815`}>*/}
            {/*                <p>No Game No Life</p>*/}
            {/*                Dive into the endless world of games with Sora and Shiro*/}
            {/*            </Link>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</PictureCarousel>*/}
        </>
    );
};

export default Carousel;