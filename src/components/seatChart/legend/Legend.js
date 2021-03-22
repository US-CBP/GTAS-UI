// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React from "react";
import Xl8 from "../../xl8/Xl8";
import "./Legend.scss";

const Legend = props => {
  return (
    <div>
      <div className="seat-legend">
        <span className="legend-icon legend-reserved"></span>
        <Xl8 xid="resv001">Reserved Seats</Xl8>
      </div>
      <div className="seat-legend">
        <span className="legend-icon legend-co-traveler"></span>
        <Xl8 xid="resv006">Co-travelers</Xl8>
        {` (${props.cotravellersCount})`}
      </div>
      <div className="seat-legend">
        <span className="legend-icon legend-hit"></span>
        <Xl8 xid="resv002">Has Hit</Xl8>
      </div>
      <div className="seat-legend">
        <span className="legend-icon legend-unavailable"> </span>
        <Xl8 xid="resv003">Empty Seats</Xl8>
      </div>
      <div className="seat-legend">
        <span className="legend-icon selected-pax-seat"> </span>
        <Xl8 xid="resv004">Selected Passenger</Xl8>
      </div>
      <div className="seat-legend">
        <span className="legend-icon legend-search-result"> </span>
        <Xl8 xid="resv005">Search Result</Xl8>
      </div>
    </div>
  );
};

export default Legend;
