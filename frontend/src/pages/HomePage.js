import React, {useEffect} from 'react';
import AnimeSearch from "../components/AnimeSearch";

const HomePage = ({isAuth}) => {


    return (
        <div>
            <p>Here is a home page</p>

            <AnimeSearch/>
        </div>
    );
};

export default HomePage;