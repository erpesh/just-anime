import React, {useEffect, useState} from 'react';

const ProgressBar = ({properties}) => {

    const [percentage, setPercentage] = useState();
    console.log(properties);
    const containerStyles = {
        display: 'flex',
        height: 20,
        width: '100%',
        backgroundColor: "#302D2D",
    }

    const fillerStyles1 = {
        height: '100%',
        // width: data["Completed"].length !== 0 ? `${data["Completed"].length / percentage}%` : 0,
        width: properties[0][1] !== 0 ? `${properties[0][1] / percentage}%` : 0,
        backgroundColor: 'rgb(119, 0, 255)',
        textAlign: 'center'
    }

    const fillerStyles2 = {
        height: '100%',
        // width: data["Watching"].length !== 0 ? `${data["Watching"].length / percentage}%` : 0,
        width: properties[1][1] !== 0 ? `${properties[1][1] / percentage}%` : 0,
        backgroundColor: 'rgb(165, 0, 255)',
        textAlign: 'center'
    }

    const fillerStyles3 = {
        height: '100%',
        // width: data["Plan to watch"].length !== 0 ? `${data["Plan to watch"].length / percentage}%` : 0,
        width: properties[2][1] !== 0 ? `${properties[2][1] / percentage}%` : 0,
        backgroundColor: 'rgb(222, 0, 255)',
        textAlign: 'center'
    }

    const labelStyles = {
        padding: 5,
        color: 'white',
        fontWeight: 'bold'
    }

    useEffect(() => {
        setPercentage((properties[0][1] + properties[1][1] + properties[2][1]) / 100.0);
        console.log((properties[0][1] + properties[1][1] + properties[2][1]) / 100.0)
    }, [])

    return (
        // <div style={containerStyles}>
        //     {data["Completed"].length === 0 && data["Watching"].length === 0 && data["Plan to watch"].length === 0 ?
        //         <div style={{width: '100%', height: '100%', textAlign: 'center', backgroundColor: 'rgb(165, 0, 255)'}}>
        //             <span style={{fontSize: '15px', fontWeight: 'bold'}}>Add anime to your list to see statistics</span>
        //         </div>:
        //     <>
        //         <div style={fillerStyles1}>
        //             <span style={labelStyles}>{data["Completed"].length !== 0 ? `${data["Completed"].length}` : ``}</span>
        //         </div>
        //         <div style={fillerStyles2}>
        //             <span style={labelStyles}>{data["Watching"].length !== 0 ? `${data["Watching"].length}` : ''}</span>
        //         </div>
        //         <div style={fillerStyles3}>
        //             <span style={labelStyles}>{data["Plan to watch"].length !== 0 ? `${data["Plan to watch"].length}` : ''}</span>
        //         </div>
        //     </>
        //     }
        // </div>
        <div style={containerStyles}>
            {properties[0][0] === 0 && properties[1][0] === 0 && properties[2][0] === 0 ?
                <div style={{width: '100%', height: '100%', textAlign: 'center', backgroundColor: 'rgb(165, 0, 255)'}}>
                    <span style={{fontSize: '15px', fontWeight: 'bold'}}>Add anime to your list to see statistics</span>
                </div> :
                <>
                    <div style={fillerStyles1}>
                        <span
                            style={labelStyles}>{properties[0][1] !== 0 ? properties[0][0] : ''}</span>
                    </div>
                    <div style={fillerStyles2}>
                          <span
                              style={labelStyles}>{properties[1][1] !== 0 ? properties[1][0] : ''}</span>
                    </div>
                    <div style={fillerStyles3}>
                        <span
                            style={labelStyles}>{properties[2][1] !== 0 ? properties[2][0] : ''}</span>
                    </div>
                </>
            }
        </div>
    );
};

export default ProgressBar;