// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React from "react";
import { Row } from "react-bootstrap";
import { Link } from "@reach/router";
import ToolTipWrapper from "../tooltipWrapper/TooltipWrapper";
import LazyImage from "../../components/lazyImage/LazyImage";
import { LK } from "../../utils/constants";
import { localeMonthDayTime, hasData, alt } from "../../utils/utils";
import "./FlightBadge.scss";

const FlightBadge = props => {
  const res = props.data;
  const style = `flight-badge ${alt(props.className, "reg")}`;

  if (!hasData(props.data?.flightNumber) && !hasData(props.data?.flightDestination))
    return <></>;

  const data = {
    arrival: [res.flightDestination, ...localeMonthDayTime(res.eta).split(",")],
    departure: [res.flightOrigin, ...localeMonthDayTime(res.etd).split(",")],
    flightNumber: res.flightNumberHasLink ? (
      <>
        <span className="flight-badge-nonlink-icon nozoom">
          <LazyImage val={res.carrier} type={LK.CARRIER} nozoom></LazyImage>
        </span>
        <ToolTipWrapper
          data={{ val: res.carrier, lkup: LK.CARRIER }}
          className="overlay-content-light"
        >
          <Link to={"/gtas/flightpax/" + res.flightId} className="link">
            {res.flightNumber}
          </Link>
        </ToolTipWrapper>
      </>
    ) : hasData(res.flightNumber || res.fullFlightNumber) ? (
      <span className="flight-badge-nonlink-icon nozoom">
        <LazyImage val={res.carrier} type={LK.CARRIER} nozoom></LazyImage>
        <ToolTipWrapper
          data={{ val: res.carrier, lkup: LK.CARRIER }}
          className="overlay-content-light"
        >
          {res.flightNumber}
        </ToolTipWrapper>
      </span>
    ) : (
      <></>
    )
  };

  const arrival = data.arrival || [];
  const departure = data.departure || [];
  const flightNumber = data.flightNumber;

  return (
    <div className={style}>
      {flightNumber && <div className="flight-number">{flightNumber}</div>}
      <div className="flight-text">
        <Row flex="true" no-wrap="true" className="flight-badge-row">
          <span className="img-departure"></span>
          <span className="width40">
            <ToolTipWrapper
              className="overlay-content-light"
              data={{ val: departure[0], lkup: LK.AIRPORT }}
            ></ToolTipWrapper>
          </span>
          <span className="margin-right-sm">{departure[1]}</span>
          <span>{departure[2]}</span>
        </Row>
        <Row flex="true" no-wrap="true" className="flight-badge-row">
          <span className="img-arrival"></span>
          <span className="width40">
            <ToolTipWrapper
              className="overlay-content-light"
              data={{ val: arrival[0], lkup: LK.AIRPORT }}
            ></ToolTipWrapper>
          </span>
          <span className="margin-right-sm">{arrival[1]}</span>
          <span>{arrival[2]}</span>
        </Row>
      </div>
    </div>
  );
};

export default FlightBadge;
