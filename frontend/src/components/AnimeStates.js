import React, {useContext} from 'react';
import AuthContext from "../context/AuthContext";

const AnimeStates = ({animeData, animeState}) => {
        const {authTokens} = useContext(AuthContext)

        const addToList = async (tokens, anime, children) => {
            const response = await fetch('http://127.0.0.1:8000/api/anime/', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + String(tokens.access)
                }
            })
            const data = await response.json()
            let jsonList = data[0].anime_list
            // console.log(jsonList["Watching"])
            // const animeDict = {
            //     "Title": anime.title,
            //     "id": anime.mal_id
            // }
            const stateMent = jsonList["Watching"].filter(el => el["Title"] === animeData.title).length === 0 &&
                jsonList["Completed"].filter(el => el["Title"] === animeData.title).length === 0 &&
                jsonList["Plan to watch"].filter(el => el["Title"] === animeData.title).length === 0
            if (stateMent) {

                jsonList[children].push({
                    "Title": anime.title,
                    "id": anime.mal_id
                })

            } else {
                const array = ["Watching", "Completed", "Plan to watch"]
                array.forEach((state) => {
                    if (jsonList[state].filter(el => el["Title"] === animeData.title).length === 1) {
                        jsonList[state] = jsonList[state].filter(el => el['Title'] !== animeData.title)
                        jsonList[children].push({
                            "Title": anime.title,
                            "id": anime.mal_id
                        })
                    }
                })
            }

            await fetch('http://127.0.0.1:8000/api/anime/', {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + String(tokens.access)
                },
                body: JSON.stringify({
                    "anime_list": jsonList
                })

            })
            console.log(data[0].anime_list)
        }

        const handleWatchClick = (e) => {
            e.preventDefault()
            addToList(authTokens, animeData, 'Watching')
        }

        const handleCompletedClick = (e) => {
            e.preventDefault()
            addToList(authTokens, animeData, "Completed")
        }

        const handlePlanClick = (e) => {
            e.preventDefault()
            addToList(authTokens, animeData, "Plan to watch")
        }

        return (
            <div>
                <div onClick={handleWatchClick}>
                    Watching {animeState === "Watching"? '[ ]' : null}
                </div>
                <div onClick={handleCompletedClick}>
                    Completed {animeState === "Completed"? '[ ]' : null}
                </div>
                <div onClick={handlePlanClick}>
                    Plan to watch {animeState === "Plan to watch"? '[ ]' : null}
                </div>
            </div>
        );
    }
;

export default AnimeStates;