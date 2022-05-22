import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router";
import AnimeStatesButton from "../components/AnimeStatesButton";
import AnimeDataContext from "../context/AnimeDataContext";

const AnimePage = ({setIsModalActive}) => {
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
                            <AnimeStatesButton animeData={animeData} setIsModalActive={setIsModalActive}/>
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

                            {!!animeData.genres.length && <div className="anime-page-text" onClick={() => console.log(animeData.genres)}>Genres: {
                                animeData.genres.map((genre, index) => {
                                    return index === animeData.genres.length - 1 ? (
                                        <span key={genre.mal_id}> {genre.name}</span>) : (
                                        <span key={genre.mal_id}> {genre.name}, </span>)
                                })
                            }</div>}
                            {animeData.themes.length !== 0 && <div className="anime-page-text">Themes:
                                {
                                    animeData.themes.map((theme, index) => {
                                        return index === animeData.themes.length - 1 ? (
                                            <span key={theme.mal_id}> {theme.name}</span>) : (
                                            <span key={theme.mal_id}> {theme.name}, </span>)
                                    })
                                }
                            </div>}

                            {animeData.duration &&
                            <div className="anime-page-text"><span>Duration: {animeData.duration}</span></div>}

                            {animeData.score ? <div className="anime-page-text">
                                <span>Score: {animeData.score}</span>
                            </div> : null}

                            {animeData.rank ? <div className="anime-page-text">
                                <span>Rank: #{animeData.rank}</span>
                            </div> : null}

                            {animeData.popularity ? <div className="anime-page-text">
                                <span>Popularity: #{animeData.popularity}</span>
                            </div> : null}

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
