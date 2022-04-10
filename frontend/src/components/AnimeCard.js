import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import AnimeDataContext from "../context/AnimeDataContext";

const AnimeCard = ({anime}) => {

    const {getAnime} = useContext(AnimeDataContext)

    // const getAnime = async (animeId) => {
    //     const response = await fetch(`https://api.jikan.moe/v3/anime/${animeId}`
    //         // {
    //         // method : 'GET',
    //         // mode : "no-cors",
    //         // headers : {
    //         //     "Access-Control-Allow-Origin" : "*",
    //         //     "Access-Control-Allow-Credentials" : true
    //         // }}
    //     )
    //     // const string = await response.text();
    //     // const json = string === "" ? {} : JSON.parse(string);
    //     const data = await response.json()
    //
    //     console.log(data)
    // }


    const handleClick = (e) => {
        e.preventDefault()
        // getAnime(anime.mal_id)
    }

    return (
        <article onClick={handleClick}>
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