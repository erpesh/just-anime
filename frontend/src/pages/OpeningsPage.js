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
        const response = await fetch(`https://themes.moe/api/themes/44511`)
        if (response.status === 200) {
            let data = await response.json();
            console.log(data);
            // let themeNames = [];
            // data.themes = data.themes.filter(item => {
            //     const condition = item.themeType.includes("OP") && !themeNames.includes(item.themeName)
            //     if (!themeNames.includes(item.themeName))
            //         themeNames.push(item.themeName);
            //     return condition;
            // })
            // let x = new Audio(data.themes[1].mirror.mirrorURL)
            setVideo(data.data.music_videos[0].video.url);
            // setAudio(x);
        } else {
            console.log("error");
        }
    }

    useEffect(( ) => {
        getThemes()
    }, [])

    return (
        <div className={"page"}>
            <div onClick={playPause}>124-281294124124</div>
            <ReactPlayer
                className='react-player fixed-bottom'
                url={video}
                controls
            />
        </div>
    );
};

export default OpeningsPage;