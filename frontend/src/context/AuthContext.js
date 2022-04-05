import {createContext, useState} from 'react';

const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({children}) => {

    const [authTokens, setAuthTokens] = useState(null)
    const [user, setUser] = useState(null)

    const loginUser = async (e) => {
        e.preventDefault()
        const response = await fetch('http://127.0.0.1:8000/api/token/', {
            method : "POST",
            headers : {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                'username': e.target.username.value,
                'password' : e.target.password.value,
            })
        })
        const data = response.json()
        console.log(data.access)
        if (response.status === 200) {
            setAuthTokens(data)
            setUser(data.access)
        }else {
            alert("Something went wrong")
        }
    }

    const contextData = {
        loginUser : loginUser
    }

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}