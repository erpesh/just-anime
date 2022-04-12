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
                <Link to="/profile"><button>{user.username}</button></Link>}
        </div>
    );
};

export default Header;