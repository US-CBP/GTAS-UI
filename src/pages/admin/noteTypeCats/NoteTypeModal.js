import React, {useState} from "react";
import {Modal, Container, Alert, Button} from "react-bootstrap";
import Form from "../../../components/form/Form";
import { notetypes } from "../../../services/serviceWrapper";
import LabelledInput from "../../../components/labelledInput/LabelledInput";
import { ACTION } from "../../../utils/constants";

const NoteTypeModal = props => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [variant, setVariant] = useState("");
  const title = "Note Type Category";
  const cb = function(result) {};

  const postSubmit = (status, res) => {
    props.onHide();

    if (status !== ACTION.CANCEL) props.refresh();
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
      <Alert show={showAlert} variant={variant}>
        {alertContent}
        <hr />
        <Button onClick={() => setShowAlert(false)} variant="outline-success">
          Confirm
        </Button>
      </Alert>
      <Modal.Body>
        <Container fluid>
          <Form
            submitService={notetypes.post}
            title=""
            callback={postSubmit}
            action="add"
            submitText="Submit"
            cancellable
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
    </Modal>
  );
};

export default NoteTypeModal;
