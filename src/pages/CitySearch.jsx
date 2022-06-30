import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/citySearch-style.css";
import { Input } from "antd";
import { IoLocationOutline } from "react-icons/io5";
import CurrentWeather from "../components/CurrentWeather";
import DailyForecast from "../components/DailyForecast";
import HourlyForecast from "../components/HourlyForecast";

export default function CitySearch() {
  const [city, setCity] = useState("London");
  const [location, setLocation] = useState(["lat=51.5085&lon=-0.1257"]);
  const [page, setPage] = useState("current");
  const [data, setData] = useState(null);
  const [active, setActive] = useState('current')
  const { Search } = Input;

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?${location}&appid=${process.env.REACT_APP_API_KEY}`
      )
      .then((res) => {
        setCity(res.data.city.name);
        setData(res.data);
      })
      .catch((error) => console.log(error));
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onSearch = (value) => {
    setCity(value);
    setLocation(`q=${value}`);
  };

  const myIP = (location) => {
    const { latitude, longitude } = location.coords;
    setLocation(`lat=${latitude.toString()}&lon=${longitude.toString()}`);
  };

  const onSetPage = (value) => {
    setPage(value);
    setActive(value)
  };

  return (
    <div className="wrap">
      <div className="search">
        <div className="input">
          <h1>The Only Weather Forecast You Need</h1>
          <hr
            style={{
              backgroundColor: "white",
              width: "9vw",
              marginBottom: "13px",
            }}
          />
          <form noValidate className="form" onSubmit={handleSubmit}>
            <Search
              placeholder="Enter location"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onSearch={onSearch}
              style={{ width: "50%"}}
            />
            <IoLocationOutline
              style={{ color: "white", fontSize: "1.8em", cursor: "pointer" }}
              onClick={() => {
                navigator.geolocation.getCurrentPosition(myIP);
              }}
            ></IoLocationOutline>
          </form>
        </div>
      </div>
      <div className="info">
        <nav className="navigation">
          <button className={active === 'current' ? 'active' : 'nav_button'} onClick={() => onSetPage("current")}>
            Current weather
          </button>
          <button className={active === 'daily' ? 'active' : 'nav_button'} onClick={() => onSetPage("daily")}>
            Daily forecast
          </button>
          <button className={active === 'hourly' ? 'active' : 'nav_button'} onClick={() => onSetPage("hourly")}>
            Hourly forecast
          </button>
        </nav>
        <div className="box_info">
          {page === "current" && <CurrentWeather location={location} />}
          {page === "daily" && <DailyForecast data={data} />}
          {page === "hourly" && <HourlyForecast DiagramData={data} />}
        </div>
      </div>
    </div>
  );
}
