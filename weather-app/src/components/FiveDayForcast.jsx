import React from 'react';
import { getWeatherIcon } from './WeatherUtility';

const FiveDayForecast = ({ forecast }) => {
    if (!forecast || !Array.isArray(forecast) || forecast.length === 0) {
        return <div>No 5-day weather data available. Please select a city.</div>;
    }

    return (
        <div className="five-day-weather">
           {forecast.map(day => {
        if (!day.forecasts || day.forecasts.length === 0) {
            return (
                <div key={day.date} className="forecast-day">
                    <h3>{day.date}</h3>
                    <p>No data available for this day</p>
                </div>
            );
        }
        
        const firstForecast = day.forecasts[0]; // Safely access the first forecast entry
        return (
            <div key={day.date} className="forecast-day">
                <h3>{day.date}</h3>
                <img
                    src={getWeatherIcon(firstForecast?.conditionCode || 'default')}
                    alt={firstForecast?.conditionCode || 'Unknown'}
                    className="weather-img"
                />
                <div className="temperature">
                    {firstForecast?.airTemperature
                        ? `${Math.round(firstForecast.airTemperature)}°C`
                        : 'No Temp Data'}
                </div>
                <div className="description">
                    {firstForecast?.conditionCode
                        ? firstForecast.conditionCode.replace('-', ' ').toUpperCase()
                        : 'No Condition Data'}
                </div>
            </div>
        );
    })}
        </div>
    );
};

export default FiveDayForecast;