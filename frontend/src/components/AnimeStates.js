import React, {useContext, useState} from 'react';
import AuthContext from "../context/AuthContext";
import AnimeDataContext from "../context/AnimeDataContext";

const AnimeStates = ({animeData, animeState, setIsVisible, setPopupState, popupState}) => {

        const {addToList} = useContext(AnimeDataContext)
        const {authTokens} = useContext(AuthContext)
        const [checkbox, setCheckbox] = useState("")

        // const addToList = async (tokens, anime, children, deleteAnime = false) => {
        //     if (!anime.title_english) {
        //         anime.title_english = anime.title
        //     }
        //     const response = await fetch('http://127.0.0.1:8000/api/anime/', {
        //         method: "GET",
        //         headers: {
        //             "Content-Type": "application/json",
        //             "Authorization": "Bearer " + String(tokens.access)
        //         }
        //     })
        //     const data = await response.json()
        //     let jsonList = data[0].anime_list
        //     const stateMent = jsonList["Watching"].filter(el => el["Title"] === animeData.title_english).length === 0 &&
        //         jsonList["Completed"].filter(el => el["Title"] === animeData.title_english).length === 0 &&
        //         jsonList["Plan to watch"].filter(el => el["Title"] === animeData.title_english).length === 0
        //
        //     if (stateMent) {
        //         jsonList[children].push({
        //             "Title": anime.title_english,
        //             "id": anime.mal_id
        //         })
        //
        //     } else {
        //         const array = ["Watching", "Completed", "Plan to watch"]
        //         array.forEach((state) => {
        //             if (jsonList[state].filter(el => el["Title"] === animeData.title_english).length === 1) {
        //                 jsonList[state] = jsonList[state].filter(el => el['Title'] !== animeData.title_english)
        //
        //                 if (!deleteAnime) {
        //                     jsonList[children].push({
        //                         "Title": anime.title_english,
        //                         "id": anime.mal_id
        //                     })
        //                 }
        //             }
        //         })
        //     }
        //
        //     await fetch('http://127.0.0.1:8000/api/anime/', {
        //         method: "PUT",
        //         headers: {
        //             "Content-Type": "application/json",
        //             "Authorization": "Bearer " + String(tokens.access)
        //         },
        //         body: JSON.stringify({
        //             "anime_list": jsonList
        //         })
        //     })
        // }

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
                <div onClick={handleDeleteClick}>
                    Delete from My list
                </div>
            </div>
        );
    }
;

export default AnimeStates;