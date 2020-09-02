import React from "react";
import { Modal as RBModal, Button } from "react-bootstrap";
import "./Modal.css";

const Modal = props => {
  const data = props.data || {
    message: "Modal Message text about this stylish and important modal message.",
    title: "Modal Title",
    header: "Modal Header",
    style: "default"
  };

  const submitText = props.submittext || "Submit";
  const closeText = props.closetext || "Close";

  return (
    <RBModal
      {...props}
      className={data.style}
      size={props.size}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <RBModal.Header closeButton className={data.style}>
        <RBModal.Title id="modalTitle">
          <i className={`fa bq-${data.style} m-2`}></i>
          {data.title}
        </RBModal.Title>
      </RBModal.Header>
      <RBModal.Body>
        <h5>{data.header}</h5>
        <p>{data.message}</p>
      </RBModal.Body>
      <RBModal.Footer>
        <Button onClick={() => props.onHide(closeText)} variant="ternary">
          {closeText}
        </Button>
        {props.submittext && (
          <Button onClick={() => props.onHide(submitText)} variant="ternary">
            {props.submittext}
          </Button>
        )}
      </RBModal.Footer>
    </RBModal>
  );
};

export default Modal;
