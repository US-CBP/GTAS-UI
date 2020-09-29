import { Link } from "@reach/router";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import LabelledInput from "../../labelledInput/LabelledInput";

const FlightInfo = props => {
  return (
    <Container>
      <h5>Flight Information</h5>
      <Row>
        <Col lg={6}>
          <b>Flight Number:</b>
        </Col>
        <Col lg={6}>
          <LabelledInput
            alt="Flight Number"
            inputStyle="big-name-sidebar fa fa-plane"
            inputType="label"
            inputVal={props.flightNumber}
          />
        </Col>
      </Row>

      <Row>
        <Col lg={4}>
          <b>Arrival:</b>
        </Col>
        <Col lg={8}>
          <i></i>
          <LabelledInput
            alt="Arrival"
            inputStyle="big-name-sidebar fa fa-arrow-circle-down"
            inputType="label"
            inputVal={props.arrival}
          />
        </Col>
      </Row>
      <Row>
        <Col lg={4}>
          <b>Departure:</b>
        </Col>

        <Col lg={8}>
          <LabelledInput
            alt="Arrival"
            inputStyle="big-name-sidebar fa fa-arrow-circle-up"
            inputType="label"
            inputVal={props.departure}
          />
        </Col>
      </Row>
      <Link to={`/gtas/flightpax/${props.flightId}`}>Flightpax</Link>
    </Container>
  );
};

export default FlightInfo;
