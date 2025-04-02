import sunny from '../assets/images/sunny.jpg';
import cloudy from '../assets/images/cloudy.jpg';
import rainy from '../assets/images/rainy.jpg';
import snowy from '../assets/images/snowy.jpg';
import foggy from '../assets/images/foggy.jpg';
import sky from '../assets/images/sky.jpg';

const getWeatherIcon = (conditionCode) => {
    switch (conditionCode) {
        case 'clear': return sunny;
        case 'cloudy': return cloudy;
        case 'rainy': return rainy;
        case 'snowy': return snowy;
        case 'foggy': return foggy;
        default: return sky;
    }
};

const fetchWeather = async (cityCode) => {
    const url = `https://api.allorigins.win/get?url=https://api.meteo.lt/v1/places/${cityCode}/forecasts/long-term`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const parsedData = JSON.parse(data.contents);

        if (parsedData && parsedData.forecastTimestamps) {
            const groupedForecast = parsedData.forecastTimestamps.reduce((acc, timestamp) => {
                const date = timestamp.forecastTimeUtc.split('T')[0];
                if (!acc[date]) {
                    acc[date] = timestamp;
                }
                return acc;
            }, {});
            return Object.values(groupedForecast).slice(0, 6); // Return five-day forecast
        } else {
            console.error('No forecast data found');
            return null;
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
};

const fetchCities = async () => {
    const url = `https://api.allorigins.win/get?url=https://api.meteo.lt/v1/places`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return JSON.parse(data.contents); // Return list of cities
    } catch (error) {
        console.error('Error fetching cities:', error);
        return [];
    }
};

export { getWeatherIcon, fetchWeather, fetchCities };