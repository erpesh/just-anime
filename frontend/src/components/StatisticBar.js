import React, {useEffect, useState} from 'react';

const StatisticBar = ({properties, pageWidth}) => {

    const [percentage, setPercentage] = useState();

    const containerStyles = {
        display: 'flex',
        height: 14,
        width: '100%',
        backgroundColor: "#302D2D",
    }

    const labelStyles = {
        fontSize: 11,
        color: 'white',
        fontWeight: 'bold',
        height: 14,
        margin: "0 auto"
    }

    useEffect(() => {
        setPercentage((properties[0][1] + properties[1][1] + properties[2][1]) / 100.0);
    }, [])

    return (
        <div style={containerStyles}>
            <>
                {properties.map((el, index) => {
                    return <div style={{
                        width: el[1] !== 0 ? `${el[1] / percentage}%` : 0,
                        backgroundColor: `rgb(${120+index*50}, 0, 255)`,
                        textAlign: 'center',
                        display: 'flex',
                        height: '100%'
                    }} key={index}>
                        <span style={labelStyles}>{el[1] !== 0 ? pageWidth > 600 ? el[0] : el[1] : ''}</span>
                    </div>
                })}
            </>
        </div>
    );
};

export default StatisticBar;