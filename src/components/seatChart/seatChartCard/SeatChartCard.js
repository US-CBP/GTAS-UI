// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import LabelledInput from "../../labelledInput/LabelledInput";

const SeatChartCard = props => {
  return (
    <Container className="m-1">
      {props.data &&
        props.data?.map((item, index) => (
          <Row key={index}>
            <Col>
              <b>{item.label}:</b>
            </Col>
            <Col>
              <LabelledInput
                alt="Flight Number"
                inputtype="label"
                inputval={item.value}
              />
            </Col>
          </Row>
        ))}

      <div>{props.link}</div>
    </Container>
  );
};

export default SeatChartCard;
