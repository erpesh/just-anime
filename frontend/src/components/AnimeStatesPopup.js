import React, {useState} from 'react';
import AnimeState from "./AnimeState";

const AnimeStatesPopup = ({animeData}) => {
    const [userState, setUserState] = useState('')
    const [isVisible, setIsVisible] = useState(false)

    const handleClick = () => {
        setIsVisible(true)
    }

    return (
        isVisible ? (
            <div>
                <AnimeState animeData={animeData}>Watching</AnimeState>
                <AnimeState animeData={animeData}>Completed</AnimeState>
                <AnimeState animeData={animeData}>Plan to watch</AnimeState>
            </div>
        ) : (
            <div>
                <div onClick={handleClick}>Add to list</div>
            </div>
        )
    );
};

export default AnimeStatesPopup;