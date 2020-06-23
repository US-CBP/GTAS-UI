import React from "react";
import { Modal, Button, Container } from "react-bootstrap";
import Form from "../../../../components/form/Form";
import LabelledInput from "../../../../components/labelledInput/LabelledInput";
import { codeEditor } from "../../../../services/serviceWrapper";

const AddCarrierModal = props => {
  const title = "Add Carrier";
  const cb = function(result) {};

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
            submitService={codeEditor.post.createCarrier}
            title=""
            callback={props.callback}
            action="add"
            submitText="Submit"
            afterProcessed={props.onHide}
          >
            <LabelledInput
              datafield
              labelText="IATA:"
              inputType="text"
              name="iata"
              required={true}
              alt="nothing"
              callback={cb}
            />
            <LabelledInput
              datafield
              labelText="Name:"
              inputType="text"
              name="name"
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

export default AddCarrierModal;
