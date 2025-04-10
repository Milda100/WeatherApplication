import React from 'react';

const MostViewedCities = ({ mostViewedCities, onCityClick }) => {
  return (
    <div className="suggestions">
      <h1>Most Viewed Cities:</h1>
      <ul>
        {mostViewedCities.map((city) => (
          <div key={city.name}>
            <h2 onClick={() => onCityClick(city)}>
              {city.name}
            </h2>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default MostViewedCities;