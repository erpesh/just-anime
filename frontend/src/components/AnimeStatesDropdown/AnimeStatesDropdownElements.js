import React, {useContext, useEffect, useState} from 'react';
import AuthContext from "../../context/AuthContext";
import AnimeDataContext from "../../context/AnimeDataContext";


export const Dropdown = ({children}) => {

    return (
        <div className="dropdown-container">
            {children}
        </div>
    );
};

export const DropdownToggle = ({animeData}) => {

    const [animeState, setAnimeState] = useState("")
    const {user, authTokens} = useContext(AuthContext)
    const {getAnimeState} = useContext(AnimeDataContext)

    useEffect(() => {
        getAnimeState(animeData, authTokens, setAnimeState)
    }, [animeState])

    return (
        <div className="dropdown-toggle">
            {user ? <span>{animeState}</span> :
            <span>Add to My list</span>}
        </div>
    );
};

export const DropdownItems = ({animeData}) => {

    const [animeState, setAnimeState] = useState("")
    const {user, authTokens} = useContext(AuthContext)
    const {getAnimeState} = useContext(AnimeDataContext)

    useEffect(() => {
        getAnimeState(animeData, authTokens, setAnimeState)
    }, [animeState])

    function DropdownItem(props) {

    }

    return (
        <div>

        </div>
    );
};
