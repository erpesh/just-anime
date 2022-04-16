import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router";
import AnimeStatesPopup from "../components/AnimeStatesPopup";
import AnimeDataContext from "../context/AnimeDataContext";

const AnimePage = () => {
    const {id} = useParams()
    const {animeData, getAnime} = useContext(AnimeDataContext)
    const [dummy, setDummy] = useState(false)


    useEffect(() => {
        getAnime(id);
        setDummy(!dummy)
    }, [])

    return animeData.mal_id == id && (
        animeData.type === 'fetchError' ? (<p>Page does not exist</p>) :
            (
                <div className="main-anime-container">
                    <div className="anime-page-title">
                        <h1>{animeData.title_english ? animeData.title_english : animeData.title}</h1>
                    </div>
                    <div className="anime-image-block">
                        <div className="anime-image-div">
                            <img className="anime-image" src={animeData.image_url} alt="Anime picture"/>
                        </div>
                        <AnimeStatesPopup animeData={animeData}/>
                    </div>
                    <div className="anime-page-info">
                        <div className="anime-info-block">
                            <p className="anime-page-p-text">Type: {animeData.type}</p>
                            {animeData.episodes ?
                                <p className="anime-page-p-text">Episodes: {animeData.episodes}</p> : null}
                            <p className="anime-page-p-text">Status: {animeData.status}</p>
                            {animeData.aired.prop.from.year ?
                                <div><span
                                    className="anime-page-p-text">{"Year: ".concat(animeData.aired.prop.from.year)}</span>
                                </div> : null}
                            <p className="anime-page-p-text">Genres: {
                                animeData.genres.map((genre, index) => {
                                    return index === animeData.genres.length - 1 ? (
                                        <span className="anime-page-p-text"
                                              key={genre.mal_id}> {genre.name}.</span>) : (
                                        <span className="anime-page-p-text" key={genre.mal_id}> {genre.name}, </span>)
                                })
                            }
                            </p>
                        </div>
                        <div className="anime-ranking-block">
                            <article>
                                {animeData.score ? <div>
                                    <span className="anime-page-p-text">Score: {animeData.score}</span>
                                </div> : null}
                                {animeData.rank ? <div>
                                    <span className="anime-page-p-text">Rank: #{animeData.rank}</span>
                                </div> : null}
                                {animeData.popularity ? <div>
                                    <span className="anime-page-p-text">Popularity: #{animeData.popularity}</span>
                                </div> : null}
                                {animeData.rating &&
                                <div><span className="anime-page-p-text">Rating: {animeData.rating}</span></div>}
                                {animeData.duration &&
                                <div><span className="anime-page-p-text">Duration: {animeData.duration}</span></div>}
                            </article>
                        </div>
                        <div className="anime-synopsis-block">
                            {animeData.synopsis}
                        </div>
                    </div>
                </div>
            )
    )
};

export default AnimePage;
