import React, {useEffect, useState} from 'react';
import ReactPlayer from "react-player";

const OpeningsPage = () => {

    const [audio, setAudio] = useState(null);
    const [video, setVideo] = useState("");
    const [isPlaying, setIsPlaying] = useState(false);

    const playPause = () => {
        if (isPlaying) {
            // Pause the song if it is playing
            audio.pause();
        } else {

            // Play the song if it is paused
            audio.play();
        }

        // Change the state of song
        setIsPlaying(!isPlaying)
    };

    const getThemes = async () => {
        const response = await fetch(`https://themes.moe/api/themes/269`)
        if (response.status === 200) {
            let data = await response.json();
            data = data[0]
            let themeNames = [];
            data.themes = data.themes.filter(item => {
                const condition = item.themeType.includes("OP") && !themeNames.includes(item.themeName)
                if (!themeNames.includes(item.themeName))
                    themeNames.push(item.themeName);
                return condition;
            })
            console.log(data);
            let x = new Audio(data.themes[1].mirror.mirrorURL)
            setVideo(data.themes[4].mirror.mirrorURL);
            setAudio(x);
        } else {
            console.log("error");
        }
    }

    useEffect(( ) => {
        getThemes()
    }, [])

    return (
        <div style={{color: "#FFF", paddingTop: '4rem'}}>
            <div onClick={playPause}>124-281294124124</div>
            <ReactPlayer
                className='react-player fixed-bottom'
                url={video}
                width='80%'
                height='80%'
                controls
            />
        </div>
    );
};

export default OpeningsPage;