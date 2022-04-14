import React, {useContext} from 'react';
import {Link} from "react-router-dom";

const AnimeCard = ({anime}) => {

    return (
        <article className="cards__img">
            <Link to={`/anime/${anime.mal_id}`}>
                <img
                    className="anime-card-image"
                    src={anime.image_url}
                    alt="Anime image"/>
                <figcaption className="figcaption">
                    <span className="anime-card-title">{anime.title}</span>
                </figcaption>
            </Link>
        </article>
    );
};

export default AnimeCard;