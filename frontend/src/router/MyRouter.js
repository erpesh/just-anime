import React from 'react';
import {Route, Routes} from "react-router";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";

const MyRouter = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/" element={<HomePage/>} exact/>
        </Routes>
    );
};

export default MyRouter;