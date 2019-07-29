import React from 'react';

// in the API we have data about wind direction in deg values - this function returns symbol values
const setWindDirection = (degValue) => {
    if ((degValue >= 22.5) && (degValue < 67.5)) {
        return "NE";
    } else if ((degValue >= 67.5) && (degValue < 112.5)) {
        return "E";
    } else if ((degValue >= 112.5) && (degValue < 157.5)) {
        return "SE";
    } else if ((degValue >= 157.5) && (degValue < 202.5)) {
        return "S";
    } else if ((degValue >= 202.5) && (degValue < 247.5)) {
        return "SW";
    } else if ((degValue >= 247.5) && (degValue < 292.5)) {
        return "W";
    } else if ((degValue >= 292.5) && (degValue < 337.5)) {
        return "NW";
    } else {
        return "N";
    }
}

const WindDirection = (props) => {
    const { degValue } = props;

    return (
        <>
            {setWindDirection(degValue)}
        </>
    );
}

export default WindDirection;