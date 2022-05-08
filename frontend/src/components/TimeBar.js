import React, {useEffect, useState} from 'react';

const TimeBar = ({minutes}) => {

    const [time, setTime] = useState('');
    const [progress, setProgress] = useState(0);

    const units = {
        "year": 24*60*365,
        "month": 24*60*30,
        "week": 24*60*7,
        "day": 24*60,
        "hour": 60,
    }

    const translateTime = () => {
        let time = minutes
        let result = []
        for(let name in units) {
            let p =  Math.floor(time/units[name]);
            if(p === 1) result.push(p + " " + name);
            if(p >= 2) result.push(p + " " + name + "s");
            time %= units[name]
        }
        setTime(result.slice(0, 2).join(' '))
    }
    const calculateProgress = () => {
        if (minutes < units.week) {
            setProgress((minutes / units.week) * 10);
        }else if (minutes < units.month) {
            setProgress((minutes - units.week) * 20 / (units.month - units.week) + 10)
        }else if (minutes < units.month * 3) {
            setProgress((minutes - units.month) * 20 / (units.month * 2) + 30)
        }else if (minutes < units.month * 6){
            setProgress((minutes - units.month * 3) * 20 / (units.month * 3) + 50)
        }else if (minutes < units.year){
            setProgress((minutes - units.month * 6) * 20 / (units.month * 6) + 70)
        }else {
            setProgress((minutes - units.year) * 10 / (units.year * 2) + 90)
        }
    }

    useEffect(() => {
        translateTime()
        calculateProgress()
    },[])

    return (
        <>
            <div style={{
                fontSize: '18px',
                lineHeight: 2
            }}>Time spent watching Anime <span style={{float: "right"}}>{time}</span></div>
            <div className="time-bar">
                <div className="cuts">
                    {Array.from(Array(5).keys()).map(value => {
                        return <div key={value} className="cut" style={{left: `${value*20 + 10}%`}}></div>
                    })}
                </div>
                <div className="time-part" style={{width: `${progress}%`, background: '#BD00FF'}}></div>
                <div className="time-part" style={{width: `${100-progress}%`, background: '#aaa'}}></div>
            </div>
            <div className="times">
                {["1 week", '1 month', '3 month', '6 month', '1 year'].map((el, index) => {
                    return <div key={el} className={`time${progress > index*20 + 10 ? " checked-time" : ""}`} >{el}</div>
                })}
            </div>
        </>
    );
};

export default TimeBar;