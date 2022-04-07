import {createContext, useEffect, useState} from 'react';
import jwtDecode from "jwt-decode";
import {useNavigate} from "react-router";

const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({children}) => {

    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    const [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null)
    const [loading, setLoading] = useState(true)
    const [animeData, setAnimeData] = useState({})

    const navigate = useNavigate()


    const loginUser = async (e) => {
        e.preventDefault()
        const response = await fetch('http://127.0.0.1:8000/api/token/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": e.target.username.value,
                "password": e.target.password.value,
            })
        })
        const data = await response.json()
        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            // if (authTokens) await createList(e)
            navigate('/')
        } else {
            alert("Something went wrong")
        }
    }

    const logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/login')
    }

    const updateToken = async () => {

        const response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'refresh': authTokens?.refresh})
        })
        const data = await response.json()

        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        } else {
            logoutUser()
        }
        // if (loading) {
        //     setLoading(false)
        // }
    }

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

    // const createList = async () => {
    //     const response = await fetch('http://127.0.0.1:8000/api/anime/', {
    //         method: "POST",
    //         headers: {
    //             'Content-Type': "application/json",
    //             'Authorization': 'Bearer ' + String(authTokens.access)
    //         },
    //         body: JSON.stringify({
    //             "Watching": [],
    //             "Completed": [],
    //             "Plan to watch": []
    //         })
    //     })
    //     const data = await response.json()
    //     console.log(data)
    // }


    useEffect(() => {

        if (loading) {
            // updateToken()
            setLoading(false)
        }

        const fourMinutes = 1000 * 60 * 4
        const interval = setInterval(() => {
            if (authTokens) {
                updateToken()
            }
        }, fourMinutes)
        return () => clearInterval(interval)

    }, [authTokens, loading])


    const contextData = {
        user: user,
        authTokens: authTokens,
        animeData: animeData,

        getAnime: getAnime,
        loginUser: loginUser,
        logoutUser: logoutUser,
        // registerUser : registerUser,
    }

    return (
        <AuthContext.Provider value={contextData}>
            {!loading && children}
        </AuthContext.Provider>
    )
}