import sunny from '../assets/images/sunny.jpg'
import cloudy from '../assets/images/cloudy.jpg'
import rainny from '../assets/images/rainny.jpg'
import snowy from '../assets/images/snowy.jpg'
import foggy from '../assets/images/foggy.jpg'
import { useState, useEffect } from 'react'
import SearchableDropdown from './SearchableDropdown'


const WeatherApp = () => {
    const [cities, setCities] = useState("Select option...");
    const [loading, setLoading] = useState(true);


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
      }, []);
    

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
                   <div className="location">Vilnius</div> 
                </div>
                {/* <div className="search-bar"> */}
                <SearchableDropdown
                    options={cities}
                    label="name"
                    id="id"
                    selectedVal={""}
                    handleChange={(val) => {}}
      />
            </div>
            <div className="weather-info">
                <img src={sunny} height="200" alt="sunny" className=""/>
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