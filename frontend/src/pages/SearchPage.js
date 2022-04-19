import React, {useEffect, useState} from 'react';
import AnimeCard from "../components/AnimeCard";
import {useSearchParams} from "react-router-dom";


const SearchPage = () => {

    const [searchParams, setSearchParams] = useSearchParams()
    const [animeList, setAnimeList] = useState([])
    const [genres, setGenres] = useState([])

    let genreQuery = 'genre='
    const Genre = ({data}) => {

        const [isActive, setIsActive] = useState(false)

        return (
            <li className="genre">
                <input onChange={event => {
                    if (event.target.value === "on") {
                        genreQuery += data.mal_id
                    }else {

                    }
                }} autoComplete="off" type="checkbox"/>
                {data.name}
            </li>
        )
    }


    let query = ""

    for (const entry of searchParams.entries()) {
        const [param, value] = entry;
        query += `${param}=${value}&`
    }

    const searchAnime = async (queryString) => {

        const data = await fetch(`https://api.jikan.moe/v3/search/anime?${queryString}`.slice(0, -1))
            .then(response => response.json())
        setAnimeList(data.results)
    }

    const getGenres = async () => {
        const data = await fetch(`https://api.jikan.moe/v4/genres/anime`)
            .then(res => res.json())
        let array = []
        const data2 = data.data.filter((genre) => {
            if (array.includes(genre.mal_id) || genre.mal_id > 49) {
                return false
            }else {
                array.push(genre.mal_id)
                genre.active = false
                return true
            }
        })
        console.log(data2);
        setGenres(data2)
    }

    useEffect(() => {
        searchAnime(query)
        getGenres()
    }, [])

    return (
        animeList ?
            <div className="page">
                <div className="search-page-container">
                    <header className="search-header">
                        Query b
                    </header>
                    <section className="search-section">
                        {animeList.map((anime) => {
                            return <AnimeCard title={anime.title} img={anime.image_url} id={anime.mal_id}
                                              key={anime.mal_id}/>
                        })}
                    </section>
                    <aside className="search-aside">
                        <div className="search-genres">
                            <ul className="genres-ul">
                            {
                                genres.map(genre => <Genre data={genre}/>)
                            }
                            </ul>
                        </div>
                    </aside>
                </div>
            </div> :
            <div className="page">
                Loading
            </div>
    );
};

export default SearchPage;