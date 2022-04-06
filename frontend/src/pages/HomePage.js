import React, {useContext, useEffect, useState} from 'react';
import AuthContext from "../context/AuthContext";
import AnimeSearch from "../components/AnimeSearch";

const HomePage = ({isAuth}) => {
    const [notes, setNotes] = useState([])
    const {authTokens, logoutUser} = useContext(AuthContext)

    useEffect(() => {
        if (isAuth) {
            getNotes()
        }
    }, [])

    const getNotes = async () => {
        const response = await fetch('http://127.0.0.1:8000/api/notes/', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
                // in SIMPLE JWT settings u can change Bearer value
            }
        })
        const data = await response.json()

        if (response.status === 200) {
            setNotes(data)
        } else if (response.statusText === 'Unauthorized') {
            logoutUser()
        }

    }

    return (
        <div>
            <p>Here is a home page</p>

            {isAuth &&
                (<ul>
                    {notes.map(note => {
                        return <li key={note.id}>{note.body}</li>
                    })}
                </ul>)}
            <AnimeSearch/>
        </div>
    );
};

export default HomePage;