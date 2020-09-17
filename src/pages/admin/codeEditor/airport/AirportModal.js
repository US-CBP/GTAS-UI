import React, {useState} from "react";
import {Modal, Button, Container, Alert} from "react-bootstrap";

import { codeEditor } from "../../../../services/serviceWrapper";
import Form from "../../../../components/form/Form";
import LabelledInput from "../../../../components/labelledInput/LabelledInput";
import { ACTION } from "../../../../utils/constants";

const AirportModal = props => {
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
    res.id = props.editRowDetails.id;
    res.originId = props.editRowDetails.originId;
    return [res];
  };

  const restoreSpecificCode = () => {
    codeEditor.put.restoreAirport(props.editRowDetails).then(res => {
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
          onClick={() => restoreSpecificCode()}
        >
          Restore
        </Button>,
        <Button
          type="button"
          className="m-2 outline-dark-outline"
          variant="outline-dark"
          key="delete"
          onClick={() => {
            codeEditor.delete.deleteAirport(props.editRowDetails?.id).then(res => {
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
              props.isEdit ? codeEditor.put.updateAirport : codeEditor.post.createAirport
            }
            title=""
            callback={postSubmit}
            action="add"
            submitText={props.isEdit ? "Save" : "Submit"}
            paramCallback={preSubmit}
            afterProcessed={props.onHide}
            cancellable
            customButtons={customButtons}
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
              labelText="ICAO:"
              inputType="text"
              name="icao"
              required={true}
              alt="nothing"
              inputVal={data.icao}
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
            <LabelledInput
              datafield
              labelText="City:"
              inputType="text"
              name="city"
              required={true}
              alt="nothing"
              inputVal={data.city}
              callback={cb}
              spacebetween
            />
            <LabelledInput
              datafield
              labelText="Country"
              inputType="text"
              name="country"
              required={true}
              alt="nothing"
              inputVal={data.country}
              callback={cb}
              spacebetween
            />
            <LabelledInput
              datafield
              labelText="Latitude:"
              inputType="text"
              name="latitude"
              required={true}
              alt="nothing"
              inputVal={data.latitude?.toString() || ""}
              callback={cb}
              spacebetween
            />
            <LabelledInput
              datafield
              labelText="Longitude:"
              inputType="text"
              name="longitude"
              required={true}
              alt="nothing"
              inputVal={data.longitude?.toString() || ""}
              callback={cb}
              spacebetween
            />
          </Form>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default AirportModal;
