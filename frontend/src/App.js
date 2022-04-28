import './App.css';
import {useLocation} from 'react-router-dom'
import {Route, Routes} from "react-router";
import PrivateRoute from "./utils/PrivateRoute";
import LoginPage from "./pages/LoginPage";
import React, {useEffect, useState} from "react";
import {AuthProvider} from "./context/AuthContext";
import {AnimeDataProvider} from "./context/AnimeDataContext"
import RegisterPage from "./pages/RegisterPage";
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

    useEffect(() => {
        if (location !== displayLocation) setTransistionStage("fadeOut");
    }, [location, displayLocation]);

    return (<>
            <div className="App">
                <AnimeDataProvider>
                    <AuthProvider>
                        <Navbar setIsModalActive={setIsModalActive}/>
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
                                <Route exact path="/login" element={<LoginPage/>}/>
                                <Route exact path="/register" element={<RegisterPage/>}/>
                                <Route exact path="/anime/:id" element={<AnimePage/>}/>
                                <Route exact path="/profile" element={<PrivateRoute/>}/>
                                <Route exact path='/search/:request' element={<SearchPage/>}/>
                            </Routes>
                        </div>
                        <GoToTopButton/>
                    </AuthProvider>
                </AnimeDataProvider>
                <Modal isModalActive={isModalActive} setIsModalActive={setIsModalActive}/>
            </div>
            </>
    );
}

export default App;
