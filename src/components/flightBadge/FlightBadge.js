import React from "react";
import "./FlightBadge.scss";
import LabelledInput from "../labelledInput/LabelledInput";
// import { fas, faPlaneArrival } from "@fortawesome/free-solid-svg-icons";

const FlightBadge = props => {
  console.log(props);

  const arrival = props.arrival || [];
  const departure = props.departure || [];
  const flightNumber = props.flightNumber;
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
