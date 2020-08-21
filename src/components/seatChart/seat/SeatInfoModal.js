import React from "react";
import { Modal } from "react-bootstrap";

const SeatInfoModal = props => {
  const info = props.seatInfo || {};
  return (
    <Modal show={props.show} onHide={props.onHide} centered>
      <Modal.Header>
        <Modal.Title>Seat Number: {info.number}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
          <li>First Name: {info.firstName}</li>
          <li> Last Name: {info.lastName}</li>
          <li> Middle Name: {info.middleName}</li>
        </ul>
      </Modal.Body>
    </Modal>
  );
};

export default SeatInfoModal;
