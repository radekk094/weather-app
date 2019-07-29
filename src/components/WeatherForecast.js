import React from 'react';
import DailyWeatherForecast from './DailyWeatherForecast';

const WeatherForecast = (props) => {
    const { weatherForecast, firstDayIndex, firstDayIndexImproved, firstNightIndex, daysNames } = props;

    const weatherForecastList = [];

    // the App knows only first day-index and first night-index (for data from 3:00 PM and 3:00 AM) - this loop checks other indexes of weather forecast array and creates elements for next indexes - for all five days
    for (let i = 0; i < 5; i++) {
        if (i === 0) {
            weatherForecastList.push(
                <DailyWeatherForecast
                    key={i}
                    dayWeatherForecast={weatherForecast[firstDayIndexImproved]}
                    nightWeatherForecast={weatherForecast[firstNightIndex]}
                    firstDay={true}
                    daysNames={daysNames}
                />
            );
        } else {
            weatherForecastList.push(
                <DailyWeatherForecast
                    key={i}
                    dayWeatherForecast={weatherForecast[firstDayIndex + (i * 8)]}
                    nightWeatherForecast={weatherForecast[firstNightIndex + (i * 8)]}
                    firstDay={false}
                    daysNames={daysNames}
                />
            )
        }
    }

    return (
        <div id="weatherForecast">
            {weatherForecastList}
        </div>
    );
}

export default WeatherForecast;