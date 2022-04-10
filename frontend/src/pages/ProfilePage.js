import React, {useContext, useEffect, useState} from 'react';
import AuthContext from "../context/AuthContext";
import AnimeLink from "../components/AnimeLink";

const ProfilePage = () => {

    const {authTokens} = useContext(AuthContext)
    const [data, setData] = useState({})
    const [isFetched, setIsFetched] = useState(false)
    const [isDeleted, setIsDeleted] = useState(false)

    const getData = async (tokens) => {
        const response = await fetch('http://127.0.0.1:8000/api/anime/', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + String(tokens.access)
            }
        })
        const responseData = await response.json()
        setData(responseData[0])
        setIsFetched(true)
    }

    useEffect(() => {
        console.log("effected")
        getData(authTokens)
        // setIsDeleted(false)
    }, [])

    return (
        <div>
            {isFetched ? (
                <div>
                    <h3>Watching ({data.anime_list['Watching'].length})</h3>
                    <div>{data.anime_list['Watching'].map(anime => {
                        return <AnimeLink
                            key={anime.id}
                            anime={anime}
                            state="Watching"
                            data={data}
                            setIsDeleted={setIsDeleted}/>

                    })}</div>
                </div>) : null}

            {isFetched ? (
                <div>
                    <h3>Completed ({data.anime_list['Completed'].length})</h3>
                    <div>{data.anime_list['Completed'].map(anime => {
                        return <AnimeLink
                            key={anime.id}
                            anime={anime}
                            state="Completed"
                            data={data}/>
                    })}</div>
                </div>) : null}
            {isFetched ? (
                <div>
                    <h3>Plan to watch ({data.anime_list['Plan to watch'].length})</h3>
                    <div>{data.anime_list['Plan to watch'].map(anime => {
                        return <AnimeLink
                            key={anime.id}
                            anime={anime}
                            state="Plan to watch"
                            data={data}/>
                    })}</div>
                </div>) : null}
        </div>
    );
};

export default ProfilePage;