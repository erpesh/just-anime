import React, {useContext, useState} from 'react';
import {Link} from "react-router-dom";
import AnimeDataContext from "../context/AnimeDataContext";
import AuthContext from "../context/AuthContext";

const AnimeLink = ({anime, state, data}) => {
    const [isSpanVisible, setIsSpanVisible] = useState(false)
    const {deleteFromProfileList} = useContext(AnimeDataContext)
    const {authTokens} = useContext(AuthContext)

    return (
        <div onMouseEnter={() => setIsSpanVisible(true)} onMouseLeave={() => setIsSpanVisible(false)}>
            <Link to={`/anime/${anime['id']}`}>{anime["Title"]}</Link>
            {isSpanVisible ? <span
                className="text-right"
                onClick={() => {
                    deleteFromProfileList(anime, state, authTokens, data)
                }}>Delete from list</span> : null}
        </div>
    );
};

export default AnimeLink;