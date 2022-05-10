import React, {useEffect, useState} from 'react';
import TopAiring from "../components/TopAiring";
import Carousel from "../components/Carousel";

const HomePage = () => {

    const [data, setData] = useState([]);

    const foo = async () => {
        const _data = await fetch("https://api.jikan.moe/v4/anime/11757/pictures")
            .then(response => response.json())
        setData(_data.data);
    }

    useEffect(() => {
        foo()
    }, [])

    return (
        <div className="home-page">
            {/*<TopAiring/>*/}
            <Carousel/>
            {data.map(el => {
                return <img alt="2" src={el.jpg.image_url}/>
            })}
        </div>
);
};

export default HomePage;