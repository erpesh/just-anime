import React, {useState} from 'react';

const AnimeStatesPopup = () => {
    const [userState, setUserState] = useState('')
    const [isVisible, setIsVisible] = useState(false)

    const handleClick = () => {
        setIsVisible(true)
    }

    return (
        isVisible ? (
            <div>
                <div>Watching</div>
                <div>Completed</div>
                <div>Plan to watch</div>
            </div>
        ) : (
            <div>
                <div onClick={handleClick}>Add to list</div>
            </div>
        )
    );
};

export default AnimeStatesPopup;