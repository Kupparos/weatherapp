import React from "react";
import { Collapse } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import moment from "moment";
import { getExtra, getHeader } from "./Utils/getDescription";
import getText from "./Utils/getText";
import "../styles/daily-style.css";

export default function DailyForecast({ data }) {
  const { Panel } = Collapse;
  const today = moment
    .unix(data.list[0].dt)
    .utcOffset(data.city.timezone / 60)
    .format("YYYY-MM-D");

  return (
    <>
      {!data ? (
        <LoadingOutlined />
      ) : (
        <>
          <Collapse defaultActiveKey={["1"]} accordion>
            <Panel
              header={getHeader(data, Number(moment(today).format("D")))}
              key="1"
              extra={getExtra(data, Number(moment(today).format("D")))}
            >
              <div className="text">{getText(data, Number(moment(today).format("D")))}</div>
            </Panel>
            <Panel
              header={getHeader(
                data,
                Number(moment(today).add(1, "day").format("D"))
              )}
              key="2"
              extra={getExtra(
                data,
                Number(moment(today).add(1, "day").format("D"))
              )}
            >
              <div className="text">
                {getText(data, Number(moment(today).add(1, "day").format("D")))}
              </div>
            </Panel>
            <Panel
              header={getHeader(
                data,
                Number(moment(today).add(2, "day").format("D"))
              )}
              key="3"
              extra={getExtra(
                data,
                Number(moment(today).add(2, "day").format("D"))
              )}
            >
              <div className="text">
                {getText(data, Number(moment(today).add(2, "day").format("D")))}
              </div>
            </Panel>
            <Panel
              header={getHeader(
                data,
                Number(moment(today).add(3, "day").format("D"))
              )}
              key="4"
              extra={getExtra(
                data,
                Number(moment(today).add(3, "day").format("D"))
              )}
            >
              <div className="text">
                {getText(data, Number(moment(today).add(3, "day").format("D")))}
              </div>
            </Panel>
            <Panel
              header={getHeader(
                data,
                Number(moment(today).add(4, "day").format("D"))
              )}
              key="5"
              extra={getExtra(
                data,
                Number(moment(today).add(4, "day").format("D"))
              )}
            >
              <div className="text">
                {getText(data, Number(moment(today).add(4, "day").format("D")))}
              </div>
            </Panel>
          </Collapse>
        </>
      )}
    </>
  );
}
