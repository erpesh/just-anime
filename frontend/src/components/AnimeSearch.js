import React, {useState} from 'react';
import AnimeCard from "./AnimeCard";

const AnimeSearch = () => {
    const [searchValue, setSearchValue] = useState("")
    const [animeList, setAnimeList] = useState([])

    const searchAnime = async (search) => {
        const data = await fetch(`https://api.jikan.moe/v3/search/anime?q=${search}&page=1&order_by=title&sort=asc&limit=20`)
            .then(response => response.json())
        setAnimeList(data.results)
        console.log(data)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        searchAnime(searchValue)
    }

    return (
        <div>
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
            <div>
                {animeList.map((anime) => {
                    return <AnimeCard anime={anime} key={anime.mal_id}/>
                })}
            </div>
        </div>
    );
};

export default AnimeSearch;