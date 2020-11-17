import React, { useState } from "react";
import { Button, Container, Alert } from "react-bootstrap";

import { codeEditor } from "../../../../services/serviceWrapper";
import Form from "../../../../components/form/Form";
import Xl8 from "../../../../components/xl8/Xl8";
import LabelledInput from "../../../../components/labelledInput/LabelledInput";
import { ACTION } from "../../../../utils/constants";
import Modal, {
  ModalBody,
  ModalHeader,
  ModalTitle
} from "../../../../components/modal/Modal";

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
          onClick={props.restoreSpecificCode}
        >
          <Xl8 xid="cem01">Restore</Xl8>
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
          <Xl8 xid="cem002">Delete</Xl8>
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
      className="max-500-width-container"
    >
      <ModalHeader closeButton>
        <ModalTitle>{props.title}</ModalTitle>
      </ModalHeader>
      <Alert show={showAlert} variant={variant}>
        {alertContent}
        <hr />
        <Button onClick={() => setShowAlert(false)} variant="outline-success">
          <Xl8 xid="form003">Confirm</Xl8>
        </Button>
      </Alert>
      <ModalBody>
        <Container fluid>
          <Form
            submitService={
              props.isEdit ? codeEditor.put.updateAirport : codeEditor.post.createAirport
            }
            title=""
            callback={postSubmit}
            action="add"
            paramCallback={preSubmit}
            afterProcessed={props.onHide}
            cancellable
            customButtons={customButtons}
          >
            <LabelledInput
              datafield
              labelText={<Xl8 xid="iata001">IATA: </Xl8>}
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
              labelText={<Xl8 xid="icao001">ICAO: </Xl8>}
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
              labelText={<Xl8 xid="airm003">Name: </Xl8>}
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
              labelText={<Xl8 xid="airm004">City: </Xl8>}
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
              labelText={<Xl8 xid="airm005">Country: </Xl8>}
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
              labelText={<Xl8 xid="lati001">Latitude: </Xl8>}
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
              labelText={<Xl8 xid="long001">Longitude: </Xl8>}
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
      </ModalBody>
    </Modal>
  );
};

export default AirportModal;
