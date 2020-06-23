import React from "react";
import { Col, Row } from "react-bootstrap";
import "./FlightBadge.scss";

const FlightBadge = props => {
  return (
    <div className="flight-badge">
      <Row>
        <Col lg="4" md="4" sm="4" className="fa fa-plane flight-number">
          {props.flightnumber}
        </Col>
        <Col>
          <Row className="fa fa-arrow-circle-up flight-text">
            {props.origin} {props.etd}
          </Row>
          <Row className="fa fa-arrow-circle-down flight-text">
            {props.destination} {props.eta}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default FlightBadge;
