import React from 'react';
import "./recommendations.css";
import {Link} from "react-router-dom";

const Recommendation = ({data, isLast}) => {
    return (
        <div className={`recommendation-container${!isLast ? " after-2" : ""}`}>
            <div className="recommendation">
                <Link to={`anime/${data.entry[0].mal_id}`}>
                    <div className="recommend-image">
                        <img alt="Anime Image" src={data.entry[0].images.jpg.large_image_url}/>
                    </div>
                    <div className="recommend-title">
                        {data.entry[0].title}
                    </div>
                </Link>
            </div>
            <div className="recommendation-content">
                {data.content}
            </div>
            <div className="recommendation">
                <Link to={`anime/${data.entry[1].mal_id}`}>
                    <div className="recommend-image">
                        <img alt="Anime Image" src={data.entry[1].images.jpg.large_image_url}/>
                    </div>
                    <div className="recommend-title">
                        {data.entry[1].title}
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Recommendation;