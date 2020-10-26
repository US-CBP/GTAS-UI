import React from "react";
import { localeDate, alt, hasData } from "../../utils/utils";
import "./FlightBadge.scss";

const FlightBadge = props => {
  const res = props.data;
  console.log(props);

  if (!hasData(props.data)) return <></>;

  const data = {
    arrival: [res.flightDestination, ...localeDate(res.eta).split(",")],
    departure: [res.flightOrigin, ...localeDate(res.etd).split(",")],
    flightNumber: `${res.carrier}${res.flightNumber}`
  };

  const arrival = data.arrival || [];
  const departure = data.departure || [];
  const flightNumber = data.flightNumber;

  console.log(arrival, departure, flightNumber);
  return (
    <div className="flight-badge">
      <div className="flight-number">{flightNumber}</div>
      <div className="flight-text">
        <table>
          <tr>
            <td>{alt(departure[0])}</td>
            <td>{alt(departure[1])}</td>
            <td>{alt(departure[2])}</td>
          </tr>
          <tr>
            <td>{alt(arrival[0])}</td>
            <td>{alt(arrival[1])}</td>
            <td>{alt(arrival[2])}</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default FlightBadge;
