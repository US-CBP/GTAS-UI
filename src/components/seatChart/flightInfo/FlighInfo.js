import { Link } from "@reach/router";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import LabelledInput from "../../labelledInput/LabelledInput";

const FlightInfo = props => {
  return (
    <Container>
      <Row>
        <Col sm={6}>
          <b>Flight Number:</b>
        </Col>
        <Col sm={6}>
          <LabelledInput
            alt="Flight Number"
            inputStyle="big-name-sidebar fa fa-plane"
            inputtype="label"
            inputval={props.flightNumber}
          />
        </Col>
      </Row>

      <Row>
        <Col sm={3}>
          <b>Arrival:</b>
        </Col>
        <Col sm={9}>
          <i></i>
          <LabelledInput
            alt="Arrival"
            inputStyle="big-name-sidebar fa fa-arrow-circle-down"
            inputtype="label"
            inputval={props.arrival}
          />
        </Col>
      </Row>
      <Row>
        <Col sm={4}>
          <b>Departure:</b>
        </Col>

        <Col sm={8}>
          <LabelledInput
            alt="Arrival"
            inputStyle="big-name-sidebar fa fa-arrow-circle-up"
            inputtype="label"
            inputval={props.departure}
          />
        </Col>
      </Row>
      <Link to={`/gtas/flightpax/${props.flightId}`}>Flightpax</Link>
    </Container>
  );
};

export default FlightInfo;
