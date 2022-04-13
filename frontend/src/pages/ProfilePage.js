import React, {Component} from 'react';
import AnimeLink from "../components/AnimeLink";
import AuthContext from "../context/AuthContext";
import AnimeTable from "../components/AnimeTable";
import Tabs from "../components/Tabs";

class ProfilePage extends Component {

    static contextType = AuthContext

    constructor() {
        super();
        this.state = {
            data: {},
            isFetched: false,
        }
    }

    async componentDidMount() {
        const {authTokens} = this.context
        try {
            const response = await fetch('http://127.0.0.1:8000/api/anime/', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + String(authTokens.access)
                }
            })
            this.setState({data: await response.json(), isFetched: false})
            if (this.state.data.anime_list !== undefined) {
                this.setState({data: this.state.data, isFetched: true})
            }
        } catch (e) {
            console.error(e);
        }
    }

    render() {
        const {data} = this.state
        return data[0] &&
            <div className="main-container">
                <Tabs data={data[0].anime_list} tabs={["Plan to watch", "Watching", "Completed"]}/>
            </div>
        //     <div>{["Watching", "Completed", "Plan to watch"].map((listState) => {
        //         return <AnimeTable header={listState} data={data[0].anime_list[listState]} key={listState}/>
        // })}
        // </div>
    }
}

export default ProfilePage;