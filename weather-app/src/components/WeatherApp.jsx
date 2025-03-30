import sunny from '../assets/images/sunny.jpg'
import cloudy from '../assets/images/cloudy.jpg'
import rainny from '../assets/images/rainny.jpg'
import snowy from '../assets/images/snowy.jpg'
import foggy from '../assets/images/foggy.jpg'



const WeatherApp = () => {
  return (
    <div className="container">
        <div className="weather-app">
            <div className="search">
                <div className="search-top">
                   <i className="fas fa-crosshairs"></i>
                   <div className="location">Vilnius</div> 
                </div>
                <div className="search-bar">
                    <input type="text" placeholder="Search location here"/>
                    <i className="fas fa-search"></i>
                </div>
            </div>
            <div className="weather-info">
                <img src={sunny} alt="sunny" className=""/>
                <div className="temperature">20°C</div>
                <div className="description">Sunny</div>
                <div className="humidity">Humidity: 60%</div>
                <div className="wind-speed">Wind Speed: 10 km/h</div>
            </div>
        </div>
    </div>
  )
}

export default WeatherApp