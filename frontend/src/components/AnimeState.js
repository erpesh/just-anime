import React, {useContext} from 'react';
import AuthContext from "../context/AuthContext";

const AnimeState = ({children, animeData}) => {
        const {authTokens} = useContext(AuthContext)

        const addToList = async (tokens, anime) => {
            const response = await fetch('http://127.0.0.1:8000/api/anime/', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + String(tokens.access)
                }
            })
            const data = await response.json()
            let jsonList = data[0].anime_list
            if (!jsonList["Watching"].includes(anime.title) && !jsonList["Completed"].includes(anime.title) && !jsonList["Plan to watch"].includes(anime.title)) {

                if (children === "Watching") {
                    jsonList["Watching"].push(anime.title)
                } else if (children === "Completed") {
                    jsonList["Completed"].push(anime.title)
                } else if (children === "Plan to watch") {
                    jsonList["Plan to watch"].push(anime.title)
                }
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


        const handleClick = (e) => {
            e.preventDefault()
            addToList(authTokens, animeData)
        }

        return (
            <div onClick={handleClick}>
                {children}
            </div>
        );
    }
;

export default AnimeState;