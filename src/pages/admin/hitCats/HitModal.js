import React, { useState } from "react";
import { Modal, Button, Container, Alert } from "react-bootstrap";
import Form from "../../../components/form/Form";
import Xl8 from "../../../components/xl8/Xl8";
import { hitcatspost } from "../../../services/serviceWrapper";
import LabelledInput from "../../../components/labelledInput/LabelledInput";
import { ACTION } from "../../../utils/constants";

const HitModal = props => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [variant, setVariant] = useState("");
  const row = props.editRowDetails || {};
  const cb = function(result) {};
  const severityLevels = [
    { value: "Top", label: "Top" },
    { value: "High", label: "High" },
    { value: "Normal", label: "Normal" }
  ];

  const postSubmit = (status, res) => {
    props.onHide();

    if (status !== ACTION.CANCEL) props.refresh();
  };

  const preSubmit = fields => {
    let res = { ...fields[0] };
    res.id = props.isEdit ? row.id : "";
    return [res];
  };

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="max-500-width-container"
    >
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Alert show={showAlert} variant={variant}>
        {alertContent}
        <hr />
        <Button onClick={() => setShowAlert(false)} variant="outline-success">
          <Xl8 xid="form003">Confirm</Xl8>
        </Button>
      </Alert>
      <Modal.Body>
        <Container fluid>
          <Form
            submitService={props.isEdit ? hitcatspost.put : hitcatspost.post}
            callback={postSubmit}
            paramCallback={preSubmit}
            action="add"
            cancellable
            afterProcessed={props.onHide}
          >
            <LabelledInput
              datafield
              labelText={<Xl8 xid="wlm003">Name:</Xl8>}
              inputType="text"
              inputVal={row.label}
              name="label"
              required={true}
              alt="nothing"
              callback={cb}
            />
            <LabelledInput
              datafield
              labelText={<Xl8 xid="wlm004">Description:</Xl8>}
              inputType="textarea"
              inputVal={row.description}
              name="description"
              required={true}
              alt="nothing"
              callback={cb}
            />
            <LabelledInput
              datafield
              labelText={<Xl8 xid="wlm005">Severity Level:</Xl8>}
              inputType="select"
              name="severity"
              inputVal={props.isEdit ? row.severity : severityLevels[0].value}
              options={severityLevels}
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

export default HitModal;
