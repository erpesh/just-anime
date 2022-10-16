import React, { useContext, useEffect, useState } from 'react';
import AnimeStates from "./AnimeStates";
import AuthContext from "../context/AuthContext";
import AnimeDataContext from "../context/AnimeDataContext";
import { CSSTransition, SwitchTransition } from "react-transition-group";

const AnimeStatesButton = ({ animeData, setIsModalActive }) => {
    const [isVisible, setIsVisible] = useState(false)
    const [animeState, setAnimeState] = useState("")
    const [popupState, setPopupState] = useState("")
    const { getAnimeState } = useContext(AnimeDataContext)
    const { authTokens, user } = useContext(AuthContext)

    const handleClick = () => {
        setIsVisible(true)
    }

    useEffect(() => {
        if (user) {
            getAnimeState(animeData, authTokens, setAnimeState)
            setPopupState(animeState)
        }
    }, [animeState])

    return (
        <>
            <SwitchTransition mode="out-in">
                <CSSTransition
                    timeout={500}
                    key={isVisible}
                    classNames="fade"
                >
                    {isVisible ? (
                        <AnimeStates
                            animeData={animeData}
                            animeState={animeState}
                            setIsVisible={setIsVisible}
                            setPopupState={setPopupState}
                            popupState={popupState}
                        />
                    ) :
                        (<div className="anime-button width-100 purp-back">
                            {user ?
                                <>
                                    {popupState ?
                                        (<span onClick={handleClick}>{popupState}</span>)
                                        :
                                        (<span onClick={handleClick}>Add to My list</span>)}
                                </>
                                :
                                <span onClick={() => setIsModalActive(true)}>Add to My list</span>}
                        </div>)}
                </CSSTransition>
            </SwitchTransition>
        </>
    )

};

export default AnimeStatesButton;