import React from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import ChangePassword from "../changePassword/ChangePassword";

function ChangePasswordModal(props) {
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <ChangePassword userId={props.userId} callback={props.callback} />
      </Modal.Body>
    </Modal>
  );
}

ChangePasswordModal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  userId: PropTypes.string,
  callback: PropTypes.func
};

export default ChangePasswordModal;
