import React, {Component} from 'react';
import AuthContext from "../context/AuthContext";
import Tabs from "../components/Tabs";
import ProgressBar from "../components/ProgressBar";

class ProfilePage extends Component {

    static contextType = AuthContext

    constructor() {
        super();
        this.state = {
            data: {},
            isFetched: false,
            approximateTime: 0,
            timeType: 'Minutes',
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
            const data = await response.json();
            let approximateTime = 0;
            for (let key in data[0].anime_list) {
                for (let i = 0; i < data[0].anime_list[key].length; i++) {
                    if (data[0].anime_list[key][i].type === "TV" || data[0].anime_list[key][i].type === "ONA" || data[0].anime_list[key][i].type === "OVA"){
                        approximateTime += data[0].anime_list[key][i].progress * 23;
                        console.log(data[0].anime_list[key][i].progress)
                    }
                    else if (data[0].anime_list[key][i].type === "Movie"){
                        approximateTime += 90;
                    }
                }
            }
            let timeType = 'minutes';
            if (approximateTime > 60) {
                approximateTime /= 60
                timeType = "hours"
                if (approximateTime > 24) {
                    approximateTime /= 24
                    timeType = 'days'
                }
            }
            this.setState({
                data: data,
                isFetched: true,
                approximateTime: Math.round(approximateTime),
                timeType: timeType
            })
            console.log(this.state.data);
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
            <div className="page profile">
                <aside className="profile-aside">
                    <div className="profile-picture" onClick={() => console.log(data[0].anime_list)}>
                        <img alt="Profile picture" src="https://i.pinimg.com/originals/10/91/94/1091948c6b80b65b9eef8c163f0ae42a.jpg"/>
                    </div>
                    <div className="profile-name">
                        {this.context.user.username}
                    </div>
                </aside>
                <main className="profile-main">
                    <div className="anime-line">
                        <p style={{
                            fontSize: '18px',
                            lineHeight: 2
                        }}>Your Anime statistics:</p>
                        <ProgressBar bgcolor="red" data={data[0].anime_list}/>
                        <p style={{
                            fontSize: '13px',
                            lineHeight: 1.85,
                        }}>Completed ({data[0].anime_list["Completed"].length}) / Watching ({data[0].anime_list["Watching"].length}) / Planning ({data[0].anime_list["Plan to watch"].length})</p>

                    </div>
                </main>
                <div className="profile-tabs">
                    <Tabs data={data[0].anime_list} tabs={["Plan to watch", "Watching", "Completed"]}/>
                </div>

            </div>
    }
}

export default ProfilePage;