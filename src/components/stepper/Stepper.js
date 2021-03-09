// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Row, Container } from "react-bootstrap";
import "./Stepper.scss";
import { LK } from "../../utils/constants";
import ToolTipWrapper from "../tooltipWrapper/TooltipWrapper";

const Stepper = props => {
  const raw = props.steps || [];

  const isActive = dt => {
    return new Date(dt) < Date.now();
  };
  const getTidyFlightLegData = () => {
    raw.sort((fl1, fl2) => {
      if (fl1.legNumber < fl2.legNumber) return -1;
      if (fl1.legNumber > fl2.legNumber) return 1;
      else return 0;
    });

    let completeLeg = [];
    raw.forEach(leg => {
      if (completeLeg.length === 0) {
        completeLeg.push({
          label: leg.originAirport,
          new: false,
          active: isActive(leg.etd)
        });
      } else if (completeLeg[completeLeg.length - 1].label !== leg.originAirport) {
        completeLeg.push({
          label: leg.originAirport,
          new: true,
          active: isActive(leg.etd)
        });
      }

      completeLeg.push({
        label: leg.destinationAirport,
        new: false,
        active: isActive(leg.eta)
      });
    });

    return completeLeg;
  };

  const [steps, setSteps] = useState();

  const getClassName = elem => {
    const active = elem.active ? "active" : "";
    const newsegment = elem.new ? "new-segment" : "";
    return `${active} ${newsegment}`;
  };

  useEffect(() => {
    setSteps(getTidyFlightLegData());
  }, []);

  return (
    <Row>
      {(steps || []).length > 0 && (
        <Container className="stepper-container" fluid>
          <ul className="stepper">
            {steps.map((step, index) => (
              <li
                className={getClassName(step)}
                style={{ width: 100 / steps.length + "%" }}
                key={index}
              >
                <ToolTipWrapper
                  data={{ val: step.label, lkup: LK.AIRPORT }}
                ></ToolTipWrapper>
              </li>
            ))}
          </ul>
        </Container>
      )}
    </Row>
  );
};
Stepper.propTypes = {
  steps: PropTypes.array
};
export default Stepper;
