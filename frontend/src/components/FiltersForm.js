import React from 'react';
import styled from "styled-components";


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


const FiltersForm = () => {

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
            }else {
                statusQuery = statusQuery.filter(el => el !== value)
            }
            isActive = false
            console.log(statusQuery)
        }

        return (
            <li className="filter-li">
                <input className="filter-checkbox" type="checkbox" onChange={e => handleChange(e)}
                       defaultChecked={isActive}/>
                <span className="filter-name">{value.length !== 11 ? value.charAt(0).toUpperCase() + value.slice(1) : (value.charAt(0).toUpperCase() + value.slice(1)).replace(/_/g, ' ')}</span>
            </li>
        )
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        setAnimeList([])
        if (genreQuery) {
            queryObject.genre = genreQuery.slice(0, -1)
        } else {
            delete queryObject.genre
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
        setDummy(!dummy)
    }

    return (
        <form className="search-genres" onSubmit={e => handleSubmit(e)}>
            <input
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
                        status.map(value => <Status key={value} value={value} querySort={queryObject.status}/>)
                    }
                </ul>
            </div>
            <input type="submit" hidden/>
        </form>
    );
};

export default FiltersForm;