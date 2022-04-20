import React, {useEffect, useState} from 'react';
import AnimeCard from "../components/AnimeCard";
import {useSearchParams} from "react-router-dom";


const SearchPage = () => {

    const [searchParams, setSearchParams] = useSearchParams()
    const [animeList, setAnimeList] = useState([])
    const [genres, setGenres] = useState([])
    const [dummy, setDummy] = useState(false)
    const [searchValue, setSearchValue] = useState("")

    let queryObject = {}
    for (const entry of searchParams.entries()) {
        const [param, value] = entry;
        queryObject[param] = value
    }

    let genreQuery = queryObject.genre? `${queryObject.genre},` : ''

    const Genre = ({data, gQuery}) => {

        let isActive = false;
        if (gQuery) {
            gQuery = gQuery.slice(0, -1).split(',')
            isActive = gQuery.includes(String(data.mal_id))
        }

        function handleChange(e) {
            if (e.target.checked && !isActive) {
                genreQuery += `${data.mal_id},`
            } else {
                let statement;
                if (String(data.mal_id).length === 1) {
                    for (let i = 1; i < genreQuery.length; i++) {
                        statement = genreQuery.charAt(i - 1) == data.mal_id &&
                            genreQuery.charAt(i) === ","
                        if (statement) {
                            genreQuery = genreQuery.substring(0, i - 1) + genreQuery.substring(i + 1)
                        }
                    }
                } else {
                    for (let i = 2; i < genreQuery.length; i++) {
                        statement = genreQuery.charAt(i - 2) === String(data.mal_id).charAt(0) &&
                            genreQuery.charAt(i - 1) === String(data.mal_id).charAt(1) &&
                            genreQuery.charAt(i) === ","
                        if (statement) {
                            genreQuery = genreQuery.substring(0, i - 2) + genreQuery.substring(i + 1)
                        }
                    }
                }
            }
            isActive = false
        }

        return (
            <li>
                <input type="checkbox" onChange={e => handleChange(e)} defaultChecked={isActive}/>
                {data.name}
            </li>
        )
    }

    const searchAnime = async () => {

        let query = ""

        for (const entry of searchParams.entries()) {
            const [param, value] = entry;
            if (value) {
                query += `${param}=${value}&`
            }
        }

        const data = await fetch(`https://api.jikan.moe/v3/search/anime?${query}`.slice(0, -1))
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
            } else {
                array.push(genre.mal_id)
                genre.active = false
                return true
            }
        })
        setGenres(data2)
    }

    useEffect(() => {
        console.log(222);
        searchAnime()
        getGenres()
    }, [dummy])

    return (
        animeList ?
            <div className="page">
                <div className="search-page-container">
                    <header className="search-header">
                        <div>Query</div>

                    </header>
                    <section className="search-section">
                        {animeList.map((anime) => {
                            return <AnimeCard title={anime.title} img={anime.image_url} id={anime.mal_id}
                                              key={anime.mal_id}/>
                        })}
                    </section>
                    <aside className="search-aside">
                        <form className="search-genres" onSubmit={(e) => {
                            e.preventDefault()
                            if (genreQuery) {
                                queryObject.genre = genreQuery.slice(0, -1)
                            }else {
                                delete queryObject.genre
                            }
                            queryObject.q = searchValue
                            queryObject.order_by = "score"
                            setSearchParams(queryObject)
                            setDummy(!dummy)
                        }}>
                            <input
                                className="search-input"
                                type="search"
                                placeholder="Search for an anime"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                />
                            <ul>
                            {
                                genres.map(genre => {
                                    return <Genre key={genre.mal_id} data={genre} gQuery={genreQuery}/>
                                })
                            }
                        </ul>
                            <input type="submit"/>
                        </form>
                    </aside>
                </div>
            </div> :
            <div className="page">
                Loading
            </div>
    );
};

export default SearchPage;