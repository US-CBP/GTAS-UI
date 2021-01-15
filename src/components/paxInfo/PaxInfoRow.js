// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import "./PaxInfo.scss";

const PaxInfoRow = props => {
  return (
    <Row>
      <Form.Label column sm="5" size="sm" className="left-label">
        {props.leftlabel}
      </Form.Label>
      <Col>
        <Form.Control
          plaintext
          readOnly
          defaultValue={props.rightlabel}
          className="right-label"
        />
      </Col>
    </Row>
  );
};

export default PaxInfoRow;
