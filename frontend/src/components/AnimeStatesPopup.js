import React, {useState} from 'react';
import AnimeState from "./AnimeState";

const AnimeStatesPopup = () => {
    const [userState, setUserState] = useState('')
    const [isVisible, setIsVisible] = useState(false)

    const handleClick = () => {
        setIsVisible(true)
    }

    return (
        isVisible ? (
            <div>
                <AnimeState>Watching</AnimeState>
                <AnimeState>Completed</AnimeState>
                <AnimeState>Plan to watch</AnimeState>
            </div>
        ) : (
            <div>
                <div onClick={handleClick}>Add to list</div>
            </div>
        )
    );
};

export default AnimeStatesPopup;