import React from "react";
import { localeDate, localeMonthDayTime, hasData } from "../../utils/utils";
import "./FlightBadge.scss";

const FlightBadge = props => {
  const res = props.data;

  if (!hasData(props.data?.flightNumber)) return <></>;

  const data = {
    arrival: [res.flightDestination, ...localeMonthDayTime(res.eta).split(",")],
    departure: [res.flightOrigin, ...localeMonthDayTime(res.etd).split(",")],
    flightNumber: `${res.carrier}${res.flightNumber}`
  };

  const arrival = data.arrival || [];
  const departure = data.departure || [];
  const flightNumber = data.flightNumber;

  return (
    <div className="flight-badge">
      <div className="flight-number">{flightNumber}</div>
      <div className="flight-text">
        <table>
          <tr>
            <td>{departure[0]}</td>
            <td>{departure[1]}</td>
            <td>{departure[2]}</td>
          </tr>
          <tr>
            <td>{arrival[0]}</td>
            <td>{arrival[1]}</td>
            <td>{arrival[2]}</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default FlightBadge;
