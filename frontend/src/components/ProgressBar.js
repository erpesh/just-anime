import React, {useEffect, useState} from 'react';

const ProgressBar = ({ bgcolor, data }) => {

    const [percentage, setPercentage] = useState();

    const containerStyles = {
        display: 'flex',
        height: 20,
        width: '100%',
        backgroundColor: "#e0e0de",
    }

    const fillerStyles1 = {
        height: '100%',
        width: `${data["Completed"].length/percentage}%`,
        backgroundColor: bgcolor,
        borderRadius: 'inherit',
        textAlign: 'center'
    }

    const fillerStyles2 = {
        height: '100%',
        width: `${data["Watching"].length/percentage}%`,
        backgroundColor: bgcolor,
        borderRadius: 'inherit',
        textAlign: 'center'
    }

    const fillerStyles3 = {
        height: '100%',
        width: `${data["Plan to watch"].length/percentage}%`,
        backgroundColor: bgcolor,
        borderRadius: 'inherit',
        textAlign: 'center'
    }

    const labelStyles = {
        padding: 5,
        color: 'white',
        fontWeight: 'bold'
    }

    useEffect(() => {
        let _percentage = (data["Plan to watch"].length + data["Completed"].length + data["Watching"].length) / 100.0;
        setPercentage(_percentage)
    }, [])

    return (
        <div style={containerStyles}>
            <div style={fillerStyles1}>
                <span style={labelStyles}>{data["Completed"].length !== 0 ? `${data["Completed"].length}` : ``}</span>
            </div>
            <div style={fillerStyles2}>
                <span style={labelStyles}>{data["Watching"].length !== 0 ? `${data["Watching"].length}` : ''}</span>
            </div>
            <div style={fillerStyles3}>
                <span style={labelStyles}>{data["Plan to watch"].length !== 0 ? `${data["Plan to watch"].length}` : ''}</span>
            </div>
        </div>
    );
};

export default ProgressBar;