import React from "react";
import QueryBuilder from "../../../components/queryBuilder/QueryBuilder";
import { Button, Modal, Container } from "react-bootstrap";
import Form from "../../../components/form/Form";

const WLModal = props => {
  return (
    <>
      <Modal
        show={props.show}
        onHide={props.onHide}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="qbrb-modal-body">
          <Container fluid>
            <Form></Form>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default WLModal;
