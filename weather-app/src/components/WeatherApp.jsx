import sunny from '../assets/images/sunny.jpg'
import cloudy from '../assets/images/cloudy.jpg'
import rainy from '../assets/images/rainy.jpg'
import snowy from '../assets/images/snowy.jpg'
import foggy from '../assets/images/foggy.jpg'
import sky from '../assets/images/sky.jpg'
import { useState, useEffect } from 'react'
import SearchableDropdown from './SearchableDropdown'
import MostViewedCities from './MostViewedCities';

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


const WeatherApp = () => {
    const [cities, setCities] = useState([])
    const [loading, setLoading] = useState(true);
    const [selectedCity, setSelectedCity] = useState({ 
      name: 'Vilnius', 
      code: 'vilnius' 
  });
    const [mostViewedCities, setMostViewedCities] = useState([]);
    const [weather, setWeather] = useState(null);

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    });
    


    const fetchWeather = async (cityCode) => {
      const url = `https://api.allorigins.win/get?url=https://api.meteo.lt/v1/places/${cityCode}/forecasts/long-term`;
      try {
          const response = await fetch(url);
          const data = await response.json();
          const parsedData = JSON.parse(data.contents);
          console.log('Fetched weather data:', parsedData);
          
          // Validate the presence of forecastTimestamps
        if (parsedData && parsedData.forecastTimestamps && parsedData.forecastTimestamps.length > 0) {
          setWeather(parsedData.forecastTimestamps[0]); // Update state with the first forecast
          } else {
              console.error('No forecast data found');
          }
      } catch (error) {
                console.error('Error fetching weather data:', error);
        }
    };

    

    useEffect(() => {
        const fetchCities = async () => {
          const url = `https://api.allorigins.win/get?url=https://api.meteo.lt/v1/places`;
          try {
            const response = await fetch(url);
            const data = await response.json();
            const parsedData = JSON.parse(data.contents);
            console.log(parsedData);
            setCities(parsedData);
            setLoading(false);
          } catch (error) {
            console.error('Error fetching weather data:', error);
          }
        };
        fetchCities();

        const storedCities = JSON.parse(localStorage.getItem("mostViewedCities")) || [];
        setMostViewedCities(storedCities);
      }, []);

      useEffect(() => {
        if (selectedCity) {
            fetchWeather(selectedCity.code);
        }
    }, [selectedCity]); // This ensures the weather is fetched whenever the selected city changes
    

        const handleCitySelect = (city) => {
          setSelectedCity(city);

          // Check if the selected city already exists in the state
          const existingCity = mostViewedCities.find(c => c.name === city.name);
          const currentCount = existingCity ? existingCity.viewCount : 0;

           // Increment the view count for the selected city
          const cityViewCount = { ...city, viewCount: currentCount + 1 };
        
        
          const updatedMostViewed = [cityViewCount, ...mostViewedCities.filter(c => c.name !== city.name)];

             // Sort the cities by view count in descending order
          const sortedMostViewed = updatedMostViewed.sort((a, b) => b.viewCount - a.viewCount);

            // Keep only the top 3 mostly viewed cities
          const threeMostViewed = sortedMostViewed.slice(0, 3);


          setMostViewedCities(threeMostViewed);
          localStorage.setItem("mostViewedCities", JSON.stringify(threeMostViewed));
          console.log("Updated most viewed cities:", threeMostViewed);

  };



    if (loading) {
        return <div>Loading...</div>;
      }    

  return (
    <div className="container"> 
        <div className="weather-app">
            <div className="search">
                <div className="search-top">
                   <i className="fas fa-crosshairs"></i>
                   <div className="location">{selectedCity ? selectedCity.name : "Select a city"}</div> 
                </div>
                <div>
                <SearchableDropdown
                    options={cities}
                    onCitySelect={setSelectedCity}
                    label="name"
                    id="id"
                    selectedVal={selectedCity ? selectedCity.name : ""}
                    handleChange={(val) => {
                        const city = cities.find((city) => city.name === val);
                        handleCitySelect(city);
                    }}
                />
                </div>
                <div className="suggestions">
                  <MostViewedCities mostViewedCities={mostViewedCities} />
                </div>
            </div>
            <div className="weather-info">
                {weather ? (
                    <>
                    <img
                      src={getWeatherIcon(weather.conditionCode)}
                      alt={weather.conditionCode}
                      className="weather-img"
                    />
                        <div className="temperature">{Math.round(weather.airTemperature)}°C</div>
                        <div className="description">
                            {weather.conditionCode.replace('-', ' ').toUpperCase()}
                        </div>
                        <div className="humidity">
                            <i className="fa fa-tint"></i> Humidity: {weather.relativeHumidity}%
                        </div>
                        <div className="wind-speed">
                            <i className="fas fa-wind"></i> Wind Speed: {weather.windSpeed} km/h
                        </div>
                    </>
                ) : (
                    <div>No weather data available. Please select a city.</div>
                )}
            </div>
            <div className="weather-date">
                <p>{formattedDate}</p>
            </div>
        </div>
    </div>
  )
}

export default WeatherApp