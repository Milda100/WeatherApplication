import sunny from '../assets/images/sunny.jpg'
import cloudy from '../assets/images/cloudy.jpg'
import rainny from '../assets/images/rainny.jpg'
import snowy from '../assets/images/snowy.jpg'
import foggy from '../assets/images/foggy.jpg'
import { useState, useEffect } from 'react'
import SearchableDropdown from './SearchableDropdown'


const WeatherApp = () => {
    const [cities, setCities] = useState([])
    const [loading, setLoading] = useState(true);
    const [selectedCity, setSelectedCity] = useState(null);
    const [mostViewedCities, setMostViewedCities] = useState([]);
    

    useEffect(() => {
        const fetchCities = async () => {
          const url = `https://api.allorigins.win/get?url=https://api.meteo.lt/v1/places`;
          try {
            const response = await fetch(url);
            const data = await response.json();
            const parsedData = JSON.parse(data.contents);
            console.log(parsedData);
            setCities(parsedData);
            setLoading(false); // Set loading to false after data is fetched
          } catch (error) {
            console.error('Error fetching weather data:', error);
          }
        };
        fetchCities();

        const storedCities = JSON.parse(localStorage.getItem("mostViewedCities")) || [];
        setMostViewedCities(storedCities);
      }, []);

        const handleCitySelect = (city) => {
            setSelectedCity(city);
        
            const updatedMostViewed = [city, ...mostViewedCities.filter(c => c.name !== city.name)];
            if (updatedMostViewed.length > 3) {
            updatedMostViewed.pop(); // Keep only the 3 most recent
            }

            setMostViewedCities(updatedMostViewed);
            localStorage.setItem("mostViewedCities", JSON.stringify(updatedMostViewed));
  };



    if (loading) {
        // Render a loading indicator while waiting for the API data
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
                    <h3>Most Viewed Cities:</h3>
                    <ul>
                        {mostViewedCities.map((city, index) => (
                        <li key={index}>{city.name}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="weather-info">
                <img src={sunny} alt="sunny" className=""/>
                <div className="temperature">20°C</div>
                <div className="description">Sunny</div>
                <div className="humidity"><i className="fa fa-tint"></i>Humidity: 60%</div>
                <div className="wind-speed"><i className="fas fa-wind"></i>Wind Speed: 10 km/h</div>
            </div>
            <div className="weather-date">
                <p>Monday, 31 March</p>
            </div>
        </div>
    </div>
  )
}

export default WeatherApp