import React, {useEffect, useState} from 'react';

const ProgressBar = ({properties}) => {

    const [percentage, setPercentage] = useState();

    const containerStyles = {
        display: 'flex',
        height: 20,
        width: '100%',
        backgroundColor: "#302D2D",
    }

    const labelStyles = {
        padding: 5,
        color: 'white',
        fontWeight: 'bold'
    }

    useEffect(() => {
        setPercentage((properties[0][1] + properties[1][1] + properties[2][1]) / 100.0);
    }, [])

    return (
        <div style={containerStyles}>
            <>
                {properties.map((el, index) => {
                    return <div style={{
                        height: '100%',
                        width: el[1] !== 0 ? `${el[1] / percentage}%` : 0,
                        backgroundColor: `rgb(${120+index*50}, 0, 255)`,
                        textAlign: 'center'
                    }} key={index}>
                        <span style={labelStyles}>{el[1] !== 0 ? el[0] : ''}</span>
                    </div>
                })}
            </>
        </div>
    );
};

export default ProgressBar;