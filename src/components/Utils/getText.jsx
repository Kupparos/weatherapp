import React from "react";
import moment from "moment";

export default function getText(data, today) {
  const currentDay = data.list.filter(
    (index) =>
      Number(
        moment
          .unix(index.dt)
          .utcOffset(data.city.timezone / 60)
          .format("D")
      ) === today
  );
  const descriptions = currentDay.reduce((prev, cur) => {
    if (prev[cur.weather[0].description]) {
      prev[cur.weather[0].description]++;
    } else {
      prev[cur.weather[0].description] = 1;
    }
    return prev;
  }, {});
  const description = Object.entries(descriptions).reduce(
    (acc, curr) => {
      return curr[1] > acc[1] ? curr : acc;
    },
    ["", 0]
  )[0];
  const wind = currentDay.find(
    (index) => index.weather[0].description === description
  ).wind.speed;

  function getWind() {
    if (wind <= 1) return "No wind";
    else if (wind <= 3.5 && wind > 1) return "Light breeze";
    else if (wind <= 5.5 && wind > 3.5) return "Gentle breeze";
    else if (wind <= 7.5 && wind > 5.5) return "Moderate breeze";
    else if (wind <= 10.5 && wind > 7.5) return "Fresh breeze";
    else if (wind <= 13.5 && wind > 10.5) return "Strong breeze";
    else if (wind <= 19.5 && wind > 13.5) return "Very strong breeze";
    else return "Storm";
  }
  function getTemp(time) {
    let t = currentDay.find((index) => index.dt_txt.match(/\d\d/g)[4] === time);
    let result = "";
    if (t)
      result = Math.round(
        currentDay.find((index) => index.dt_txt.match(/\d\d/g)[4] === time).main
          .temp - 273.15
      );
    else result = "-";
    return `${result} °C`;
  }
  function getFeelTemp(time) {
    let t = currentDay.find((index) => index.dt_txt.match(/\d\d/g)[4] === time);
    let result = "";
    if (t)
      result = Math.round(
        currentDay.find((index) => index.dt_txt.match(/\d\d/g)[4] === time).main
          .feels_like - 273.15
      );
    else result = "-";
    return `${result} °C`;
  }

  return (
    <>
      <div className="description">
        {getWind()}, {description}
      </div>
      <div style={{overflowX: 'auto'}}>
        <table className="table">
        <tbody>
          <tr>
            <td></td>
            <td>Morning</td>
            <td>Afternoon</td>
            <td>Evening</td>
            <td>Night</td>
          </tr>
          <tr>
            <td>Temperature</td>
            <td>{getTemp("09")}</td>
            <td>{getTemp("12")}</td>
            <td>{getTemp("18")}</td>
            <td>{getTemp("21")}</td>
          </tr>
          <tr>
            <td>Feels like</td>
            <td>{getFeelTemp('09')}</td>
            <td>{getFeelTemp('12')}</td>
            <td>{getFeelTemp('18')}</td>
            <td>{getFeelTemp('21')}</td>
          </tr>
        </tbody>
      </table>
      </div>
    </>
  );
}
