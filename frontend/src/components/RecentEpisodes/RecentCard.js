import React from 'react';
import './recentEpisodes.css';
import {Link} from "react-router-dom";

const RecentCard = ({data}) => {
    return (
        <div className="recent-card">
            <Link to={`/anime/${data.entry.mal_id}`}>
                <div
                    className="recent-background"
                    style={{backgroundImage: `url(${data.entry.images.jpg.large_image_url})`}}
                >
                    <div className="recent-episode-num">
                        {data.episodes[0].title.slice(0, 2) + data.episodes[0].title.slice(7)}
                    </div>
                </div>
                <div className="recent-title">{data.entry.title}</div>
            </Link>
        </div>
    );
};

export default RecentCard;