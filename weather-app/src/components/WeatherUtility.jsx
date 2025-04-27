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

const fetchFiveDayForecast = async (cityCode) => {
    const url = `https://api.allorigins.win/get?url=https://api.meteo.lt/v1/places/${cityCode}/forecasts/long-term`;
    
    try {
      const response = await fetch(url);  
      const data = await response.json();
      const weatherData = JSON.parse(data.contents);
  
      if (!weatherData.forecastTimestamps || weatherData.forecastTimestamps.length === 0) {
        throw new Error("No forecast data received");
      }
  
      // Group forecasts by date
      const fiveDayForecast = weatherData.forecastTimestamps.reduce((acc, entry) => {
        // Convert forecastTimeUtc to a Date object
        const forecastDate = new Date(entry.forecastTimeUtc);
    
        // Format it to YYYY-MM-DD
        const date = forecastDate.toISOString().split("T")[0];
    
        // Initialize the date key if it doesn't exist
        if (!acc[date]) {
            acc[date] = [];
        }
    
        // Add the entry to the corresponding date's array
        acc[date].push(entry);
    
        return acc;
    }, {});
    

      console.log("Five-Day Forecast for real:", fiveDayForecast);
      console.log("test:", Object.keys(fiveDayForecast));

  
      // Keep only the next 5 days
      const today = new Date();
      const fiveDayKeys = Object.keys(fiveDayForecast)
        .filter(date => new Date(date) >= today) // Filter out past dates
        .slice(1, 6); // Limit to 5 days
  
        const finalForecast = fiveDayKeys.map(date => {
          const hourlyData = fiveDayForecast[date];
        
          // Calculate high and low temperatures
          const highTemp = Math.max(...hourlyData.map(entry => entry.airTemperature));
          const lowTemp = Math.min(...hourlyData.map(entry => entry.airTemperature));
        
          // Find the most frequent conditionCode
          const conditionCounts = hourlyData.reduce((counts, entry) => {
            counts[entry.conditionCode] = (counts[entry.conditionCode] || 0) + 1;
            return counts;
          }, {});
          const dominantCondition = Object.keys(conditionCounts).reduce((a, b) =>
            conditionCounts[a] > conditionCounts[b] ? a : b
          );
        
          return {
            date,
            highTemp: highTemp.toFixed(1),
            lowTemp: lowTemp.toFixed(1),
            dominantCondition, // Most frequent conditionCode
            forecasts: hourlyData // Preserve hourly details
          };
        });
        
        console.log("Final Forecast with Dominant Conditions:", finalForecast);
  
      return finalForecast;
    } catch (error) {
      console.error('Error fetching forecast data:', error);
      throw error;
    }
  };

const fetchWeather = async (cityCode) => {
    const url = `https://api.allorigins.win/get?url=https://api.meteo.lt/v1/places/${cityCode}/forecasts/long-term`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const weatherData = JSON.parse(data.contents);
        const currentDate = new Date();

        if (weatherData && weatherData.forecastTimestamps) {
            const currentForecast = weatherData.forecastTimestamps.reduce((prev, curr) => {
                const prevDiff = Math.abs(new Date(prev.forecastTimeUtc) - currentDate);
                const currDiff = Math.abs(new Date(curr.forecastTimeUtc) - currentDate);
                return currDiff < prevDiff ? curr : prev;
              }, weatherData.forecastTimestamps[0]);
              
            return currentForecast; // Return current weather data
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

export { getWeatherIcon, fetchWeather, fetchCities, fetchFiveDayForecast };
