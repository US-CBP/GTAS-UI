// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React from "react";
import { Link } from "@reach/router";
import "./Seat.scss";
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle
} from "../../modal/Modal";
import { Col } from "react-bootstrap";

const SeatInfoModal = props => {
  const info = props.seatInfo || {};
  return (
    <Modal show={props.show} onHide={props.onHide} centered className="seat-info-modal">
      <ModalHeader closeButton>
        <ModalTitle>Seat Number: {info.number}</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
          <li>Last Name: {info.lastName}</li>
          <li>First Name: {info.firstName}</li>
          <li>Middle Name: {info.middleName}</li>
        </ul>
      </ModalBody>

      <ModalFooter>
        <Col>
          <Link to={`/gtas/paxDetail/${info.flightId}/${info.paxId}`}>
            Show passenger details
          </Link>
        </Col>
      </ModalFooter>
    </Modal>
  );
};

export default SeatInfoModal;
