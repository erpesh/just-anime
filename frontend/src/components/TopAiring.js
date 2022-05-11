import React, {useEffect, useState} from 'react';
import AnimeCard from "./AnimeCard";

const TopAiring = () => {

    const [animeList, setAnimeList] = useState([])

    const getTopAiringAnime = async () => {
        const data = await fetch("https://api.jikan.moe/v4/top/anime?filter=airing")
            .then(response => response.json())
        setAnimeList(data.data)
    }

    useEffect(() => {
        getTopAiringAnime()
    }, [!animeList])

    return (
        animeList &&
        <>
            {animeList.filter((item, index) => index < 20).map(anime =>
                <AnimeCard
                    id={anime.mal_id}
                    title={anime.title}
                    img={anime.images.jpg.image_url}
                    _class={"slider-item"}
                />
            )}
        </>
    );
};

export default TopAiring;