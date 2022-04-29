import './App.css';
import {useLocation} from 'react-router-dom'
import {Route, Routes} from "react-router";
import PrivateRoute from "./utils/PrivateRoute";
import React, {useEffect, useState} from "react";
import {AuthProvider} from "./context/AuthContext";
import {AnimeDataProvider} from "./context/AnimeDataContext"
import AnimePage from "./pages/AnimePage";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import Navbar from "./components/Navbar";
import GoToTopButton from "./components/GoToTopButton";
import Modal from "./components/Modal";

function App() {

    const location = useLocation()

    const [displayLocation, setDisplayLocation] = useState(location);
    const [transitionStage, setTransistionStage] = useState("fadeIn");
    const [isModalActive, setIsModalActive] = useState(false)
    const [isLoginActive, setIsLoginActive] = useState(true);

    useEffect(() => {
        if (location !== displayLocation) setTransistionStage("fadeOut");
    }, [location, displayLocation]);

    return (<>
            <div className="App">
                <AnimeDataProvider>
                    <AuthProvider>
                        <Navbar setIsModalActive={setIsModalActive} setIsLoginActive={setIsLoginActive}/>
                        {/*<SideBar/>*/}
                        <div
                            className={`${transitionStage}`}
                            onAnimationEnd={() => {
                                if (transitionStage === "fadeOut") {
                                    setTransistionStage("fadeIn");
                                    setDisplayLocation(location);
                                }
                            }}
                        >
                            <Routes location={displayLocation}>
                                <Route exact path='/' element={<HomePage/>}/>
                                <Route exact path="/anime/:id" element={<AnimePage setIsModalActive={setIsModalActive}/>}/>
                                <Route exact path="/profile" element={<PrivateRoute/>}/>
                                <Route exact path='/search/:request' element={<SearchPage/>}/>
                            </Routes>
                        </div>
                        <Modal isModalActive={isModalActive}
                               setIsModalActive={setIsModalActive}
                               isLoginActive={isLoginActive}
                               setIsLoginActive={setIsLoginActive}/>
                        <GoToTopButton/>
                    </AuthProvider>
                </AnimeDataProvider>
            </div>
            </>
    );
}

export default App;
