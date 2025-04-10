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

        //     const groupedForecast = parsedData.forecastTimestamps.reduce((acc, timestamp) => {
        //         const date = timestamp.forecastTimeUtc.split('T')[0];
        //         if (!acc[date]) {
        //             acc[date] = timestamp;
        //         }
        //         return acc;
        //     }, {});
        //     return Object.values(groupedForecast).slice(0, 6); // Return five-day forecast
        // } else {
        //     console.error('No forecast data found');
        //     return null;
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
};