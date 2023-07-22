import React from "react";

const CountryList = ({ countries, handleShowCountry }) => {
  return (
    <ul>
      {countries.map((country) => (
        <li key={country.name}>
          {country.name}
          <button onClick={() => handleShowCountry(country)}>show</button>
        </li>
      ))}
    </ul>
  );
};

export default CountryList;
