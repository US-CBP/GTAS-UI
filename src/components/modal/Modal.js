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

export default Modal;
