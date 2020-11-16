import React from "react";
import PropTypes from "prop-types";
import { localeDate } from "../../../utils/utils";
import "./FlightInfo.scss";
import Overlay from "../../../components/overlay/Overlay";

const FlightInfo = props => {
  const originInfo = `${props.origin} ${localeDate(props.etd)}`;
  const destinationInfo = `${props.destination} ${localeDate(props.eta)}`;
  const flightDirection = props.direction === "I" ? "img-arrival sm" : "img-departure sm";

  const getPopover = (
    <>
      <div>
        <span className="img-departure sm" />
        {originInfo}
      </div>
      <div>
        <span className="img-arrival sm" />
        {destinationInfo}
      </div>
    </>
  );

  return (
    <Overlay trigger={["click", "hover"]} content={getPopover}>
      <div className="text-center">
        <span className={flightDirection}></span>
        {props.flightNumber}
      </div>
    </Overlay>
  );
};

FlightInfo.propTypes = {
  flightNumber: PropTypes.string,
  eta: PropTypes.number,
  etd: PropTypes.number,
  origin: PropTypes.string,
  destination: PropTypes.string,
  direction: PropTypes.string
};

export default FlightInfo;
