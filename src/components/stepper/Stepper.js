import React from "react";
import "./Stepper.scss";
import PropTypes from "prop-types";
import { Row, Container } from "react-bootstrap";
import { asArray } from "../../utils/utils";
const Stepper = props => {
  const segmentWidth = 100 / props.steps?.length;

  return (
    <Row>
      <Container className="stepper-container" fluid>
        <ul className="stepper">
          {asArray(props.steps).map(step => (
            <li
              className={step.active ? "active" : ""}
              style={{ width: segmentWidth + "%" }}
              key={step.label}
            >
              {step.label}
            </li>
          ))}
        </ul>
      </Container>
    </Row>
  );
};
Stepper.propTypes = {
  steps: PropTypes.array
};
export default Stepper;
