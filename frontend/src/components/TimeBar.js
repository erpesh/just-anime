import React, {useEffect, useState} from 'react';

const TimeBar = ({minutes}) => {

    const [time, setTime] = useState('');

    const translateTime = () => {
        let time = minutes
        let units = {
            "year": 24*60*365,
            "month": 24*60*30,
            "week": 24*60*7,
            "day": 24*60,
            "hour": 60,
            "minute": 1
        }

        let result = []
        for(let name in units) {
            let p =  Math.floor(time/units[name]);
            if(p === 1) result.push(p + " " + name);
            if(p >= 2) result.push(p + " " + name + "s");
            time %= units[name]
        }
        setTime(result.slice(0, 2).join(' '))
    }

    useEffect(() => {
        translateTime()
    },[])

    return (
        <>
            <div>Time spent watching Anime <span style={{float: "right"}}>{time}</span></div>
            <div className="time-bar">
                <div className="cuts"></div>
                <div className="time-bar" style={{width: "40%", background: '#f45151'}}>

                </div>
                <div className="time-bar" style={{width: "30%", background: '#aaa'}}>

                </div>
            </div>
            <div>

            </div>
        </>
    );
};

export default TimeBar;