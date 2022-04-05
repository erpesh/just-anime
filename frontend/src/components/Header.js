import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Header = () => {
    const {user, logoutUser} = useContext(AuthContext)
    return (
        <div>
            <Link to="/"><button type="button">Home</button></Link>
            <span>    </span>
            {user? <button onClick={logoutUser}>Logout</button> : <Link to="/login"><button type="button">Login</button></Link>}
            {user && <p>Hello {user.username}</p>}
        </div>
    );
};

export default Header;