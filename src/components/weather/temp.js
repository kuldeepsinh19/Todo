import React, { useState, useEffect } from "react";
import Weathercard from "./weathercard";
import "./weatherstyle.css"

const Temp = () => {
  const [searchValue, setSearchValue] = useState("pune");
  const [tempInfo, setTempInfo] = useState({});

  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=a8868ae332fa61d98fe616ca2ff9eb2a`;

      let res = await fetch(url);
      let data = await res.json();

    const {temp , humidity , pressure} = data.main;
    const { main: weathermood} = data.weather[0]
    const {name} = data
    const {speed}  = data.wind
    const {country , sunset} = data.sys

    const myWeatherInfo  = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset
    }
    setTempInfo(myWeatherInfo)
    }
    catch(error) {
        console.log(error)
    
    
    }

  }

  useEffect(() => {
    getWeatherInfo();
  }, []);

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}>
            Search
          </button>
        </div>
      </div>

      {/* our temp card  */}
      <Weathercard {...tempInfo} />
    </>
  );
};

export default Temp;