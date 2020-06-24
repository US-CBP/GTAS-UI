import React from "react";
import QueryBuilder from "../../../components/queryBuilder/QueryBuilder";
import { Button, Modal, Container } from "react-bootstrap";

const QRModal = props => {
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
            <QueryBuilder></QueryBuilder>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="button"
            className="m-2 outline-dark-outline"
            variant="outline-dark"
            // onClick={this.onFormCancel}
          >
            Clear
          </Button>
          <Button
            type="button"
            className="m-2 outline-dark-outline"
            variant="outline-dark"
            // onClick={this.onFormCancel}
          >
            Save
          </Button>
          <Button
            type="button"
            className="m-2 outline-dark-outline"
            variant="outline-dark"
            // onClick={this.onFormCancel}
          >
            Run
          </Button>
          <Button
            type="button"
            className="m-2 outline-dark-outline"
            variant="outline-dark"
            // onClick={this.onFormCancel}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default QRModal;
