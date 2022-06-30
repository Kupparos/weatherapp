import moment from "moment";
import React from "react";

export function getHeader(data, today) {
  const day = data.list.find(
    (index) => Number(index.dt_txt.match(/\d\d/g)[3]) === today
  );

  return `${moment
    .unix(day.dt)
    .utcOffset(data.city.timezone / 60)
    .format("dddd, MMMM Do")}`;
}

export function getExtra(data, today) {
  const currentDay = data.list.filter(
    (index) =>
      Number(
        moment
          .unix(index.dt)
          .utcOffset(data.city.timezone / 60)
          .format("D")
      ) === today
  );
  const icons = currentDay.reduce((prev, cur) => {
    if (prev[cur.weather[0].icon]) {
      prev[cur.weather[0].icon]++;
    } else {
      prev[cur.weather[0].icon] = 1;
    }
    return prev;
  }, {});
  const icon = Object.entries(icons).reduce(
    (acc, curr) => {
      return curr[1] > acc[1] ? curr : acc;
    },
    ["", 0]
  )[0];
  const maxtemp = Math.max(...currentDay.map((index) => index.main.temp_max));
  const mintemp = Math.min(...currentDay.map((index) => index.main.temp_min));

  return (
    <>
      <div>
        {Math.round(maxtemp - 273.15)}/{Math.round(mintemp - 273.15)}&deg;C
      </div>
      <img
        src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={`${currentDay[0].weather[0].description}`}
        style={{ width: "3em" }}
      />
    </>
  );
}
