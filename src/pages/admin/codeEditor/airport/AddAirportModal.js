import React from "react";
import { Modal, Button, Container } from "react-bootstrap";

import { codeEditor } from "../../../../services/serviceWrapper";
import Form from "../../../../components/form/Form";
import LabelledInput from "../../../../components/labelledInput/LabelledInput";

const AddAirportModal = props => {
  const title = "Add Airport";
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
            submitService={codeEditor.post.createAirport}
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
              labelText="ICAO:"
              inputType="text"
              name="icao"
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
            <LabelledInput
              datafield
              labelText="City:"
              inputType="text"
              name="city"
              required={true}
              alt="nothing"
              callback={cb}
            />
            <LabelledInput
              datafield
              labelText="Country"
              inputType="text"
              name="country"
              required={true}
              alt="nothing"
              callback={cb}
            />
            <LabelledInput
              datafield
              labelText="Latitude:"
              inputType="text"
              name="latitude"
              required={true}
              alt="nothing"
              callback={cb}
            />
            <LabelledInput
              datafield
              labelText="Longitude:"
              inputType="text"
              name="longitude"
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

export default AddAirportModal;
