import {createContext, useState} from 'react';
import jwtDecode from "jwt-decode";
import {useNavigate} from "react-router";

const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({children}) => {

    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')): null)
    const [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')): null)

    const navigate = useNavigate()

    const loginUser = async (e) => {
        const dataToFetch = {
            "username": e.target.username.value,
            "password" : e.target.password.value,
        }
        e.preventDefault()
        const response = await fetch('http://127.0.0.1:8000/api/token/', {
            method : "POST",
            headers : {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(dataToFetch)
        })
        const data = await response.json()
        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            navigate('/')
        }else {
            alert("Something went wrong")
        }
    }

    const logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/login')
    }

    const contextData = {
        user : user,

        loginUser : loginUser,
        logoutUser : logoutUser,
    }

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}