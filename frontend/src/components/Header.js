import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Header = () => {
    const {user, logoutUser} = useContext(AuthContext)
    return (
        <div>
            <Link to="/"><button type="button">Home</button></Link>
            {user? <button onClick={logoutUser}>Logout</button> :
                <>
                <Link to="/login"><button type="button">Login</button></Link>
                <Link to="/register"><button type="button">Register</button></Link>
                </>}
            {user &&
            <div>
                <p>Hello {user.username}</p>
                <Link to="/profile"><button>Profile</button></Link>
            </div>}
        </div>
    );
};

export default Header;