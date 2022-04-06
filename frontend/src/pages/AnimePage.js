import React, {useContext, useEffect} from 'react';
import {useParams} from "react-router";
import AuthContext from "../context/AuthContext";

const AnimePage = () => {
    const {id} = useParams()

    // const getAnime = async (animeId) => {
    //     const response = await fetch(`https://api.jikan.moe/v3/anime/${animeId}`, {
    //         method : 'GET',
    //         mode : "no-cors",
    //         headers : {
    //             "Access-Control-Allow-Origin" : "*",
    //             "Access-Control-Allow-Credentials" : true
    //         }
    //     })
    //     const string = await response.text();
    //     const json = string === "" ? {} : JSON.parse(string);
    //
    //     console.log(json)
    // }

    // useEffect(() => {
    //     getAnime(id)
    // }, [])


    return (
        <div>
            {/*<p onClick={handleSubmit}>{id}</p>*/}
        </div>
    );
};

export default AnimePage;