import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

import "./App.css";

function App() {
  const [weather, setWeather] = useState({});
  const [city, setCity] = useState("mumbai");
  const [photos, setPhotos] = useState([]);
  const [icon, setIcon] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    handleClick();
  }, []);

  function handleClick() {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID={API_KEY}&units=metric`
    )
      .then((res) => {
        if (res.ok) {
          console.log(res.status);
          return res.json();
        } else {
          if (res.status === 404) {
            return alert("Oops, there seems to be an error!(wrong location)");
          }
          alert("Oops, there seems to be an error!");
          throw new Error("You have an error");
        }
      })
      .then((object) => {
        var iconText = object.weather[0].icon;
        setIcon(`http://openweathermap.org/img/wn/${iconText}@2x.png`);
        setDescription(object.weather[0].description);
        setWeather(object);
        console.log(weather);
      })
      .catch((error) => console.log(error));
    fetch(
      `https://api.unsplash.com/search/photos?query=${city}&client_id={unspashAPI_KEY}`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("You made a mistake");
        }
      })
      .then((data) => {
        console.log(data);
        setPhotos(data?.results[0]?.urls?.regular);
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="App">
      <div className="wrapper">
        <div className="search-box">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter location"
            className="search-area"
          />
          <button className="search-button" onClick={handleClick}>
            <FaSearch />
          </button>
        </div>
      </div>
      <div className="main-card">
        <div className="card-image">
          <img src={photos} alt="" />
        </div>
        <div className="card-info">
          <div className="heading">
            <div className="heading-icon">
              <img className="icon" src={icon} alt=""></img>
            </div>
            <div className="heading-text">{weather?.name}</div>
          </div>
          <div className="main-text">
            <div>Current temperature</div>
            <div className="values">{weather?.main?.temp}</div>
          </div>
          <div className="main-text">
            <div>Feels like..</div>
            <div className="values">{weather?.main?.feels_like}</div>
          </div>
          <div className="main-text">
            <div>Forecast</div>
            <div className="values">{description}</div>
          </div>
          <div className="main-text">
            <div>Min temperature </div>
            <div className="values">{weather?.main?.temp_min}</div>
          </div>
          <div className="main-text">
            <div>Max temperature</div>
            <div className="values">{weather?.main?.temp_max}</div>
          </div>
          <div className="main-text">
            <div>Humidity</div>
            <div className="values">{weather?.main?.humidity}</div>
          </div>
          <div className="main-text">
            <div>Pressure</div>
            <div className="values">{weather?.main?.pressure}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
