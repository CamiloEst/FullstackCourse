import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Content from "./components/Content";

const App = () => {
  const [newSearch, setNewSearch] = useState("");
  const [countryList, setCountryList] = useState([]);

  const newSearchHandler = (event) => {
    setNewSearch(event.target.value);
  };

  const handleShowCountry = (country) => {
    setCountryList([country])
  };

  const getCountriesHook = () => {
    axios
      .get(
        `https://restcountries.com/v3.1/name/${newSearch}?fields=name,capital,population,languages,flag,flags`
      )
      .then((res) => {
        const countries = res.data.map((country) => ({
          ...country,
          name: country.name.common,
          flags: country.flags.svg,
        }));
        setCountryList(countries);
      }).catch((err) => setCountryList([]))
  };

  useEffect(getCountriesHook, [newSearch]);

  return (
    <>
      <Filter value={newSearch} onChange={newSearchHandler}/>
      <Content countries={countryList} handleShowCountry={handleShowCountry}/>
    </>
  );
};
export default App;
