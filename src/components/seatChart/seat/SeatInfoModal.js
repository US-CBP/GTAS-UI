import React from "react";
import { Modal } from "react-bootstrap";
import { Link } from "@reach/router";
import "./Seat.scss";

const SeatInfoModal = props => {
  const info = props.seatInfo || {};
  return (
    <Modal show={props.show} onHide={props.onHide} centered className="seat-info-modal">
      <Modal.Header closeButton>
        <Modal.Title>Seat Number: {info.number}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
          <li>First Name: {info.firstName}</li>
          <li> Last Name: {info.lastName}</li>
          <li> Middle Name: {info.middleName}</li>
        </ul>
      </Modal.Body>

      <Modal.Footer>
        <Link to={`/gtas/paxDetail/${info.flightId}/${info.paxId}`}>
          Show passenger details
        </Link>
      </Modal.Footer>
    </Modal>
  );
};

export default SeatInfoModal;
