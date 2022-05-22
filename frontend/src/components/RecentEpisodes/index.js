import React, {useEffect, useState} from 'react';
import './recentEpisodes.css';
import RecentCard from "./RecentCard";

const RecentEpisodes = ({calculateWidth}) => {

    const [data, setData] = useState([]);

    const recentEpisodesFetch = async () => {
        const data = await fetch("https://api.jikan.moe/v4/watch/episodes")
            .then(response => response.json())
        setData(data.data)
    }

    useEffect(() => {
        recentEpisodesFetch()
    }, [])

    return data && (
        <div className="recent-container" style={{maxWidth: calculateWidth()}}>
            <div className="airing-header">
                <span>Recent Episodes</span>
            </div>
            <div className="recent-cards-container">
                {data.map((el, ind) => <RecentCard key={ind} data={data[ind]}/>)}
            </div>
        </div>
    );
};

export default RecentEpisodes;