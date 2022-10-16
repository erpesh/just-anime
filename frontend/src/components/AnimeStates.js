import React, {useContext, useEffect, useRef, useState} from 'react';
import AuthContext from "../context/AuthContext";
import AnimeDataContext from "../context/AnimeDataContext";

const AnimeStates = ({animeData, animeState, setIsVisible, setPopupState, popupState}) => {

    const {addToList} = useContext(AnimeDataContext)
    const {authTokens} = useContext(AuthContext)
    const [checkbox, setCheckbox] = useState("")
    const ref = useRef(null);

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsVisible(false)
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [])

    const handleWatchClick = (e) => {
        e.preventDefault()
        addToList(animeData, 'Watching', authTokens)
        setCheckbox("Watching")
        setIsVisible(false)
        setPopupState("Watching")
    }

    const handleCompletedClick = (e) => {
        e.preventDefault()
        addToList(animeData, "Completed", authTokens)
        setCheckbox("Completed")
        setIsVisible(false)
        setPopupState("Completed")
    }

    const handlePlanClick = (e) => {
        e.preventDefault()
        addToList(animeData, "Plan to watch", authTokens)
        setCheckbox("Plan to watch")
        setIsVisible(false)
        setPopupState("Plan to watch")
    }

    const handleDeleteClick = (e) => {
        e.preventDefault()
        addToList(animeData, popupState, authTokens, true)
        setIsVisible(false)
        setPopupState(false)
    }

    return (
        <div className="anime-states-dropped">
            <div className={`anime-button ${
                popupState === "Watching" || (checkbox === 'Watching' && animeState !== "Watching") ? "green-back" : "purp-back"
            }`} onClick={handleWatchClick}
                 ref={ref}>
                Watching
            </div>
            <div className={`anime-button ${
                popupState === "Completed" || (checkbox === 'Completed' && animeState !== "Completed") ? "green-back" : "purp-back"
            }`} onClick={handleCompletedClick}
                 ref={ref}>
                Completed
            </div>
            <div className={`anime-button ${
                popupState === "Plan to watch" || (checkbox === 'Plan to watch' && animeState !== "Plan to watch") ? "green-back" : "purp-back"
            }`} onClick={handlePlanClick}
                 ref={ref}>
                Planning
            </div>
            {popupState === "Watching" || (checkbox === 'Watching' && animeState !== "Watching") ||
            popupState === "Completed" || (checkbox === 'Completed' && animeState !== "Completed") ||
            popupState === "Plan to watch" || (checkbox === 'Plan to watch' && animeState !== "Plan to watch") ?
                <div className="anime-button red-back" onClick={handleDeleteClick} ref={ref}>
                    Remove
                </div> : null}
        </div>
    );
}


export default AnimeStates;