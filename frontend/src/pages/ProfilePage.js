import React, {useContext, useEffect, useState} from 'react';
import AuthContext from "../context/AuthContext";
import {Link} from "react-router-dom";
import AnimeLink from "../components/AnimeLink";

const ProfilePage = () => {

    const {authTokens} = useContext(AuthContext)
    const [data, setData] = useState({})
    const [isFetched, setIsFetched] = useState(false)

    const getData = async (tokens) => {
        const response = await fetch('http://127.0.0.1:8000/api/anime/', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + String(tokens.access)
            }
        })
        const data = await response.json()
        setData(data[0])
        setIsFetched(true)
    }

    useEffect(() => {
        getData(authTokens)
    }, [data])

    return (
        <div>
            <div>
                <h3>Watching</h3>
                {isFetched ? (<div>{data.anime_list['Watching'].map(anime => {
                    // return <div><Link to={`/anime/${anime['id']}`} key={anime}>{anime["Title"]}</Link></div>
                    return <AnimeLink/>
                })}</div>) : null}
            </div>
            <div>
                <h3>Completed</h3>
                {isFetched ? (<div>{data.anime_list['Completed'].map(anime => {
                    // return <div><Link to={`/anime/${anime['id']}`} key={anime}>{anime["Title"]}</Link></div>
                    return <AnimeLink/>
                })}</div>) : null}
            </div>
            <div>
                <h3>Plan to watch</h3>
                {isFetched ? (<div>{data.anime_list['Plan to watch'].map(anime => {
                    // return <div><Link to={`/anime/${anime['id']}`} key={anime}>{anime["Title"]}</Link></div>
                    return <AnimeLink/>
                })}</div>) : null}
            </div>
        </div>
    );
};

export default ProfilePage;