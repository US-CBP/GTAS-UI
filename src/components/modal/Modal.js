import React, { useRef } from "react";
import { Modal as RBModal, Button } from "react-bootstrap";
import "./Modal.css";

const Modal = props => {
  const size = props.size || "md";
  const modalRef = useRef(null);
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
  return <RBModal.Title>{props.children}</RBModal.Title>;
};

export const ModalHeader = props => {
  return <RBModal.Header>{props.children}</RBModal.Header>;
};

export const ModalBody = props => {
  return <RBModal.Body>{props.children}</RBModal.Body>;
};
export const ModalFooter = props => {
  return <RBModal.Footer>{props.children}</RBModal.Footer>;
};
export default Modal;
