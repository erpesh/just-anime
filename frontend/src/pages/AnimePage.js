import React, {useContext, useEffect, useReducer, useState} from 'react';
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
                <div>
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
                            <div>
                                <h3>Year: {animeData.aired.prop.from.year}</h3>
                            </div>
                            <div>
                                <h3>Score: {animeData.score} </h3>
                                <p>by {animeData.scored_by} users</p>
                            </div>
                            <div>
                                <h3>Rank: #{animeData.rank}</h3>
                            </div>
                            <div>
                                <h3>Popularity: #{animeData.popularity}</h3>
                            </div>
                        </article>
                    </div>
                    <main>
                        {animeData.synopsis}
                    </main>
                    <div>
                        <p>Type: {animeData.type}</p>
                        <p>Episodes: {animeData.episodes}</p>
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
