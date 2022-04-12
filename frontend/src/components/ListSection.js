import React, {useContext} from 'react';
import AnimeDataContext from "../context/AnimeDataContext";
import AuthContext from "../context/AuthContext";

const ListSection = ({activeOption, tabs, data}) => {

    const {authTokens} = useContext(AuthContext)

    const changeList = async (jsonData, anime, token, animeState, deleteAnime=false) => {
        const response = await fetch('http://127.0.0.1:8000/api/anime/', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + String(token.access)
            }
        })
        const data = await response.json()
        const stateMent = jsonData["Watching"].filter(el => el["id"] === animeData.mal_id).length === 0 &&
            jsonData["Completed"].filter(el => el["id"] === animeData.mal_id).length === 0 &&
            jsonData["Plan to watch"].filter(el => el["id"] === animeData.mal_id).length === 0

    }

    return (
        <select name="cars" id="cars" className="select-table">
            <option>{activeOption}</option>
            {tabs.filter((tab) => tab !== activeOption).map(tab => <option key={tab}>{tab}</option>)}
            <option onClick={() => {

            }}>Delete</option>
        </select>
    );
};

export default ListSection;