import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router";
import AnimeStatesPopup from "../components/AnimeStatesPopup";
import AnimeDataContext from "../context/AnimeDataContext";

const AnimePage = () => {
    const {id} = useParams()
    const {animeData, getAnime} = useContext(AnimeDataContext)
    const [isFetched, setIsFetched] = useState(false)

    useEffect(() => {
        console.log('ef')
        getAnime(id)
        setIsFetched(false)
    }, [])

    return animeData.API_DEPRECATION && (
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