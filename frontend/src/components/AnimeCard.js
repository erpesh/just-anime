import React, {useContext} from 'react';
import {Link} from "react-router-dom";

const AnimeCard = ({anime}) => {

    return (
        <article>
            <Link to={`/anime/${anime.mal_id}`}>
                <figure>
                    <img
                    src={anime.image_url}
                    alt="Anime image"/>
                </figure>
                <h3>{anime.title}</h3>
            </Link>
        </article>
    );
};

export default AnimeCard;