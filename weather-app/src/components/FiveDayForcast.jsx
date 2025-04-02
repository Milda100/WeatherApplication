import React from 'react';
import { getWeatherIcon } from './WeatherUtility';

const FiveDayForecast = ({ forecast }) => {
    if (!forecast || !Array.isArray(forecast) || forecast.length === 0) {
        return <div>No 5-day weather data available. Please select a city.</div>;
    }

    return (
        <div className="five-day-weather">
            {forecast.slice(1, 6).map((dayForecast, index) => (
                <div key={index} className="forecast-day">
                    <h3>{dayForecast?.forecastTimeUtc?.split('T')[0] || 'Unknown Date'}</h3>
                    <img
                        src={getWeatherIcon(dayForecast?.conditionCode || 'default')}
                        alt={dayForecast?.conditionCode || 'Unknown'}
                        className="weather-img"
                        height="50"
                    />
                    <div className="temperature">
                        {dayForecast?.airTemperature
                            ? `${Math.round(dayForecast.airTemperature)}°C`
                            : 'No Temp Data'}
                    </div>
                    <div className="description">
                        {dayForecast?.conditionCode
                            ? dayForecast.conditionCode.replace('-', ' ').toUpperCase()
                            : 'No Condition Data'}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FiveDayForecast;