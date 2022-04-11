import React, {useContext, useEffect, useReducer, useState} from 'react';
import AnimeStates from "./AnimeStates";
import AuthContext from "../context/AuthContext";
import AnimeDataContext from "../context/AnimeDataContext";

const AnimeStatesPopup = ({animeData}) => {
    const [isVisible, setIsVisible] = useState(false)
    const [animeState, setAnimeState] = useState("")
    const [popupState, setPopupState] = useState("")
    const {getAnimeState} = useContext(AnimeDataContext)
    const {authTokens} = useContext(AuthContext)

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
            <div>
                {popupState? (<div onClick={handleClick}>On your list: {popupState}</div>)
                : (<div onClick={handleClick}>Add to My list</div>) }
            </div>
        )
    );
};

export default AnimeStatesPopup;