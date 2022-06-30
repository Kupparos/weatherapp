import React, { useEffect, useState } from "react";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import { WiBarometer, WiStrongWind } from "react-icons/wi";
import moment from "moment";
import "../styles/current-style.css";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { Marker } from "react-leaflet";
import L from "leaflet";

export default function CurrentWeather({ location }) {
  const [data, setData] = useState(null);
  const [center, setCenter] = useState([]);
  const [map, setMap] = useState(null);

  let sunrise = data
    ? moment
        .unix(data.sys.sunrise)
        .utcOffset(data.timezone / 60)
        .format("h:mm a")
    : 0;
  let sunset = data
    ? moment
        .unix(data.sys.sunset)
        .utcOffset(data.timezone / 60)
        .format("h:mm a")
    : 0;

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?${location}&appid=${process.env.REACT_APP_API_KEY}`
      )
      .then((res) => {
        setData(res.data);
        setCenter([res.data.coord.lat, res.data.coord.lon]);
        map.setView([res.data.coord.lat, res.data.coord.lon]);
      })
      .catch((error) => console.log(error));
  }, [location, map]);

  return (
    <>
      {data === null ? (
        <LoadingOutlined />
      ) : (
        <div className="current_weather">
          <div className="city_info">
            Today in {data.name}, {data.sys.country}
          </div>
          <div className="weather_info">
            <img
              src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              alt={`${data.weather[0].description}`}
              style={{ width: "1.8em" }}
            />{" "}
            {Math.round(data.main.temp - 273.15)}&deg;C
          </div>
          <div className="weather_info_more">
            <p className="p0">
              Feels like {Math.round(data.main.feels_like - 273.15)}&deg;C,{" "}
              {data.weather[0].description}.
            </p>
            <p className="p1">
              <WiBarometer style={{ fontSize: "1.3em" }} />
              {data.main.pressure} hPa
            </p>
            <p className="p2">
              <WiStrongWind style={{ fontSize: "1.3em" }} />
              {data.wind.speed} m/s
            </p>
            <p className="p3">Humidity: {data.main.humidity}%</p>
            <p className="p4">Visibility: {data.visibility / 1000} km</p>
            <p className="p5">Sunrise: {sunrise}</p>
            <p className="p6">Sunset: {sunset}</p>
          </div>
            <MapContainer
              style={{ height: "25vh" }}
              center={center}
              zoom={8}
              ref={setMap}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker
                position={center}
                icon={L.icon({
                  iconUrl: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
                  iconSize: [64, 64],
                  iconAnchor: [32, 50],
                  popupAnchor: null,
                  shadowUrl: null,
                  shadowSize: null,
                  shadowAnchor: null,
                })}
              ></Marker>
            </MapContainer>
        </div>
      )}
    </>
  );
}
