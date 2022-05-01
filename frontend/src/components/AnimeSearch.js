import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import styled from 'styled-components'
import { BsSearch } from "react-icons/bs"

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
        navigate(`/search/anime?q=${searchValue}&order_by=members`, {replace: true})
    }

    return (
            <form onSubmit={handleSubmit} className="search-box">
                <input
                    className="search-txt"
                    type="search"
                    placeholder="Search for an anime"
                    required
                    onChange={e => setSearchValue(e.target.value)}/>
                <div className="search-btn"><BsSearch className="search-icon"/></div>
            </form>
    );
};

export default AnimeSearch;