import React, { useState } from "react";
import { Modal, Button, Container, Alert } from "react-bootstrap";
import Form from "../../../../components/form/Form";
import Xl8 from "../../../../components/xl8/Xl8";
import LabelledInput from "../../../../components/labelledInput/LabelledInput";
import { codeEditor } from "../../../../services/serviceWrapper";
import { ACTION } from "../../../../utils/constants";

const CountryModal = props => {
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
    codeEditor.put.restoreCountry(data).then(res => {
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
          <Xl8 xid="cem001">Restore</Xl8>
        </Button>,
        <Button
          type="button"
          className="m-2 outline-dark-outline"
          variant="outline-dark"
          key="delete"
          onClick={() => {
            codeEditor.delete.deleteCountry(data.id).then(res => {
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
            submitService={
              props.isEdit ? codeEditor.put.updateCountry : codeEditor.post.createCountry
            }
            callback={postSubmit}
            action="add"
            paramCallback={preSubmit}
            afterProcessed={props.onHide}
            cancellable
            customButtons={customButtons}
          >
            <LabelledInput
              datafield
              labelText={<Xl8 xid="coum003">ISO2:</Xl8>}
              inputType="text"
              name="iso2"
              required={true}
              alt={<Xl8 xid="0">ISO2:</Xl8>}
              inputVal={data.iso2}
              callback={cb}
              spacebetween
            />
            <LabelledInput
              datafield
              labelText={<Xl8 xid="coum004">ISO3:</Xl8>}
              inputType="text"
              name="iso3"
              required={true}
              alt={<Xl8 xid="0">ISO3:</Xl8>}
              inputVal={data.iso3}
              callback={cb}
              spacebetween
            />
            <LabelledInput
              datafield
              labelText={<Xl8 xid="coum005">ISO Numeric:</Xl8>}
              inputType="text"
              name="isoNumeric"
              required={true}
              alt={<Xl8 xid="0">ISO Numeric:</Xl8>}
              inputVal={data.isoNumeric}
              callback={cb}
              spacebetween
            />
            <LabelledInput
              datafield
              labelText={<Xl8 xid="coum006">Name:</Xl8>}
              inputType="text"
              name="name"
              required={true}
              alt={<Xl8 xid="0">Name:</Xl8>}
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

export default CountryModal;
