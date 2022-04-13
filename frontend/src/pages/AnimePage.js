import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router";
import AnimeStatesPopup from "../components/AnimeStatesPopup";
import AnimeDataContext from "../context/AnimeDataContext";
import AuthContext from "../context/AuthContext";

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
                <div className="main-container">
                    <div className="title">
                        <h1>{animeData.title_english ? animeData.title_english : animeData.title}</h1>
                    </div>
                    <div>
                        <img src={animeData.image_url} alt="Anime picture"/>
                        <AnimeStatesPopup animeData={animeData}/>
                    </div>
                    <div>
                        <article>
                            <div>
                                <p><span className="bold-span">Japanese title: </span>{animeData.title_japanese}</p>
                            </div>
                            {animeData.aired.prop.from.year? <div><h3>{"Year: ".concat(animeData.aired.prop.from.year)}</h3></div> : null}
                            {animeData.score? <div>
                                <h3>Score: {animeData.score} </h3>
                                <p>by {animeData.scored_by} users</p>
                            </div>: null}
                            {animeData.rank? <div>
                                <h3>Rank: #{animeData.rank}</h3>
                            </div> : null}
                            {animeData.popularity ? <div>
                                <h3>Popularity: #{animeData.popularity}</h3>
                            </div> : null}
                        </article>
                    </div>
                    <main>
                        {animeData.synopsis}
                    </main>
                    <div>
                        <p>Type: {animeData.type}</p>
                        {animeData.episodes? <p>Episodes: {animeData.episodes}</p> : null}
                        <p>Status: {animeData.status}</p>
                        <p>Genres: {
                            animeData.genres.map((genre, index) => {
                                return index === animeData.genres.length - 1 ? (
                                    <span key={genre.mal_id}> {genre.name}.</span>) : (
                                    <span key={genre.mal_id}> {genre.name}, </span>)
                            })
                        }
                        </p>
                    </div>
                </div>
            )
    )
};

export default AnimePage;
