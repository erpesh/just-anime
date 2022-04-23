import './App.css';
import {BrowserRouter as Router, useLocation} from 'react-router-dom'
import {Route, Routes, Search} from "react-router";
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
import SideBar from "./components/SideBar";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import GoToTopButton from "./components/GoToTopButton";

function App() {

    // const routes = [
    //     { path: '/', name: 'Home', Component: HomePage },
    //     { path: '/login', name: 'Login', Component: LoginPage },
    //     { path: '/register', name: 'Register', Component: RegisterPage },
    //     { path: '/anime/:id', name: 'AnimePage', Component: AnimePage },
    //     { path: '/profile', name: 'Profile', Component: PrivateRoute },
    //     { path: '/search/:request', name: 'Search', Component: SearchPage },
    // ]

    const location = useLocation()

    const [displayLocation, setDisplayLocation] = useState(location);
    const [transitionStage, setTransistionStage] = useState("fadeIn");

    useEffect(() => {
        if (location !== displayLocation) setTransistionStage("fadeOut");
    }, [location, displayLocation]);

    return (
        <div className="App">
            <AnimeDataProvider>
                <AuthProvider>
                    <Navbar/>
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
                            {/*{routes.map(({ path, Component }) => (*/}
                            {/*    <Route key={path} exact path={path}>*/}
                            {/*        {({ match }) => (*/}
                            {/*            <CSSTransition*/}
                            {/*                in={match != null}*/}
                            {/*                timeout={300}*/}
                            {/*                classNames="page"*/}
                            {/*                unmountOnExit*/}
                            {/*            >*/}
                            {/*                <div className="page">*/}
                            {/*                    <Component />*/}
                            {/*                </div>*/}
                            {/*            </CSSTransition>*/}
                            {/*        )}*/}
                            {/*    </Route>*/}
                            {/*))}*/}
                        </Routes>
                    </div>
                    <GoToTopButton/>
                </AuthProvider>
            </AnimeDataProvider>
        </div>
    );
}

export default App;
