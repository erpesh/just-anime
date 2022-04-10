import React, {useContext, useEffect, useState} from 'react';
import AnimeStates from "./AnimeStates";
import AuthContext from "../context/AuthContext";
import AnimeDataContext from "../context/AnimeDataContext";

const AnimeStatesPopup = ({animeData}) => {
    // const [userState, setUserState] = useState('')
    const [isVisible, setIsVisible] = useState(false)
    const [animeState, setAnimeState] = useState("")
    const [popupState, setPopupState] = useState(animeState)
    const {getAnimeState} = useContext(AnimeDataContext)
    const {authTokens} = useContext(AuthContext)

    const handleClick = () => {
        setIsVisible(true)
        // getAnimeState(authTokens, animeData)
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
                    popupState={popupState}/>
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