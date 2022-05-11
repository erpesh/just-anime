import React from 'react';
import {Link} from "react-router-dom";

const AnimeCard = ({title, img, id, _class}) => {

    return (
        <div className={_class || ""}>
            <article className="cards__img">
                <Link to={`/anime/${id}`}>
                    <img
                        className="anime-card-image"
                        src={img}
                        alt="Anime image"/>
                    <figcaption className="figcaption">
                        <span className="anime-card-title">{title.length < 21 ? title : title.slice(0, 18).concat("...")}</span>
                    </figcaption>
                </Link>
            </article>
        </div>

    );
};

export default AnimeCard;