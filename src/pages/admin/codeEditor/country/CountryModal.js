import React from "react";
import { Modal, Button, Container } from "react-bootstrap";
import Form from "../../../../components/form/Form";
import LabelledInput from "../../../../components/labelledInput/LabelledInput";
import { codeEditor } from "../../../../services/serviceWrapper";
import { ACTION } from "../../../../utils/constants";

const CountryModal = props => {
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
          Restore
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
      <Modal.Body>
        <Container fluid>
          <Form
            submitService={
              props.isEdit ? codeEditor.put.updateCountry : codeEditor.post.createCountry
            }
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
              labelText="ISO2:"
              inputType="text"
              name="iso2"
              required={true}
              alt="nothing"
              inputVal={data.iso2}
              callback={cb}
              spacebetween
            />
            <LabelledInput
              datafield
              labelText="ISO3:"
              inputType="text"
              name="iso3"
              required={true}
              alt="nothing"
              inputVal={data.iso3}
              callback={cb}
              spacebetween
            />
            <LabelledInput
              datafield
              labelText="ISO Numeric:"
              inputType="text"
              name="isoNumeric"
              required={true}
              alt="nothing"
              inputVal={data.isoNumeric}
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

export default CountryModal;
