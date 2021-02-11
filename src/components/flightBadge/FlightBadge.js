// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React, {useContext, useState} from "react";
import {localeMonthDayTime, hasData, alt, asArray} from "../../utils/utils";
import {Row, Tooltip} from "react-bootstrap";
import "./FlightBadge.scss";
import {LookupContext} from "../../context/data/LookupContext";
import {LK} from "../../utils/constants";
import ToolTipWrapper from "../tooltipWrapper/TooltipWrapper";

const FlightBadge = props => {
  const res = props.data;
  const style = `flight-badge ${alt(props.className, "reg")}`;
  const { getCachedKeyValues } = useContext(LookupContext);
  const initToolTipState = "Loading...";
  const [toolTipVal, setToolTipVal] = useState(initToolTipState);

  const renderTooltip = (val, props) => (
      <Tooltip id="cardwithtbl-tooltip" {...props}>
        {toolTipVal}
      </Tooltip>
  );

  const getToolTipValue = (val, codeType) => {
    setToolTipVal(initToolTipState);
    getCachedKeyValues(codeType).then(types => {
      asArray(types).forEach(type => {
        if (type.value === val) {
          console.log("tooltip found! " + val);
          setToolTipVal(type.title);
        }
      })
    })
  };

  if (!hasData(props.data?.flightNumber)) return <></>;

  const data = {
    arrival: [res.flightDestination, ...localeMonthDayTime(res.eta).split(",")],
    departure: [res.flightOrigin, ...localeMonthDayTime(res.etd).split(",")],
    flightNumber: res.flightNumberHasLink
      ? res.flightNumber
      : `${alt(res.carrier)}${res.flightNumber}`
  };

  const arrival = data.arrival || [];
  const departure = data.departure || [];
  const flightNumber = data.flightNumber;

  return (
    <div className={style}>
      <div className="flight-number">{flightNumber}</div>
      <div className="flight-text">
        <Row flex="true" no-wrap="true" className="flight-badge-row">
          <span className="img-departure"></span>
            <span className="width40">
              <ToolTipWrapper data={{val:departure[0], lkup:LK.AIRPORT}}></ToolTipWrapper>
            </span>
          <span>{departure[1]}</span>
          <span>{departure[2]}</span>
        </Row>
        <Row flex="true" no-wrap="true" className="flight-badge-row">
          <span className="img-arrival"></span>
            <span className="width40">
              <ToolTipWrapper data={{val:arrival[0], lkup:LK.AIRPORT}}></ToolTipWrapper>
            </span>
          <span>{arrival[1]}</span>
          <span>{arrival[2]}</span>
        </Row>
      </div>
    </div>
  );
};

export default FlightBadge;
