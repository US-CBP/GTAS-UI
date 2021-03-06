// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React from "react";
import { Modal as RBModal } from "react-bootstrap";
import "./Modal.css";

const Modal = props => {
  const size = props.size || "md";

  return (
    <div>
      <RBModal
        {...props}
        size={size}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {props.children}
      </RBModal>
    </div>
  );
};
export const ModalTitle = props => {
  return <RBModal.Title className={props.className}>{props.children}</RBModal.Title>;
};

export const ModalHeader = props => {
  return (
    <RBModal.Header closeButton={props.closeButton} className={props.className}>
      {props.children}
    </RBModal.Header>
  );
};

export const ModalBody = props => {
  return <RBModal.Body className={props.className}>{props.children}</RBModal.Body>;
};
export const ModalFooter = props => {
  return <RBModal.Footer className={props.className}>{props.children}</RBModal.Footer>;
};
export default Modal;
