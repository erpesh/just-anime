import React, {useEffect, useState} from 'react';
import AnimeCard from "./AnimeCard";

const TopAiring = () => {

    const [animeList, setAnimeList] = useState([])

    const getTopAiringAnime = async () => {
        const data = await fetch("https://api.jikan.moe/v3/top/anime/1/airing")
            .then(response => response.json())
        setAnimeList(data.top)
    }

    useEffect(() => {
        getTopAiringAnime()
    })

    return (
        animeList && <div className="top-airing-container">
            <div className="top-airing-title-div">
                <span className="top-airing-title-span">Top Airing</span>
            </div>
            <div className="top-airing-cards">
                {animeList.filter((item, index) => index < 6).map(anime => <AnimeCard  anime={anime}/>)}
            </div>
        </div>
    );
};

export default TopAiring;