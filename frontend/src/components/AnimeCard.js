import React from 'react';
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
                    <span
                        className="anime-card-title">{title}</span>
                    {/*{title.length < 21 ? title : title.slice(0, 18).concat("...")}*/}
                </figcaption>
            </Link>
        </article>
    );
};

export default AnimeCard;