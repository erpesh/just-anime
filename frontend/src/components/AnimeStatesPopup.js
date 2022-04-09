import React, {useContext, useEffect, useState} from 'react';
import AnimeStates from "./AnimeStates";
import AuthContext from "../context/AuthContext";

const AnimeStatesPopup = ({animeData}) => {
    const {authTokens} = useContext(AuthContext)
    // const [userState, setUserState] = useState('')
    const [isVisible, setIsVisible] = useState(false)
    const [animeState, setAnimeState] = useState("")
    const [popupState, setPopupState] = useState(animeState)

    const getAnimeState = async (tokens, anime) => {
        if (!anime.title_english) {
            anime.title_english = anime.title
        }
        const response = await fetch('http://127.0.0.1:8000/api/anime/', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + String(tokens.access)
            }
        })
        const data = await response.json()
        let jsonList = data[0].anime_list
        const array = ["Watching", "Completed", "Plan to watch"]
        array.forEach((state) => {
            if (jsonList[state].filter(el => el["Title"] === anime.title_english).length === 1) {
                    setAnimeState(state)
                }
            })
        }


    const handleClick = () => {
        setIsVisible(true)
        // getAnimeState(authTokens, animeData)
    }

    useEffect(() => {
        getAnimeState(authTokens, animeData)
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