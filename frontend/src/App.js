import './App.css';
import {BrowserRouter as Router} from 'react-router-dom'
import Header from "./components/Header";
import {Route, Routes} from "react-router";
import PrivateRoute from "./utils/PrivateRoute";
import LoginPage from "./pages/LoginPage";
import React from "react";
import {AuthProvider} from "./context/AuthContext";
import RegisterPage from "./pages/RegisterPage";

function App() {
    return (
        <Router>
            <div className="App">
                <AuthProvider>
                    <Header/>
                    <Routes>
                        <Route exact path='/' element={<PrivateRoute/>}/>
                        <Route exact path="/login" element={<LoginPage/>}/>
                        <Route exact path="/register" element={<RegisterPage/>}/>
                    </Routes>
                </AuthProvider>

            </div>
        </Router>

    );
}

export default App;
