import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import styled from 'styled-components'

const Input = styled.input`
  padding: 0.5em;
  margin: 0.85em;
  color: #E5E5E5;
  background: #302D2D;
  border: 1px solid #070707;
  border-radius: 3px;
  
  :focus {
    border: 1px solid #BD00FF;
    outline-offset: 0;
    outline: none;
  }
`

const AnimeSearch = () => {
    const [searchValue, setSearchValue] = useState("")
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        // searchAnime(searchValue)
        navigate(`/search/anime?q=${searchValue}&page=1&order_by=title&sort=asc&limit=20`, {replace: true})
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Input
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