import React from "react";
import Weather from "./Weather";

const CountryInfo = ({ country }) => {
  const languages = Object.values(country.languages);
  return (
    <>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h2>Languages</h2>
      <ul>
        {languages.map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img
        alt={country.flag}
        src={country.flags}
        width="150"
        height="125"
      ></img>
      <Weather capital={country.capital} />
    </>
  );
};

export default CountryInfo;
