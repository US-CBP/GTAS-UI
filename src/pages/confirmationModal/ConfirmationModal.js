import React from "react";
import { Modal, Button } from "react-bootstrap";
import "./ConfirmationModal.scss";

const ConfirmationModal = props => {
  const title = props.title || "Confirm";

  return (
    <Modal
      className="confirmation-modal"
      show={props.show}
      onHide={props.onHide}
      centered
    >
      <Modal.Header closeButton> {title}</Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
      <Modal.Footer>
        <Button variant="warning" onClick={props.onConfirm}>
          Confirm
        </Button>
        <Button variant="secondary" onClick={props.onCancel}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
