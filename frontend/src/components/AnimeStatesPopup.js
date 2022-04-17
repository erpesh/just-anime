import React, {useContext, useEffect, useReducer, useState} from 'react';
import AnimeStates from "./AnimeStates";
import AuthContext from "../context/AuthContext";
import AnimeDataContext from "../context/AnimeDataContext";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";
import {CSSTransition, SwitchTransition} from "react-transition-group";

const AnimeStatesPopup = ({animeData}) => {
    const [isVisible, setIsVisible] = useState(false)
    const [animeState, setAnimeState] = useState("")
    const [popupState, setPopupState] = useState("")
    const {getAnimeState} = useContext(AnimeDataContext)
    const {authTokens, user} = useContext(AuthContext)
    const navigate = useNavigate()

    const handleClick = () => {
        setIsVisible(true)
    }

    useEffect(() => {
        getAnimeState(animeData, authTokens, setAnimeState)
        setPopupState(animeState)
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
                        (<div className="anime-button purp-back">
                            {user ?
                                <>
                                    {popupState ?
                                        (<span onClick={handleClick}>{popupState}</span>)
                                        :
                                        (<span onClick={handleClick}>Add to My list</span>)}
                                </>
                                :
                                <span onClick={() => navigate("/login")}>Add to My list</span>}
                        </div>)}
                </CSSTransition>
            </SwitchTransition>
        </>
    )

};

export default AnimeStatesPopup;