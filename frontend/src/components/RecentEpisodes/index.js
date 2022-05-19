import React, {useEffect} from 'react';
import './recentEpisodes.css';
import Container from "./Container";
import RecentCard from "./RecentCard";

const Index = () => {

    const recentEpisodesFetch = async () => {
        const data = await fetch("https://api.jikan.moe/v4/watch/episodes")
            .then(response => response.json())
        console.log(data)
    }

    useEffect(() => {
        recentEpisodesFetch()
    }, [])

    return (
        <Container>
            {/*{recentEpisodesFetch().map(el => <RecentCard data={el}/>)}*/}
        </Container>
    );
};

export default Index;