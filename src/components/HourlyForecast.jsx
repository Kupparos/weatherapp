import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import "../styles/hourly-style.css";
import { Chart} from "chart.js/auto";
import { Line, Radar } from "react-chartjs-2";
import getWind from "./Utils/getWind";

export default function HourlyForecast({ DiagramData }) {
  const lineChartData = {
    labels: DiagramData.list
      .map((item) => item.dt_txt.match(/\d\d:\d\d/))
      .slice(0, 9),
    datasets: [
      {
        data: DiagramData.list
          .map((item) => Math.round(item.main.temp - 273.15))
          .slice(0, 9),
        label: "Temperature, °C",
        borderColor: "#f25268",
        lineTension: 0.5,
        yAxisID: "y1",
      },
      {
        label: "Humidity, %",
        data: DiagramData.list.map((item) => item.main.humidity).slice(0, 9),
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        yAxisID: "y2",
      },
    ],
  };
  const RadarCharData = {
    labels: ["N", "N-E", "E", "E-S", "S", "S-W", "W", "N-W"],
    datasets: [
      {
        label: `m/s`,
        data: getWind(DiagramData),
        backgroundColor: "rgba(155, 212, 179, 0.2)",
        borderColor: "rgba(115, 217, 159, 1)",
        borderWidth: 1.5,
      },
    ],
  };
    
  return (
    <div className="diagrams">
      {DiagramData === null ? (
        <LoadingOutlined />
      ) : (
        <>
          <div className="line">
            <Line
              options={{
                scales: {
                  y1: {
                    type: "linear",
                    display: true,
                    position: "left",
                    ticks: {
                      stepSize: 5,
                      color: "rgba(242, 82, 104, 1)",
                    },
                  },
                  y2: {
                    type: "linear",
                    display: true,
                    position: "right",
                    ticks: {
                      color: "rgba(75,192,192,1)",
                    },
                    grid: {
                      drawOnChartArea: false,
                    },
                  },
                },
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    labels: {
                      usePointStyle: true,
                    },
                  },
                },
              }}
              data={lineChartData}
            />
          </div>
          <div className="radar">
            <Radar
              options={{
                plugins: {
                  legend: {
                    position: "right",
                    labels: {
                      usePointStyle: true,
                    },
                  },
                  title: {
                    display: true,
                    text: "Wind (meteorological)",
                  },
                },
                maintainAspectRatio: false,
              }}
              data={RadarCharData}
            />
          </div>
        </>
      )}
    </div>
  );
}
