import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import "./Seat.scss";
import { hasData } from "../../../utils/utils";
import SeatInfoModal from "./SeatInfoModal";

const Seat = props => {
  const reserved = hasData(props.seatInfo);
  const [showModal, setShowModal] = useState(false);
  const isCurrentPaxSeat = props.currentPaxSeat === props.seatNumber;
  const currentPaxSeatClass = isCurrentPaxSeat ? "pink" : "";

  return (
    <>
      <Button
        variant="light"
        size="sm"
        className={`seat ${currentPaxSeatClass}`}
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
  currentPaxSeat: PropTypes.string
};
export default Seat;
