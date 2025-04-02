import React from 'react';
import { getWeatherIcon } from './WeatherUtility';



const TodayWeatherInfo = ({ weather }) => {
    if (!weather || !Array.isArray(weather) || weather.length === 0) {
        return <div>No weather data available. Please select a city.</div>;
    }

    const currentWeather = weather[0]; // Today's weather is the first entry

    return (
        <>
            <img
                src={getWeatherIcon(currentWeather?.conditionCode || "default")}
                alt={currentWeather?.conditionCode || "Unknown"}
                className="weather-img"
            />
            <div className="temperature">
                {currentWeather?.airTemperature
                    ? Math.round(currentWeather.airTemperature)
                    : "No Temp Data"}°C
            </div>
            <div className="description">
                {currentWeather?.conditionCode
                    ? currentWeather.conditionCode.replace('-', ' ').toUpperCase()
                    : "No Condition Data"}
            </div>
            <div className="humidity">
                <i className="fa fa-tint"></i> Humidity: {currentWeather?.relativeHumidity || "No Data"}%
            </div>
            <div className="wind-speed">
                <i className="fas fa-wind"></i> Wind Speed: {currentWeather?.windSpeed || "No Data"} km/h
            </div>
        </>
    );
};

export default TodayWeatherInfo;