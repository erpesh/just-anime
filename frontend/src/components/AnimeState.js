import React, {useContext} from 'react';
import AuthContext from "../context/AuthContext";

const AnimeState = ({children}) => {
    const {authTokens} = useContext(AuthContext)

    // const addToList = async () => {
    //
    // }

    const createList = async (e) => {
        e.preventDefault()
        const response = await fetch('http://127.0.0.1:8000/api/anime/', {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                'Authorization': 'Bearer ' + String(authTokens.access)
            },
            body: JSON.stringify({
                "Watching": [],
                "Completed": [],
                "Plan to watch": []
            })
        })
        const data = await response.json()
        console.log(data)
    }

    const handleClick = (e) => {
        createList(e)
    }

    return (
        <div onClick={handleClick}>
            {children}
        </div>
    );
};
// {
//     "Watching": null,
//     "Completed": null,
//     "Plan to watch": null
// }
export default AnimeState;