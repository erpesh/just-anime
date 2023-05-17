import React, {createContext, useState} from "react";

const AnimeDataContext = createContext()

export default AnimeDataContext


export const AnimeDataProvider = ({children}) => {
    const [animeData, setAnimeData] = useState({})

    const getAnime = async (animeId) => {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${animeId}/full`)
        if (response.status === 200) {
            const data = await response.json()
            setAnimeData(data.data)
        } else {
            setAnimeData({'type': 'fetchError'})
        }
    }

    const addToList = async (anime, state, authTokens, deleteAnime = false) => {
        if (!anime.title_english) {
            anime.title_english = anime.title
        }
        const response = await fetch('http://127.0.0.1:8000/api/anime/', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + String(authTokens.access)
            }
        })
        // genres
        let genres = [];
        anime.genres.forEach(el => {
            genres.push(el.name);
        })
        const data = await response.json()
        let jsonList = data[0].anime_list
        const stateMent = jsonList["Watching"].filter(el => el["id"] === animeData.mal_id).length === 0 &&
            jsonList["Completed"].filter(el => el["id"] === animeData.mal_id).length === 0 &&
            jsonList["Plan to watch"].filter(el => el["id"] === animeData.mal_id).length === 0
        if (stateMent) {
            jsonList[state].push({
                "Title": anime.title_english,
                "id": anime.mal_id,
                "type": anime.type,
                "episodes": anime.episodes,
                "progress": state === 'Completed' && anime.episodes? anime.episodes : 0,
                "genres": genres,
                "duration": anime.duration,
            })

        } else {
            const array = ["Watching", "Completed", "Plan to watch"]
            array.forEach((stateFor) => {
                if (jsonList[stateFor].filter(el => el["id"] === animeData.mal_id).length === 1) {
                    jsonList[stateFor] = jsonList[stateFor].filter(el => el['id'] !== animeData.mal_id)

                    if (!deleteAnime) {
                        jsonList[state].push({
                            "Title": anime.title_english,
                            "id": anime.mal_id,
                            "type": anime.type,
                            "episodes": anime.episodes,
                            "progress": state === 'Completed' && anime.episodes? anime.episodes : 0,
                            'genres': genres,
                            "duration": anime.duration,
                        })
                    }
                }
            })
        }

        await fetch('http://127.0.0.1:8000/api/anime/', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + String(authTokens.access)
            },
            body: JSON.stringify({
                "anime_list": jsonList
            })
        })
    }

    const deleteFromProfileList = async (anime, state, authTokens, data) => {
        let jsonList = data.anime_list
        jsonList[state] = jsonList[state].filter((an) => {
            return an["Title"] !== anime["Title"]
        })
        await fetch('http://127.0.0.1:8000/api/anime/', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + String(authTokens.access)
            },
            body: JSON.stringify({
                "anime_list": jsonList
            })
        })
    }

    const getAnimeState = async (anime, authTokens, setAnimeState) => {
        if (!anime.title_english) {
            anime.title_english = anime.title
        }
        const response = await fetch('http://127.0.0.1:8000/api/anime/', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + String(authTokens.access)
            }
        })
        const data = await response.json()
        let jsonList = data[0].anime_list
        const array = ["Watching", "Completed", "Plan to watch"]
        array.forEach((state) => {
            if (jsonList[state].filter(el => el["id"] === anime.mal_id).length === 1) {
                setAnimeState(state)
            }
        })
    }


    const contextData = {
        animeData: animeData,

        getAnimeState : getAnimeState,
        deleteFromProfileList: deleteFromProfileList,
        addToList: addToList,
        getAnime: getAnime,
    }

    return (
        <AnimeDataContext.Provider value={contextData}>
            {children}
        </AnimeDataContext.Provider>
    );
};
