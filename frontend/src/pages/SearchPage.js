import React, {useEffect, useState} from 'react';
import AnimeCard from "../components/AnimeCard";
import {useSearchParams} from "react-router-dom";
import AnimeSearch from "../components/AnimeSearch";

const SearchPage = () => {

    const [searchParams, setSearchParams] = useSearchParams()
    const [animeList, setAnimeList] = useState([])

    const searchTerms = searchParams.get('q') || ''

    const searchAnime = async (terms) => {
        const data = await fetch(`https://api.jikan.moe/v3/search/anime?q=${terms}&page=1&order_by=title&sort=asc&limit=20`)
            .then(response => response.json())
        setAnimeList(data.results)
    }

    useEffect(() => {
        searchAnime(searchTerms)
    })

    return (
        animeList[1] ? <div>
            {animeList.map((anime) => {
                return <AnimeCard anime={anime} key={anime.mal_id}/>
            })}
        </div> :
            <h2>
                Loading
            </h2>
    );
};

export default SearchPage;