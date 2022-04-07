import React, {useEffect} from 'react';
import AnimeSearch from "../components/AnimeSearch";

const HomePage = ({isAuth}) => {
    // const {authTokens, logoutUser} = useContext(AuthContext)

    useEffect(() => {
        if (isAuth) {
            // getNotes()
        }
    }, [])


    return (
        <div>
            <p>Here is a home page</p>

            <AnimeSearch/>
        </div>
    );
};

export default HomePage;