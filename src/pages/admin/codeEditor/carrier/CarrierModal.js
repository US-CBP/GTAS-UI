import React, {useState} from "react";
import {Modal, Button, Container, Alert} from "react-bootstrap";
import Form from "../../../../components/form/Form";
import LabelledInput from "../../../../components/labelledInput/LabelledInput";
import { codeEditor } from "../../../../services/serviceWrapper";
import { ACTION } from "../../../../utils/constants";

const CarrierModal = props => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [variant, setVariant] = useState("");
  const cb = function(result) {};
  const data = props.editRowDetails || {};

  const postSubmit = (status = ACTION.CANCEL, results) => {
    props.onHide();

    if (status !== ACTION.CANCEL) props.refresh();
  };

  const preSubmit = fields => {
    let res = { ...fields[0] };
    //Id is lacking for updates in the body
    res.id = data.id;
    res.originId = data.originId;
    return [res];
  };

  const restoreSpecificCode = () => {
    codeEditor.put.restoreCarrier(data).then(res => {
      postSubmit(ACTION.UPDATE);
    });
  };

  const customButtons = props.isEdit
    ? [
        <Button
          type="button"
          className="m-2 outline-dark-outline"
          variant="outline-dark"
          key="restore"
          onClick={restoreSpecificCode}
        >
          Restore
        </Button>,
        <Button
          type="button"
          className="m-2 outline-dark-outline"
          variant="outline-dark"
          key="delete"
          onClick={() => {
            codeEditor.delete.deleteCarrier(data.id).then(res => {
              postSubmit(ACTION.DELETE);
            });
          }}
        >
          Delete
        </Button>
      ]
    : [];

  return (
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
            submitService={
              props.isEdit ? codeEditor.put.updateCarrier : codeEditor.post.createCarrier
            }
            callback={postSubmit}
            action="add"
            submitText={props.isEdit ? "Save" : "Submit"}
            cancellable
            customButtons={customButtons}
            paramCallback={preSubmit}
          >
            <LabelledInput
              datafield
              labelText="IATA:"
              inputType="text"
              name="iata"
              required={true}
              alt="nothing"
              inputVal={data.iata}
              callback={cb}
              spacebetween
            />
            <LabelledInput
              datafield
              labelText="Name:"
              inputType="text"
              name="name"
              required={true}
              alt="nothing"
              inputVal={data.name}
              callback={cb}
              spacebetween
            />
          </Form>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default CarrierModal;
