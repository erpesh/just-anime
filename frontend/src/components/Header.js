import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import AuthContext from "../context/AuthContext";
import AnimeSearch from "./AnimeSearch";

const Header = () => {
    const {user, logoutUser} = useContext(AuthContext)
    return (
        <div className="header-container">
            <Link to="/"><button type="button">Home</button></Link>
            {user? <button onClick={logoutUser}>Logout</button> :
                <>
                <Link to="/login"><button type="button">Login</button></Link>
                <Link to="/register"><button type="button">Register</button></Link>
                </>}
            {user &&
                <Link to="/profile"><button>{user.username}</button></Link>}
            <AnimeSearch/>
        </div>
    );
};

export default Header;