import React from "react";
import PropsTypes from "prop-types";
import { Link } from "@reach/router";
import { hasData } from "../../../utils/utils";

const SeatInfo = props => {
  const selectedSeatInfo = props.info;

  return hasData(selectedSeatInfo) ? (
    <>
      <h5>Selected passenger seat's data</h5>
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        <li>
          <b>First Name:</b> {selectedSeatInfo.firstName}
        </li>
        <li>
          <b>Last Name:</b> {selectedSeatInfo.lastName}
        </li>
        <li>
          <b>Middle Name:</b> {selectedSeatInfo.middleInitial}
        </li>
        <li>
          <b>Seat Number:</b> {selectedSeatInfo.number}
        </li>
      </ul>
      <Link to={`/gtas/paxDetail/${selectedSeatInfo.flightId}/${selectedSeatInfo.paxId}`}>
        Show passenger details
      </Link>
    </>
  ) : (
    ""
  );
};
SeatInfo.propTypes = {
  info: PropsTypes.object
};

export default SeatInfo;
