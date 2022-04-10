// import React, {useContext, useEffect, useState} from 'react';
// import AuthContext from "../context/AuthContext";
// import AnimeLink from "../components/AnimeLink";
//
// const ProfilePage = () => {
//
//     const {authTokens} = useContext(AuthContext)
//     const [data, setData] = useState({})
//     const [isFetched, setIsFetched] = useState(false)
//     const [isDeleted, setIsDeleted] = useState(false)
//
//     const getData = async (tokens) => {
//         const response = await fetch('http://127.0.0.1:8000/api/anime/', {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": "Bearer " + String(tokens.access)
//             }
//         })
//         const responseData = await response.json()
//         setData(responseData[0])
//         setIsFetched(true)
//     }
//
//     useEffect(() => {
//         console.log("effected")
//         getData(authTokens)
//         // setIsDeleted(false)
//     }, [])
//
//     // return
// };

// export default ProfilePage;

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