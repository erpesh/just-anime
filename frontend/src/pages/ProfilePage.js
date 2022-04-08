import React, {useContext, useState} from 'react';
import AuthContext from "../context/AuthContext";

const ProfilePage = () => {

    const {authTokens} = useContext(AuthContext)
    const [list, setList] = useState({})
    const [isFetched, setIsFetched] = useState(false)

    const getList = async (tokens) => {
        const response = await fetch('http://127.0.0.1:8000/api/anime/', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + String(tokens.access)
            }
        })
        const data = await response.json()
        setList(data[0])
        setIsFetched(true)
    }

    const handleClick = () => {
        getList(authTokens)
    }

    return (
        <div>
            <p onClick={handleClick}>Get list</p>
            {isFetched? (<div>{list.anime_list['Watching'].map((anime, index) => {
                return <p key={index}>{anime}</p>
            })}</div>): null}
        </div>
    );
};

export default ProfilePage;