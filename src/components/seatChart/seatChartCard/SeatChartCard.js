import { Link } from "@reach/router";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import LabelledInput from "../../labelledInput/LabelledInput";

const SeatChartCard = props => {
  return (
    <Container>
      {props.data &&
        props.data?.map(item => (
          <Row>
            <Col>
              <b>{item.label}:</b>
            </Col>
            <Col>
              <LabelledInput
                alt="Flight Number"
                // inputStyle="big-name-sidebar"
                inputType="label"
                inputVal={item.value}
              />
            </Col>
          </Row>
        ))}

      <Row>{props.link}</Row>
    </Container>
  );
};

export default SeatChartCard;
