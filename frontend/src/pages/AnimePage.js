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
        animeData.type === 'fetchError' ? (<div className="page">Page does not exist</div>) :
            (
                <div className="page">
                    <div className="main-anime-container">
                        <div className="anime-page-title">
                            <h1>{animeData.title_english ? animeData.title_english : animeData.title}</h1>
                        </div>
                        <div className="anime-image-block">
                            <div className="anime-image-div">
                                <img className="anime-image" src={animeData.image_url} alt="Anime picture"/>
                            </div>
                        </div>
                        <div className="anime-states-block">
                            <AnimeStatesPopup animeData={animeData}/>
                        </div>
                        <div className="anime-info-block">
                            <div className="anime-page-text">Type: {animeData.type}</div>

                            {animeData.episodes ?
                                <div className="anime-page-text">Episodes: {animeData.episodes}</div> : null}

                            <div className="anime-page-text">Status: {animeData.status}</div>

                            {animeData.aired.prop.from.year ?
                                <div className="anime-page-text">
                                    <span>{"Year: ".concat(animeData.aired.prop.from.year)}</span>
                                </div> : null}

                            <div className="anime-page-text">Genres: {
                                animeData.genres.map((genre, index) => {
                                    return index === animeData.genres.length - 1 ? (
                                        <span key={genre.mal_id}> {genre.name}</span>) : (
                                        <span key={genre.mal_id}> {genre.name}, </span>)
                                })
                            }</div>

                            {animeData.duration &&
                            <div className="anime-page-text"><span>Duration: {animeData.duration}</span></div>}
                            {/*</div>*/}
                            {/*<div className="anime-info2-block">*/}

                            {animeData.score ? <div className="anime-page-text">
                                <span>Score: {animeData.score}</span>
                            </div> : null}

                            {animeData.rank ? <div className="anime-page-text">
                                <span>Rank: #{animeData.rank}</span>
                            </div> : null}

                            {animeData.popularity ? <div className="anime-page-text">
                                <span>Popularity: #{animeData.popularity}</span>
                            </div> : null}

                            {animeData.rating &&
                            <div className="anime-page-text"><span>Rating: {animeData.rating}</span></div>}

                            {animeData.studios[0] &&
                            <div className="anime-page-text"><span>Studio: {animeData.studios[0].name}</span></div>}

                            {animeData.source &&
                            <div className="anime-page-text"><span>Source: {animeData.source}</span></div>}

                        </div>
                        <div className="anime-trailer-block">
                            {animeData.trailer_url ? <span className="trailer-text"><iframe className="anime-iframe"
                                                                                            src={animeData.trailer_url}></iframe></span> :
                                <span className="anime-page-p-text">
                            </span>}
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
