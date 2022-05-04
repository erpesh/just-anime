import React, {useEffect, useState} from 'react';
import ProgressBar from "./ProgressBar";

const ProfileGenres = ({data}) => {

    const [genres, setGenres] = useState('');
    const [genresProgress, setGenresProgress] = useState([]);

    useEffect(() => {
        let obj = {};
        data["Completed"].forEach((anime) => {
            anime.genres.forEach((genre) => {
                if (genre in obj) {
                    obj[genre] = obj[genre] + 1;
                } else {
                    obj[genre] = 1;
                }
            })
        })
        let sortable = [];
        for (const item in obj) {
            sortable.push([item, obj[item]]);
        }

        sortable.sort(function(a, b) {
            return b[1] - a[1];
        });
        console.log(sortable);
        setGenresProgress(sortable.slice(0, 3))
        setGenres(Object.keys(obj).sort((a, b) => obj[b] - obj[a]).slice(0, 3).join(', '))
    }, [])

    return (
        genresProgress &&
        <>
            <p style={{
                fontSize: '18px',
                lineHeight: 2
            }}>
                Favourite genres:
            </p>
            <ProgressBar properties={genresProgress}/>
            <p style={{
                fontSize: '13px',
                lineHeight: 1.85,
            }}>{`${genresProgress[0][0]} (${genresProgress[0][1]}) / ${genresProgress[1][0]} (${genresProgress[1][1]}) / ${genresProgress[2][0]} (${genresProgress[2][1]})`  }
            </p>
        </>

    );
};

export default ProfileGenres;