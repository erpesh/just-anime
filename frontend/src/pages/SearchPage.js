import React, {useEffect, useState} from 'react';
import AnimeCard from "../components/AnimeCard";
import {useSearchParams} from "react-router-dom";
import AnimeSearch from "../components/AnimeSearch";

const SearchPage = () => {

    const [searchParams, setSearchParams] = useSearchParams()
    const [animeList, setAnimeList] = useState([])
    const [dum, setDum] = useState(true)

    const searchTerms = searchParams.get('q') || ''

    const searchAnime = async (terms) => {
        const data = await fetch(`https://api.jikan.moe/v3/search/anime?q=${terms}&order_by=popularity`)
            .then(response => response.json())
        setAnimeList(data.results)
    }

    useEffect(() => {
        searchAnime(searchTerms)

    }, [searchTerms])

    return (
        animeList ? <div className="page">
            {animeList.map((anime) => {
                return <AnimeCard title={anime.title} img={anime.image_url} id={anime.mal_id} key={anime.mal_id}/>
            })}
        </div> :
            <div className="page">
                Loading
            </div>
    );
};

export default SearchPage;