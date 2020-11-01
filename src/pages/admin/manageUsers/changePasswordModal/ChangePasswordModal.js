import React from "react";
import PropTypes from "prop-types";
import ChangePassword from "../changePassword/ChangePassword";
import Modal, { ModalBody } from "../../../../components/modal/Modal";

function ChangePasswordModal(props) {
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="max-600-width-container"
    >
      <ModalBody>
        <ChangePassword userId={props.userId} callback={props.callback} />
      </ModalBody>
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
