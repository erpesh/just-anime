import React, {useEffect, useState} from 'react';
import "./recommendations.css";
import Recommendation from "./Recommendation";

const Recommendations = ({calculateWidth}) => {

    const [recommends, setRecommends] = useState();
    const [index, setIndex] = useState(5);

    const fetchRecommendations = async () => {
        const data = await fetch("https://api.jikan.moe/v4/recommendations/anime")
            .then(response => response.json())
        setRecommends(data.data)
    }

    useEffect(() => {
        fetchRecommendations();
    }, [])

    return recommends && (
        <div style={{maxWidth: calculateWidth()}} className="recommendations">
            <div className="airing-header">
                <span>Latest Anime Recommendations</span>
            </div>
            <div className="recommendations-container">
                {recommends.map((el, ind) => {
                    if (ind < index) {
                        return <Recommendation key={ind} data={el} isLast={ind === index - 1}/>
                    }
                })}
            </div>
            {index < 100 &&
                <div className="view-more" onClick={() => setIndex(prevState => prevState + 5)}>
                    View more
                </div>}
        </div>
    );
};

export default Recommendations;