import React from "react";
import { Modal, Button, Container } from "react-bootstrap";
import Form from "../../../../components/form/Form";
import LabelledInput from "../../../../components/labelledInput/LabelledInput";
import {codeEditor} from "../../../../services/serviceWrapper";


const AddCountryModal = props => {
  const title = "Add Country";
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
            submitService={codeEditor.post.createCountry}
            title=""
            callback={props.callback}
            action="add"
            submitText="Submit"
            afterProcessed={props.onHide}
          >
            <LabelledInput
              datafield
              labelText="ISO2:"
              inputType="text"
              name="iso2"
              required={true}
              alt="nothing"
              callback={cb}
            />
            <LabelledInput
                datafield
                labelText="ISO3:"
                inputType="text"
                name="iso3"
                required={true}
                alt="nothing"
                callback={cb}
            />
            <LabelledInput
                datafield
                labelText="ISO Numeric:"
                inputType="text"
                name="isoNumeric"
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

export default AddCountryModal;
