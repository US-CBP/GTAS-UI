import React from "react";
import PropTypes from "prop-types";
import { localeDate } from "../../../utils/utils";
import "./FlightInfo.scss";
import Overlay from "../../../components/overlay/Overlay";

const FlightInfo = props => {
  const originInfo = `${props.origin} ${localeDate(props.etd)}`;
  const destinationInfo = `${props.destination} ${localeDate(props.eta)}`;
  const flightDirection =
    props.direction === "I" ? "fa fa-plane fa-rotate-90 fa-fw" : "fa fa-plane fa-fw";

  const getPopover = (
    <>
      <i className="fa fa-arrow-circle-up">{originInfo}</i>
      <i className="fa fa-arrow-circle-down">{destinationInfo}</i>
    </>
  );

  return (
    <Overlay trigger={["click", "hover"]} content={getPopover}>
      <div className="as-link text-center">
        <i className={flightDirection}></i>
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
