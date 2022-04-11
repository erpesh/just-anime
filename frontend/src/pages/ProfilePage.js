import React, {Component} from 'react';
import AnimeLink from "../components/AnimeLink";
import AuthContext from "../context/AuthContext";

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
                console.log(this.state)
            }
        } catch (e) {
            console.error(e);
        }
    }

    render() {
        const {data} = this.state

        return data[0] && <div>{["Watching", "Completed", "Plan to watch"].map((listState) => {
            return (
                <div key={listState}>
                    <h3>{listState} ({data[0].anime_list[listState].length})</h3>
                    <div>{data[0].anime_list[listState].map(anime => {
                        return <div onClick={() => this.forceUpdate()} key={anime.id}>
                            <AnimeLink
                                anime={anime}
                                state={listState}
                                data={data[0]}/>
                        </div>
                    })}
                    </div>
                </div>)
        })}
        </div>
    }
}

export default ProfilePage;