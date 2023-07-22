import React, { useEffect, useState } from "react";
import axios from "axios";



const Weather = ({ capital }) => {

  const [wheaterInfo, setWeatherInfo] = useState({});
  const [httpError, setHttpError] = useState('')
  
  
  const url = `https://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${capital}`;
  const weatherHook = () => {
    axios
      .get(url)
      .then((res) => {
        const {current} = res.data
        res.data.error === undefined ?setHttpError(''): setHttpError(`${res.data.error.info} Please read the README FILE of this project`);
        const weather = {
            temperature: current.temperature,
            wind_speed: current.wind_speed,
            wind_direction: current.wind_dir,
            weather_icon: current.weather_icons[0],
            weather_description : current.weather_descriptions[0]
        }
          setWeatherInfo(weather)
      })
      .catch((error) => '');
  };

  useEffect(weatherHook, [url]);

  return (
    <>
      <h2>Weather in {capital}</h2>
      <p>
        <b>temperature:</b> {wheaterInfo.temperature} Celcius
      </p>
      <img alt={wheaterInfo.weather_description} src={wheaterInfo.weather_icon}/>
      <p>
        <b>wind:</b> {wheaterInfo.wind_speed} mph direction {wheaterInfo.wind_direction}
      </p>
      <h3>{httpError}</h3>
    </>
  );
};

export default Weather;
