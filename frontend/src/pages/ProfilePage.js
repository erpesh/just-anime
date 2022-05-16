import React, {Component} from 'react';
import AuthContext from "../context/AuthContext";
import Tabs from "../components/Tabs";
import StatisticBar from "../components/StatisticBar";
import ProfileGenres from "../components/ProfileGenres";
import TimeBar from "../components/TimeBar";

class ProfilePage extends Component {

    static contextType = AuthContext;

    constructor() {
        super();
        this.state = {
            data: {},
            isFetched: false,
            approximateMinutes: 0,
            animeProgress: [],
            pageWidth: window.innerWidth,
        }
        this.handleResize = this.handleResize.bind(this);
    }

    handleResize(e) {
        this.setState({
            data: this.state.data,
            isFetched: this.state.isFetched,
            approximateMinutes: this.state.approximateMinutes,
            animeProgress: this.state.animeProgress,
            pageWidth: window.innerWidth,
        })
    }

    async componentDidMount() {
        window.addEventListener('resize', this.handleResize)
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
                    if (data[0].anime_list[key][i].type === "TV" || data[0].anime_list[key][i].type === "ONA" || data[0].anime_list[key][i].type === "OVA") {
                        approximateTime += data[0].anime_list[key][i].progress * parseInt(data[0].anime_list[key][i].duration.split(' ')[0]);
                    } else if (data[0].anime_list[key][i].type === "Movie") {
                        let time = data[0].anime_list[key][i].duration.split(' ');
                        if (time[1] === "hr") {
                            approximateTime += data[0].anime_list[key][i].progress * parseInt(time[0]*60) + parseInt(time[2]);
                        }else {
                            approximateTime += data[0].anime_list[key][i].progress * parseInt(time[0]);
                        }
                    }
                }
            }
            this.setState({
                data: {},
                isFetched: false,
                approximateMinutes: approximateTime,
                animeProgress: [],
                pageWidth: window.innerWidth,
            })
            // anime progressbar
            let animeProps = [];
            animeProps.push(["Completed", data[0].anime_list["Completed"].length]);
            animeProps.push(["Watching", data[0].anime_list["Watching"].length]);
            animeProps.push(["Planning", data[0].anime_list["Plan to watch"].length]);

            this.setState({
                data: data,
                isFetched: true,
                approximateTime: Math.round(approximateTime),
                animeProgress: animeProps,
                pageWidth: window.innerWidth,
            })
            if (this.state.data.anime_list !== undefined) {
                this.setState({data: this.state.data, isFetched: true})
            }
        } catch (e) {
            console.error(e);
        }
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize)
    }


    render() {
        const {data} = this.state;
        return data[0] &&
            <div className="page profile">
                <aside className="profile-aside">
                    <div className="profile-picture">
                        <img alt="Profile picture" src="https://i.pinimg.com/originals/10/91/94/1091948c6b80b65b9eef8c163f0ae42a.jpg"/>
                    </div>
                    {this.state.pageWidth <= 800 && <div className="profile-name">
                        {this.context.user.username}
                    </div>}
                </aside>
                <main className="profile-main">
                    {this.state.pageWidth > 800 && <div className="profile-name">
                        {this.context.user.username}
                    </div>}
                    {(data[0].anime_list["Completed"].length === 0 && data[0].anime_list["Plan to watch"].length === 0 && data[0].anime_list["Watching"].length === 0) ?
                        <>Add Anime to your list to see statistics</> : <div className="anime-line">
                            <div>
                                <p style={{
                                    fontSize: '18px',
                                    lineHeight: 2
                                }}>Anime statistics:</p>
                                <StatisticBar
                                    properties={this.state.animeProgress}
                                    pageWidth={this.state.pageWidth}/>
                                <p style={{
                                    fontSize: '11px',
                                    lineHeight: 1.85,
                                }}>Completed ({data[0].anime_list["Completed"].length}) / Watching
                                    ({data[0].anime_list["Watching"].length}) / Planning
                                    ({data[0].anime_list["Plan to watch"].length})</p>
                            </div>
                            <div>
                                <ProfileGenres
                                    data={data[0].anime_list}
                                    pageWidth={this.state.pageWidth}/>
                            </div>
                            <div>
                                <TimeBar minutes={this.state.approximateMinutes} pageWidth={this.state.pageWidth}/>
                            </div>
                        </div>}
                </main>
                <div className="profile-tabs">
                    <Tabs
                        data={data[0].anime_list}
                        tabs={["Plan to watch", "Watching", "Completed"]}
                        pageWidth={this.state.pageWidth}/>
                </div>

            </div>
    }
}

export default ProfilePage;