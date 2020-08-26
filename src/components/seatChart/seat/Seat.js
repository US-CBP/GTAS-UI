import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import "./Seat.scss";
import { hasData } from "../../../utils/utils";
import SeatInfoModal from "./SeatInfoModal";

const Seat = props => {
  const reserved = hasData(props.seatInfo);
  const [showModal, setShowModal] = useState(false);
  const selectedSeatClass = props.selected ? "selected-seat" : "";
  const hasHitClass = props.seatInfo?.hasHits ? "has-hit" : "";

  return (
    <>
      <Button
        variant="light"
        size="sm"
        className={`seat ${selectedSeatClass} ${hasHitClass} ${props.className} `}
        disabled={!reserved}
        onClick={() => setShowModal(true)}
      >
        {props.seatNumber}
      </Button>
      <SeatInfoModal
        seatInfo={props.seatInfo}
        show={showModal}
        onHide={() => setShowModal(false)}
      />
    </>
  );
};
Seat.propTypes = {
  seatNumber: PropTypes.string,
  seatInfo: PropTypes.any,
  currentPaxSeat: PropTypes.string,
  selected: PropTypes.bool,
  className: PropTypes.string
};
export default Seat;
