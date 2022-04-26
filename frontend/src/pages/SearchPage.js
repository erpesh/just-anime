import React, {useEffect, useState} from 'react';
import AnimeCard from "../components/AnimeCard";
import {useSearchParams} from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import {FaAngleDown} from "react-icons/fa";
import {CSSTransition} from "react-transition-group";


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
    const [queryObject, setQueryObject] = useState({})

    const [searchValue, setSearchValue] = useState("")

    const [lastPage, setLastPage] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const [fetching, setFetching] = useState(true)

    const [genres, setGenres] = useState([])
    const [themes, setThemes] = useState([])
    const [statuses, setStatuses] = useState([])
    const [types, setTypes] = useState([])

    const [activeFilters, setActiveFilters] = useState([])

    const [isMenuActive, setIsMenuActive] = useState(false)


    const getGenres = async () => {
        const data = await fetch(`https://api.jikan.moe/v4/genres/anime`)
            .then(res => res.json())
        let array = []
        const data2 = data.data.filter((genre) => {
            if (genre.mal_id <= 49) {
                if (array.includes(genre.mal_id)) {
                    return false
                } else {
                    array.push(genre.mal_id)
                    genre.active = false
                    return true
                }
            }

        })
        const data3 = data.data.filter((genre) => {
            if (genre.mal_id > 49) {
                if (array.includes(genre.mal_id)) {
                    return false
                } else {
                    array.push(genre.mal_id)
                    genre.active = false
                    return true
                }
            }})
        setGenres(data2)
        setThemes(data3)
        setStatuses(["airing", "complete", "upcoming"])
        setTypes(["tv", "movie", 'ova', 'special', 'ona', 'music'])
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        let object = queryObject
        object.q = searchValue
        setQueryObject(object)

        for (let value in queryObject) {
            if (queryObject[value]?.length === 0) {
                delete queryObject[value]
            }
        }
        setSearchParams(queryObject)
        window.location.reload();
    }

    const handleChange = (value, param) => {
        if (typeof value === "number") {
            value = String(value)
        }
        let query = queryObject[param] ? queryObject[param].split(',') : []
        if (!query.includes(value)) {
            query.push(value)
        } else {
            query = query.filter(val => val !== value)
        }
        let queryObj = queryObject
        queryObj[param] = query.join(',')
        setQueryObject(queryObj)
    }

    const filterHandleClick = (filter) => {
        if (activeFilters.includes(filter)) {
            setActiveFilters(activeFilters.filter((value) => value !== filter))
        } else {
            setActiveFilters(prevState => [...prevState, filter])
        }
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
        }
    }

    useEffect(() => {
        let queryObj = {}
        for (const entry of searchParams.entries()) {
            const [param, value] = entry;
            queryObj[param] = value
        }
        setQueryObject(queryObj)
        setSearchValue(queryObj.q ? queryObj.q : "")
    }, [])

    useEffect(() => {
        getGenres()
        document.addEventListener("scroll", scrollHandler)
        return function () {
            document.removeEventListener("scroll", scrollHandler)
        }
    }, [])


    return (
        animeList ?
            <>
                <div className="page">
                    <div className="search-page-container">
                        <header className={`search-header`}>
                            <div>Search for an Anime</div>
                            <div className="filter-menu" onClick={() => setIsMenuActive(!isMenuActive)}>Filters</div>
                        </header>
                        {animeList.length !== 0 ? <section className={`search-section${isMenuActive? " active-section" : ""}`}>
                                {animeList.map((anime) => {
                                    return <AnimeCard title={anime.title} img={anime.images.jpg.image_url} id={anime.mal_id}
                                                      key={anime.mal_id}/>
                                })}
                            </section> :
                            <section className="search-section">Sorry, no matches were found for your query.</section>}
                        <aside className={`search-aside${isMenuActive? " filter-menu-active" : " filter-menu-disactive"}`}>
                            <form className="search-genres" onSubmit={handleSubmit}>
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
                                    <div
                                        className="filter-header"
                                        onClick={() => filterHandleClick("genres")}><span className="filter-arrow-up">Genres <FaAngleDown/></span>
                                    </div>
                                    <CSSTransition
                                        in={activeFilters.includes("genres")}
                                        timeout={1000}
                                        classNames="filter"
                                        mountOnEnter
                                        unmountOnExit
                                    >
                                    <ul className="filter-ul">
                                        {
                                            genres.map(genre => {
                                                return (
                                                    <li className="filter-li" key={genre.mal_id}>
                                                        <input className="filter-checkbox" type="checkbox"
                                                               onChange={() => handleChange(genre.mal_id, 'genres')}
                                                               defaultChecked={queryObject.genres?.split(',').includes(String(genre.mal_id))}/>
                                                        <span className="filter-name">{genre.name}</span>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul></CSSTransition>
                                </div>
                                <div className="filter-div">
                                    <div
                                        className="filter-header"
                                        onClick={() => filterHandleClick("themes")}><span className="filter-arrow-up">Themes <FaAngleDown/></span>
                                    </div>
                                    <CSSTransition
                                        in={activeFilters.includes("themes")}
                                        timeout={1000}
                                        classNames="filter"
                                        mountOnEnter
                                        unmountOnExit
                                    >
                                        <ul className="filter-ul">
                                            {
                                                themes.map(genre => {
                                                    return (
                                                        <li className="filter-li" key={genre.mal_id}>
                                                            <input className="filter-checkbox" type="checkbox"
                                                                   onChange={() => handleChange(genre.mal_id, 'genres')}
                                                                   defaultChecked={queryObject.genres?.split(',').includes(String(genre.mal_id))}/>
                                                            <span className="filter-name">{genre.name}</span>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul></CSSTransition>
                                </div>
                                <div className="filter-div">
                                    <div className="filter-header" onClick={() => filterHandleClick("status")}><span className="filter-arrow-up">Status <FaAngleDown/></span>
                                    </div>
                                    <CSSTransition
                                        in={activeFilters.includes("status")}
                                        timeout={1000}
                                        classNames="filter"
                                        mountOnEnter
                                        unmountOnExit
                                    >
                                    <ul className="filter-ul">
                                        {
                                            statuses.map(value => {
                                                return (
                                                    <li className="filter-li" key={value}>
                                                        <input className="filter-checkbox" type="checkbox"
                                                               onChange={() => handleChange(value, 'status')}
                                                               defaultChecked={queryObject.status?.split(',').includes(value)}/>
                                                        <span className="filter-name">{
                                                            value.charAt(0).toUpperCase() + value.slice(1)
                                                        }</span>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul></CSSTransition>
                                </div>
                                <div className="filter-div">
                                    <div className="filter-header" onClick={() => filterHandleClick("type")}><span className="filter-arrow-up">Type <FaAngleDown/></span></div>
                                    <CSSTransition
                                        in={activeFilters.includes("type")}
                                        timeout={500}
                                        classNames="filter"
                                        mountOnEnter
                                        unmountOnExit
                                    >
                                    <ul className="filter-ul">
                                        {
                                            types.map(type => {
                                                return (
                                                    <li className="filter-li" key={type}>
                                                        <input className="filter-checkbox" type="checkbox"
                                                               onChange={() => handleChange(type, 'type')}
                                                               defaultChecked={queryObject.type?.split(',').includes(type)}/>
                                                        <span className="filter-name">{
                                                            type.length > 3 ? type.charAt(0).toUpperCase() + type.slice(1) : type.toUpperCase()
                                                        }</span>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul></CSSTransition>
                                </div>
                                <input type="submit" hidden/>
                            </form>
                        </aside>
                    </div>
                </div>
            </> :
            <div className="page">
                Loading
            </div>
    );
};

export default SearchPage;