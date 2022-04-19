import React, {useContext} from 'react';
import {Link} from "react-router-dom";

const AnimeCard = ({title, img, id}) => {

    return (
        <article className="cards__img">
            <Link to={`/anime/${id}`}>
                <img
                    className="anime-card-image"
                    src={img}
                    alt="Anime image"/>
                <figcaption className="figcaption">
                    <span className="anime-card-title">{title}</span>
                </figcaption>
            </Link>
        </article>
    );
};

export default AnimeCard;