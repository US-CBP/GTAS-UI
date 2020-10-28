import React from "react";
import { Link } from "@reach/router";
import "./Seat.scss";
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle
} from "../../modal/Modal";

const SeatInfoModal = props => {
  const info = props.seatInfo || {};
  return (
    <Modal show={props.show} onHide={props.onHide} centered className="seat-info-modal">
      <ModalHeader closeButton>
        <ModalTitle>Seat Number: {info.number}</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
          <li>First Name: {info.firstName}</li>
          <li> Last Name: {info.lastName}</li>
          <li> Middle Name: {info.middleName}</li>
        </ul>
      </ModalBody>

      <ModalFooter>
        <Link to={`/gtas/paxDetail/${info.flightId}/${info.paxId}`}>
          Show passenger details
        </Link>
      </ModalFooter>
    </Modal>
  );
};

export default SeatInfoModal;
