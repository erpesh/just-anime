import {createContext, useEffect, useState} from 'react';
import jwtDecode from "jwt-decode";
import {useNavigate} from "react-router";

const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({children}) => {

    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')): null)
    const [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')): null)
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()


    // const registerUser = async (e) => {
    //     e.preventDefault()
    //     console.log(e)
    //     const response = await fetch('http://127.0.0.1:8000/api/register/', {
    //         method : "POST",
    //         headers : {
    //             'Content-Type': 'application/json'
    //         },
    //         body : JSON.stringify({
    //             "username": e.target.value.username,
    //             "password": e.target.value.password,
    //             "password2": e.target.value.password2,
    //             "email": e.target.value.email
    //         })
    //     })
    //     const data = await response.json()
    //     if (data.password && data.password === "Password fields didn't match.") {
    //         alert("Passwords do not match!")
    //     }
    //     else if (response.status === 200) {
    //         await loginUser(e)
    //     }else {
    //         alert("Something went wrong")
    //     }
    // }

    const loginUser = async (e) => {
        e.preventDefault()
        console.log(e.target.value)
        const response = await fetch('http://127.0.0.1:8000/api/token/', {
            method : "POST",
            headers : {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                "username": e.target.username.value,
                "password" : e.target.password.value,
            })
        })
        const data = await response.json()
        if (response.status === 200) {
            if (response.status === 200) {
                setAuthTokens(data)
                setUser(jwtDecode(data.access))
                localStorage.setItem('authTokens', JSON.stringify(data))
                navigate('/')
            }else {
                alert("Something went wrong")
            }
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
            method : "POST",
            headers : {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({'refresh': authTokens?.refresh})
        })
        const data = await response.json()

        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        }else {
            logoutUser()
        }
        // if (loading) {
        //     setLoading(false)
        // }
    }

    const contextData = {
        user : user,
        authTokens : authTokens,

        loginUser : loginUser,
        logoutUser : logoutUser,
        // registerUser : registerUser,
    }

    useEffect(() => {

        if (loading) {
            // updateToken()
            setLoading(false)
        }

        const fourMinutes = 1000*60*4
        const interval = setInterval(() => {
            if (authTokens) {
                updateToken()
            }
        }, fourMinutes)
        return () => clearInterval(interval)

    }, [authTokens, loading])

    return(
        <AuthContext.Provider value={contextData}>
            {!loading && children}
        </AuthContext.Provider>
    )
}