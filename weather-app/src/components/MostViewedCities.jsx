import React from 'react';

const MostViewedCities = ({ mostViewedCities, onCityClick }) => {
  return (
    <div className="suggestions">
      <h3>Most Viewed Cities:</h3>
      <ul>
        {mostViewedCities.map((city) => (
          <div key={city.name}>
            <h3 onClick={() => onCityClick(city)}>
              {city.name}
            </h3>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default MostViewedCities;