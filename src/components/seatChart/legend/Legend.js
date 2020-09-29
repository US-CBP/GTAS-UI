import React from "react";
import "./Legend.scss";

const Legend = props => {
  return (
    <div>
      <div className="seat-legend">
        <span className="legend-icon legend-reserved"></span>Resereved Seats
      </div>
      <div className="seat-legend">
        <span className="legend-icon legend-co-traveler"></span>
        {`Co-Traveler (${props.cotravellersCount})`}
      </div>
      <div className="seat-legend">
        <span className="legend-icon legend-hit"></span> Has Hit
      </div>
      <div className="seat-legend">
        <span className="legend-icon legend-unavailable"> </span>Empty Seats
      </div>
      <div className="seat-legend">
        <span className="legend-icon selected-pax-seat"> </span>Selected Passenger
      </div>
    </div>
  );
};

export default Legend;
