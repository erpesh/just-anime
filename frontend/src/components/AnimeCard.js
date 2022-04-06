import React from 'react';

const AnimeCard = ({anime}) => {
    return (
        <article>
            <a
            href={anime.url}
            target="_blank"
            rel="noreferrer">
                <figure>
                    <img
                    src={anime.image_url}
                    alt="Anime image"/>
                </figure>
                <h3>{anime.title}</h3>
            </a>
        </article>
    );
};

export default AnimeCard;