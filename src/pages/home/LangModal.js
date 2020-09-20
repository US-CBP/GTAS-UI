import React, { useState } from "react";
import { Modal, Button, Container, Alert } from "react-bootstrap";
import Form from "../../components/form/Form";
import Xid from "../../components/xid/Xid";
// import { watchlistcatspost } from "../../../services/serviceWrapper";
import LabelledInput from "../../components/labelledInput/LabelledInput";
import { ACTION } from "../../utils/constants";

const LangModal = props => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [variant, setVariant] = useState("");
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
        <Modal.Title>
          <Xid xid="2">Edit Translation</Xid>
        </Modal.Title>
      </Modal.Header>
      {/* <Alert show={showAlert} variant={variant}>
        {alertContent}
        <hr />
        <Button onClick={() => setShowAlert(false)} variant="outline-success">
          Confirm
        </Button>
      </Alert> */}
      <Modal.Body>
        <Container fluid>
          <Form
            // submitService={watchlistcatspost.post}
            callback={postSubmit}
            action="add"
            submitText="Save"
            cancellable
            afterProcessed={props.onHide}
          >
            <LabelledInput
              datafield
              labelText={<Xid xid="2">ID:</Xid>}
              inputVal={props.xid}
              inputType="label"
              name="id"
              alt={<Xid xid="2">Translation ID:</Xid>}
              callback={cb}
              inline
            />
            <LabelledInput
              datafield
              labelText={<Xid xid="2">Default Translation:</Xid>}
              inputType="text"
              name="default"
              alt={<Xid xid="2">Default Translation:</Xid>}
              callback={cb}
            />
            <LabelledInput
              datafield
              labelText={<Xid xid="2">Translation:</Xid>}
              inputType="textarea"
              name="translation"
              required={true}
              alt={<Xid xid="2">Translation:</Xid>}
              callback={cb}
            />
          </Form>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default LangModal;
