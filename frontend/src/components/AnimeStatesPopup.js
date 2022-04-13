import React, {useContext, useEffect, useReducer, useState} from 'react';
import AnimeStates from "./AnimeStates";
import AuthContext from "../context/AuthContext";
import AnimeDataContext from "../context/AnimeDataContext";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";

const AnimeStatesPopup = ({animeData}) => {
    const [isVisible, setIsVisible] = useState(false)
    const [animeState, setAnimeState] = useState("")
    const [popupState, setPopupState] = useState("")
    const {getAnimeState} = useContext(AnimeDataContext)
    const {authTokens, user} = useContext(AuthContext)
    const navigate = useNavigate()

    const handleClick = () => {
        setIsVisible(true)
    }


    useEffect(() => {
        getAnimeState(animeData, authTokens, setAnimeState)
        setPopupState(animeState)
    }, [animeState])

    return (
        isVisible ? (
            <div>
                <AnimeStates
                    animeData={animeData}
                    animeState={animeState}
                    setIsVisible={setIsVisible}
                    setPopupState={setPopupState}
                    popupState={popupState}
                    />
            </div>
        ) : (
            user ? <div>
                {popupState? (<div onClick={handleClick}>On your list: {popupState}</div>)
                : (<div onClick={handleClick}>Add to My list</div>) }
            </div> : <div><p onClick={() => navigate("/login")}>Add to My list</p></div>
        )
    );
};

export default AnimeStatesPopup;