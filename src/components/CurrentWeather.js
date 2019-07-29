import React from 'react';
import Icon from './Icon';
import WindDirection from './WindDirection';

// time of sunrise and sunset is in unix format in the API - this function changes this format to date format
const setTimeFormatFromUnix = (unixFormat) => {
    const dateFormat = new Date(unixFormat * 1000);
    const hours = dateFormat.getHours();
    const minutes = dateFormat.getMinutes();
    return `${(hours > 9) ? hours : `0${hours}`}:${(minutes > 9) ? minutes : `0${minutes}`}`;
}

const CurrentWeather = (props) => {
    const { currentWeather } = props;

    // component with current weather (two parts) - icon and some info about current weather
    return (
        <div id="currentWeather">
            <div>
                <Icon
                    title={true}
                    iconId={currentWeather.weather[0].icon}
                />
                <span>{currentWeather.main.temp.toFixed()}<sup> {"\xB0C"}</sup></span>
            </div>
            <div>
                Ciśnienie: <span>{currentWeather.main.pressure} hPa</span><br />
                Wiatr: <span>{currentWeather.wind.speed} m/s&nbsp;
                <WindDirection degValue={currentWeather.wind.deg} /></span><br />
                Wilgotność: <span>{currentWeather.main.humidity}%</span><br />
                Wschód słońca: <span>{setTimeFormatFromUnix(currentWeather.sys.sunrise)}</span><br />
                Zachód słońca: <span>{setTimeFormatFromUnix(currentWeather.sys.sunset)}</span>
            </div>
        </div>
    );
}

export default CurrentWeather;