// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React from "react";
import PropsTypes from "prop-types";
import { Link } from "@reach/router";
import { hasData } from "../../../utils/utils";
import { Col, Container, Row } from "react-bootstrap";
import LabelledInput from "../../labelledInput/LabelledInput";
import Title from "../../title/Title";

const SeatInfo = props => {
  const selectedSeatInfo = props.info;

  return hasData(selectedSeatInfo) ? (
    <Container fluid>
      <Row>
        <Col>
          <b>First Name:</b>
        </Col>
        <Col>
          <LabelledInput
            alt="First Name"
            inputStyle="big-name-sidebar"
            inputType="label"
            inputVal={selectedSeatInfo.firstName}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <b>Last Name:</b>
        </Col>
        <Col>
          <LabelledInput
            alt="Last Name"
            inputStyle="big-name-sidebar"
            inputType="label"
            inputVal={selectedSeatInfo.lastName}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <b>Middle Name:</b>
        </Col>
        <Col>
          <LabelledInput
            alt="Middle Name"
            inputStyle="big-name-sidebar"
            inputType="label"
            inputVal={selectedSeatInfo.middleInitial}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <b>Seat Number:</b>
        </Col>
        <Col>
          <LabelledInput
            alt="Seat Number"
            inputStyle="big-name-sidebar"
            inputType="label"
            inputVal={selectedSeatInfo.number}
          />
        </Col>
      </Row>
      <Link to={`/gtas/paxDetail/${selectedSeatInfo.flightId}/${selectedSeatInfo.paxId}`}>
        Back to Passenger Details
      </Link>
    </Container>
  ) : (
    ""
  );
};
SeatInfo.propTypes = {
  info: PropsTypes.object
};

export default SeatInfo;
