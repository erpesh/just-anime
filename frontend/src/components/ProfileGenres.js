import React, {useEffect, useState} from 'react';
import StatisticBar from "./StatisticBar";

const ProfileGenres = ({data}) => {

    const [genresProgress, setGenresProgress] = useState(null);

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

        sortable.sort(function (a, b) {
            return b[1] - a[1];
        });
        setGenresProgress(sortable.slice(0, 3))

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
            <StatisticBar properties={genresProgress}/>
            <p style={{
                fontSize: '13px',
                lineHeight: 1.85,
            }}>{`${genresProgress[0][0]} (${genresProgress[0][1]}) / ${genresProgress[1][0]} (${genresProgress[1][1]}) / ${genresProgress[2][0]} (${genresProgress[2][1]})`}
            </p>
        </>

    );
};

export default ProfileGenres;