import React, {useContext, useState} from 'react';
import AuthContext from "../context/AuthContext";
import AnimeDataContext from "../context/AnimeDataContext";

const AnimeStates = ({animeData, animeState, setIsVisible, setPopupState, popupState}) => {

        const {addToList} = useContext(AnimeDataContext)
        const {authTokens} = useContext(AuthContext)
        const [checkbox, setCheckbox] = useState("")

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
            <div>
                <div onClick={handleWatchClick}>
                    Watching {popupState === "Watching" || (checkbox === 'Watching' && animeState !== "Watching") ?
                    <span>&#10003;</span> : null}
                </div>
                <div onClick={handleCompletedClick}>
                    Completed {popupState === "Completed" || (checkbox === 'Completed' && animeState !== "Completed") ?
                    <span>&#10003;</span> : null}
                </div>
                <div onClick={handlePlanClick}>
                    Plan to
                    watch {popupState === "Plan to watch" || (checkbox === 'Plan to watch' && animeState !== "Plan to watch") ?
                    <span>&#10003;</span> : null}
                </div>
                {popupState === "Watching" || (checkbox === 'Watching' && animeState !== "Watching") ||
                popupState === "Completed" || (checkbox === 'Completed' && animeState !== "Completed") ||
                popupState === "Plan to watch" || (checkbox === 'Plan to watch' && animeState !== "Plan to watch")?
                    <div onClick={handleDeleteClick}>
                        Delete from My list
                    </div> : null}
            </div>
        );
    }
;

export default AnimeStates;