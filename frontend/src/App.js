import './App.css';
import {BrowserRouter as Router} from 'react-router-dom'
import {Route, Routes, Search} from "react-router";
import PrivateRoute from "./utils/PrivateRoute";
import LoginPage from "./pages/LoginPage";
import React from "react";
import {AuthProvider} from "./context/AuthContext";
import {AnimeDataProvider} from "./context/AnimeDataContext"
import RegisterPage from "./pages/RegisterPage";
import AnimePage from "./pages/AnimePage";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import Navbar from "./components/Navbar";

function App() {
    return (
        <Router>
            <div className="App">
                <AnimeDataProvider>
                <AuthProvider>
                    <Navbar/>
                    <Routes>
                        <Route exact path='/' element={<HomePage/>}/>
                        <Route exact path="/login" element={<LoginPage/>}/>
                        <Route exact path="/register" element={<RegisterPage/>}/>
                        <Route exact path="/anime/:id" element={<AnimePage/>}/>
                        <Route exact path="/profile" element={<PrivateRoute/>}/>
                        <Route exact path='/search/:request' element={<SearchPage/>}/>
                    </Routes>
                </AuthProvider>
                </AnimeDataProvider>
            </div>
        </Router>
    );
}

export default App;
