import React from "react";
import { Modal, Button, Container } from "react-bootstrap";
import Form from "../../../components/form/Form";
import { notetypes } from "../../../services/serviceWrapper";
import LabelledInput from "../../../components/labelledInput/LabelledInput";

const NoteTypeModal = props => {
  const title = "Note Type Category";
  const cb = function(result) {};
  const postSubmit = ev => {
    props.onHide();
    props.refresh();
  };

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container fluid>
          <Form
            submitService={notetypes.post}
            title=""
            callback={postSubmit}
            action="add"
            submitText="Submit"
            afterProcessed={props.onHide}
          >
            <LabelledInput
              datafield
              labelText="Note Type Category Name:"
              inputType="text"
              name="noteType"
              required={true}
              alt="nothing"
              callback={cb}
            />
          </Form>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NoteTypeModal;
