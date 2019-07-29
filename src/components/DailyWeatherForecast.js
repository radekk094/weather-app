import React from 'react';
import Icon from './Icon';

const DailyWeatherForecast = (props) => {
    const { dayWeatherForecast, nightWeatherForecast, firstDay, daysNames } = props;

    const itemFullDate = new Date(dayWeatherForecast.dt_txt);

    // component with data for one day with three parts - name of the day, icons and temperature values and info about air pressure
    return (
        <div className="dailyWeather">
            <div>
                <h4>{firstDay ? "Dzisiaj" : daysNames[itemFullDate.getDay()]}</h4>
            </div>
            <div className="temperatureValues">
                <div>
                    <Icon
                        title={false}
                        iconId={dayWeatherForecast.weather[0].icon}
                    />
                    {dayWeatherForecast.main.temp.toFixed() + "\xB0C"}
                </div>
                <div>
                    <Icon
                        title={false}
                        iconId={nightWeatherForecast.weather[0].icon}
                    />
                    {nightWeatherForecast.main.temp.toFixed() + "\xB0C"}
                </div>
            </div>
            <div>
                Ciśn.: {dayWeatherForecast.main.pressure.toFixed()}&nbsp;hPa
            </div>
        </div>
    );
}

export default DailyWeatherForecast;