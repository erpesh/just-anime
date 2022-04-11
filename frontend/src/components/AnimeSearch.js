import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

const AnimeSearch = () => {
    const [searchValue, setSearchValue] = useState("")
    const [animeList, setAnimeList] = useState([])
    const navigate = useNavigate()

    const searchAnime = async (search) => {
        const data = await fetch(`https://api.jikan.moe/v3/search/anime?q=${search}&page=1&order_by=title&sort=asc&limit=20`)
            .then(response => response.json())
        setAnimeList(data.results)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // searchAnime(searchValue)
        navigate(`/search/anime?q=${searchValue}&page=1&order_by=title&sort=asc&limit=20`, { replace: true })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="search"
                    placeholder="Search for an anime"
                    required
                    // value={props.search}
                    onChange={e => setSearchValue(e.target.value)}/>
            </form>
        </div>
    );
};

export default AnimeSearch;