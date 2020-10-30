import React from "react";
import { localeMonthDayTime, hasData } from "../../utils/utils";
import { Row } from "react-bootstrap";
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
        <Row flex="true" no-wrap="true" className="flight-badge-row">
          <span className="width40">{departure[0]}</span>
          <span>{departure[1]}</span>
          <span>{departure[2]}</span>
        </Row>
        <Row flex="true" no-wrap="true" className="flight-badge-row">
          <span className="width40">{arrival[0]}</span>
          <span>{arrival[1]}</span>
          <span>{arrival[2]}</span>
        </Row>
      </div>
    </div>
  );
};

export default FlightBadge;
