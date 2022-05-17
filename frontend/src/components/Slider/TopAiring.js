import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";

const TopAiring = () => {

    const [animeList, setAnimeList] = useState([])

    const getTopAiringAnime = async () => {
        const data = await fetch("https://api.jikan.moe/v4/top/anime?filter=airing")
            .then(response => response.json())
        setAnimeList(data.data)
    }

    useEffect(() => {
        getTopAiringAnime()
    }, [])

    return (
        animeList &&
        <>
            {animeList.filter((item, index) => index < 20).map(anime =>
                <article className="slider-item-article" key={anime.mal_id}>
                    <Link to={`/anime/${anime.mal_id}`}>
                        <img
                            className="slider-item-image"
                            src={anime.images.jpg.image_url}
                            alt="Anime image"/>
                        <figcaption className="figcaption">
                            <span className="anime-card-title">
                                {anime.title.length < 21 ? anime.title : anime.title.slice(0, 18).concat("...")}
                            </span>
                        </figcaption>
                    </Link>
                </article>
            )}
        </>
    );
};

export default TopAiring;