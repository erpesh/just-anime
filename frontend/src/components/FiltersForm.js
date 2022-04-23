import React, {useEffect, useState} from 'react';
import AnimeCard from "../components/AnimeCard";
import {useSearchParams} from "react-router-dom";
import styled from "styled-components";
import axios from "axios";


const Input = styled.input`
  padding: 0.5em;
  margin: 0.85em 0.85em 0 0;
  color: #302D2D;
  background: #E5E5E5;
  border: 1px solid #070707;
  border-radius: 3px;

  :focus {
    border: 1px solid #070707;
    outline-offset: 0;
    outline: none;
  }
`

const SearchPage = () => {

    const [searchParams, setSearchParams] = useSearchParams()
    const [animeList, setAnimeList] = useState([])
    const [genres, setGenres] = useState([])
    const [dummy, setDummy] = useState(false)
    const [searchValue, setSearchValue] = useState("")
    const [lastPage, setLastPage] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const [fetching, setFetching] = useState(true)

    const [queryObject, setQueryObject] = useState({})

    const status = ["airing", "complete", "upcoming"]


    let genreQuery = queryObject.genres ? `${queryObject.genres},` : ''

    // GENRE CAN BE SIMPLIFIED BY JOIN METHPD

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
            <li className="filter-li">
                <input className="filter-checkbox" type="checkbox" onChange={e => handleChange(e)}
                       defaultChecked={isActive}/>
                <span className="filter-name">{data.name}</span>
            </li>
        )
    }

    let statusQuery = queryObject.status?.split(',') || []

    const Status = ({value, querySort}) => {
        // querySort
        let isActive = querySort?.split(',').includes(value)

        let queryObjectByStatus = {}
        for (const entry of searchParams.entries()) {
            const [param, value] = entry;
            queryObjectByStatus[param] = value
        }

        const handleChange = (e) => {
            if (e.target.checked && !isActive) {
                statusQuery.push(value)
            } else {
                statusQuery = statusQuery.filter(el => el !== value)
            }
            isActive = false
            console.log(statusQuery)
        }

        return (
            <li className="filter-li">
                <input className="filter-checkbox" type="checkbox" onChange={e => handleChange(e)}
                       defaultChecked={isActive}/>
                <span
                    className="filter-name">{value.charAt(0).toUpperCase() + value.slice(1)}</span>
            </li>
        )
    }

    const getGenres = async () => {
        const data = await fetch(`https://api.jikan.moe/v4/genres/anime`)
            .then(res => res.json())
        let array = []
        const data2 = data.data.filter((genre) => {
            if (array.includes(genre.mal_id)) {
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
        if (fetching) {
            let query = ""

            for (const entry of searchParams.entries()) {
                const [param, value] = entry;
                if (value.length !== 0 || param === "q") {
                    query += `${param}=${value}&`
                }
            }
            query = query.slice(0, -1)
            query += "&sort=desc"
            axios.get(`https://api.jikan.moe/v4/anime?${query}&page=${currentPage}`)
                .then(response => {
                    setAnimeList([...animeList, ...response.data.data])
                    setCurrentPage(prevState => prevState + 1)
                    setLastPage(response.data.pagination.last_visible_page)
                })
                .finally(() => setFetching(false))
        }
    }, [fetching])

    const scrollHandler = (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 && currentPage <= lastPage) {
            setFetching(true)
            console.log(currentPage);
        }
    }

    useEffect(() => {
        console.log(22)
        getGenres()
        let queryObj = {}
        for (const entry of searchParams.entries()) {
            const [param, value] = entry;
            queryObj[param] = value
        }
        setQueryObject(queryObj)
        document.addEventListener("scroll", scrollHandler)
        return function () {
            document.removeEventListener("scroll", scrollHandler)
        }
    }, [dummy])


    return (
        animeList ?
            <>
                <div className="page">
                    <div className="search-page-container">
                        <header className="search-header">
                            <div>Search for an Anime</div>

                        </header>
                        {animeList.length !== 0 ? <section className="search-section">
                            {animeList.map((anime) => {
                                return <AnimeCard title={anime.title} img={anime.images.jpg.image_url} id={anime.mal_id}
                                                  key={anime.mal_id}/>
                            })}
                        </section> : <section className="search-section">Sorry, no matches were found for your query.</section>}
                        <aside className="search-aside">
                            <form className="search-genres" onSubmit={(e) => {
                                e.preventDefault()
                                if (genreQuery) {
                                    queryObject.genres = genreQuery.slice(0, -1)
                                } else {
                                    delete queryObject.genres
                                }
                                queryObject.q = searchValue
                                queryObject.order_by = "members"
                                queryObject.status = statusQuery.join(',')
                                for (const item in queryObject) {
                                    if (!queryObject[item] && item !== "q") {
                                        delete queryObject[item]
                                    }
                                }
                                setSearchParams(queryObject)
                                window.location.reload();
                                setDummy(!dummy)
                            }}>
                                <Input
                                    className="search-input"
                                    type="search"
                                    placeholder="Search for an anime"
                                    value={searchValue}
                                    onChange={(e) => {
                                        setSearchValue(e.target.value)
                                    }}
                                />
                                <div className="filter-div">
                                    <div className="filter-header">Genres</div>
                                    <ul className="filter-ul">
                                        {
                                            genres.map(genre => {
                                                return <Genre key={genre.mal_id} data={genre} gQuery={genreQuery}/>
                                            })
                                        }
                                    </ul>
                                </div>
                                <div className="filter-div">
                                    <div className="filter-header">Status</div>
                                    <ul className="filter-ul">
                                        {
                                            status.map(value => <Status key={value} value={value}
                                                                        querySort={queryObject.status}/>)
                                        }
                                    </ul>
                                </div>
                                {/*<div className="filter-div">*/}
                                {/*    <div className="filter-header">Order by</div>*/}
                                {/*    <ul className="filter-ul">*/}
                                {/*        {*/}
                                {/*            status.map(value => <Status key={value} value={value} querySort={queryObject.status}/>)*/}
                                {/*        }*/}
                                {/*    </ul>*/}
                                {/*</div>*/}
                                <input type="submit" hidden/>
                            </form>
                        </aside>
                        {/*<footer className="search-footer">*/}
                        {/*    <Pagination/>*/}
                        {/*</footer>*/}
                    </div>
                </div>
            </> :
            <div className="page">
                Loading
            </div>
    );
};

export default SearchPage;