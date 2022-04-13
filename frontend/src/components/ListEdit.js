import React, {useContext} from 'react';
import AuthContext from "../context/AuthContext";

const ListEdit = ({activeOption, tabs, data, anime, setEditItem}) => {

    const {authTokens} = useContext(AuthContext)

    const changeList = async (jsonData, anime, currentState, changedState, progress) => {
        anime["progress"] = progress

        if (changedState === "Completed") anime["progress"] = anime["episodes"]

        jsonData[currentState] = jsonData[currentState].filter(el => el["id"] !== anime["id"])
        if (changedState !== "Delete") {
            jsonData[changedState].push(anime)
        }

        console.log(anime);

        const response = await fetch('http://127.0.0.1:8000/api/anime/', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + String(authTokens.access)
            },
            body: JSON.stringify({
                "anime_list": jsonData
            })
        })
        const respondedData = await response.json()
        console.log(respondedData);

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setEditItem(-1)
        let progress_value = anime["progress"]
        if (e.target.progress_value) {
            progress_value = e.target.progress_value.value
        }
        changeList(data, anime, activeOption, e.target.state_options.value, progress_value)
    }

    return (
        <tr className="edit-tr">
            <td colSpan="4">
                <div>
                    <form onSubmit={handleSubmit}>
                        <select name="state_options" className="select-table">
                            <option>{activeOption}</option>

                            {tabs.filter((tab) => tab !== activeOption).map(tab => <option key={tab}>{tab}</option>)}

                            <option>Delete</option>
                        </select>
                        {anime["episodes"] !== null ?
                            <input
                                type="number"
                                name="progress_value"
                                min="0"
                                max={anime["episodes"]}
                                step="1"
                                defaultValue={anime["progress"]}/> : null}
                        <input type="submit"/>
                    </form>

                </div>
            </td>
        </tr>
    );
};

export default ListEdit;