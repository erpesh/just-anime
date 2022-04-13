import React, {useEffect} from 'react';
import TopAiring from "../components/TopAiring";

const HomePage = ({isAuth}) => {


    return (
        <div>
            <p>Here is a home page</p>
            <TopAiring/>
        </div>
);
};

export default HomePage;