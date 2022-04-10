import {createContext, useState} from "react";
import AuthContext from "./AuthContext";

const AnimeDataContext = createContext()

export default AnimeDataContext


export const AnimeDataProvider = ({children}) => {
    // const {authTokens} = useContext(AuthContext)
    const [animeData, setAnimeData] = useState({})

    const getAnime = async (animeId) => {
        const response = await fetch(`https://api.jikan.moe/v3/anime/${animeId}`)
        // console.log(data)
        if (response.status === 200) {
            const data = await response.json()
            setAnimeData(data)
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
        const data = await response.json()
        let jsonList = data[0].anime_list
        const stateMent = jsonList["Watching"].filter(el => el["Title"] === animeData.title_english).length === 0 &&
            jsonList["Completed"].filter(el => el["Title"] === animeData.title_english).length === 0 &&
            jsonList["Plan to watch"].filter(el => el["Title"] === animeData.title_english).length === 0

        if (stateMent) {
            jsonList[state].push({
                "Title": anime.title_english,
                "id": anime.mal_id
            })

        } else {
            const array = ["Watching", "Completed", "Plan to watch"]
            array.forEach((state) => {
                if (jsonList[state].filter(el => el["Title"] === animeData.title_english).length === 1) {
                    jsonList[state] = jsonList[state].filter(el => el['Title'] !== animeData.title_english)

                    if (!deleteAnime) {
                        jsonList[state].push({
                            "Title": anime.title_english,
                            "id": anime.mal_id
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
        // console.log(jsonList[state])
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
            if (jsonList[state].filter(el => el["Title"] === anime.title_english).length === 1) {
                setAnimeState(state)
            }
        })
    }

    // const getProfileData = async () => {
    //     const response = await fetch('http://127.0.0.1:8000/api/anime/', {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": "Bearer " + String(authTokens.access)
    //         }
    //     })
    //     const responseData = await response.json()
    // }



    const contextData = {
        animeData: animeData,

        getAnimeState : getAnimeState,
        // getProfileData : getProfileData,
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
