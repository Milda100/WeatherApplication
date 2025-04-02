import sunny from '../assets/images/sunny.jpg'
import cloudy from '../assets/images/cloudy.jpg'
import rainy from '../assets/images/rainy.jpg'
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
                    {mostViewedCities.map((city) => (
        <div key={city.name}>
          <h3>{city.name}</h3>
          <p>View Count: {city.viewCount}</p>
        </div>
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