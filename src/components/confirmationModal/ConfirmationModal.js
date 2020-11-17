import React from "react";
import { Button } from "react-bootstrap";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "../modal/Modal";
import Xl8 from "../xl8/Xl8";

const ConfirmationModal = props => {
  return (
    <Modal
      className="confirmation-modal"
      show={props.show}
      onHide={() => props.callback(false)}
      centered
    >
      <ModalHeader variant="primary">{props.header}</ModalHeader>
      <ModalBody>{props.message}</ModalBody>
      <ModalFooter>
        <Button
          onClick={() => props.callback(false)}
          className="m-2 outline-dark-outline"
          variant="outline-dark"
        >
          <Xl8 xid="form001">Cancel</Xl8>
        </Button>
        <Button
          onClick={() => props.callback(true)}
          className="m-2 button block info fullwidth"
        >
          <Xl8 xid="form003">Confirm</Xl8>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ConfirmationModal;
