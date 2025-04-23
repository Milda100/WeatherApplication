import React from 'react';
import { getWeatherIcon } from './WeatherUtility';


const formatedDate = (dateString) => {
    const options = { weekday: "long", month: "long", day: "numeric" }; // Example: "Friday, April 11"
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

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
                    <h3>{formatedDate(day.date)}</h3>
                    <p>No data available for this day</p>
                </div>
            );
        }
        
        return (
            <div key={day.date} className="forecast-day">
                <h3>{formatedDate(day.date)}</h3>
                <img
                    src={getWeatherIcon(day.dominantCondition || 'default')}
                    alt={day.dominantCondition || 'Unknown'}
                    className="weather-img"
                />
                <div className="temperature">
                    <p>High: {day.highTemp}°C</p>
                    <p>Low: {day.lowTemp}°C</p>
                </div>
                <div className="description">
                {day.dominantCondition
                  ? day.dominantCondition.replace('-', ' ').toUpperCase()
                  : 'No Condition Data'}
                </div>
            </div>
        );
    })}
    </div>
    );
};

export default FiveDayForecast;