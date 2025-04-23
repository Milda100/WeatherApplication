import { useState, useEffect } from 'react';
import SearchableDropdown from './SearchableDropdown';
import MostViewedCities from './MostViewedCities';
import TodayWeatherInfo from './TodayWeatherInfo';
import FiveDayForcast from './FiveDayForcast';
import { fetchWeather, fetchCities, fetchFiveDayForecast } from './WeatherUtility'; // Importing utility functions

const WeatherApp = () => {
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCity, setSelectedCity] = useState({
        name: 'Vilnius',
        code: 'vilnius'
    });
    const [mostViewedCities, setMostViewedCities] = useState([]);
    const [weather, setWeather] = useState(null);
    const [fiveDayWeather, setFiveDayWeather] = useState(null); // State for five-day weather

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    });

    // Fetch cities on component mount
    useEffect(() => {
        const getCities = async () => {
            const cityData = await fetchCities(); // Use utility function
            setCities(cityData);
            setLoading(false);
        };

        getCities();

        // Load most viewed cities from localStorage
        const storedCities = JSON.parse(localStorage.getItem("mostViewedCities")) || [];
        setMostViewedCities(storedCities);
    }, []);

    // Fetch weather whenever the selected city changes
    useEffect(() => {
        const getWeather = async () => {
            if (selectedCity) {
                const forecast = await fetchWeather(selectedCity.code); // Use utility function
                setWeather(forecast);
            }
        };

        getWeather();
    }, [selectedCity]);

    useEffect(() => {
        const getFiveDayWeather = async () => {
          if (selectedCity) {
            try {
              const forecast = await fetchFiveDayForecast(selectedCity.code);
              console.log("Fetched Five-Day Forecast:", forecast);
              setFiveDayWeather(forecast);
            } catch (error) {
              console.error("Error fetching five-day forecast:", error);
            }
          }
        };
      
        getFiveDayWeather();
      }, [selectedCity]);
      
    // Handle city selection
    const handleCitySelect = (city) => {
        setSelectedCity(city);

        // Update most viewed cities
        const existingCity = mostViewedCities.find(c => c.name === city.name);
        const currentCount = existingCity ? existingCity.viewCount : 0;
        const cityViewCount = { ...city, viewCount: currentCount + 1 };

        const updatedMostViewed = [cityViewCount, ...mostViewedCities.filter(c => c.name !== city.name)];
        const sortedMostViewed = updatedMostViewed.sort((a, b) => b.viewCount - a.viewCount);
        const threeMostViewed = sortedMostViewed.slice(0, 3);

        setMostViewedCities(threeMostViewed);
        localStorage.setItem("mostViewedCities", JSON.stringify(threeMostViewed));
        console.log("Updated most viewed cities:", threeMostViewed);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
            <div className="weather-app">
                <div className="search">
                    <div className="search-top">
                        <i className="fa fa-crosshairs"></i>
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
                    <div>
                        <MostViewedCities 
                        mostViewedCities={mostViewedCities} 
                        onCityClick={handleCitySelect}
                        />
                    </div>
                </div>
                <div>
                    <TodayWeatherInfo weather={weather} />
                </div>
                <div className="weather-date">
                    <p>{formattedDate}</p>
                </div>
                <div>
                    <FiveDayForcast forecast={fiveDayWeather} />
                </div>
            </div>
    );
};

export default WeatherApp;