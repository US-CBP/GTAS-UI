import React from "react";
import { Button, Container } from "react-bootstrap";
import Form from "../../../../components/form/Form";
import Xl8 from "../../../../components/xl8/Xl8";
import LabelledInput from "../../../../components/labelledInput/LabelledInput";
import { codeEditor } from "../../../../services/lookupService";
import { ACTION } from "../../../../utils/constants";
import Modal, {
  ModalBody,
  ModalHeader,
  ModalTitle
} from "../../../../components/modal/Modal";
const type = "country";

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

  const customButtons = props.isEdit
    ? [
        <Button
          type="button"
          className="m-2 outline-dark-outline"
          variant="outline-dark"
          key="restore"
          onClick={() => props.actionCallback(ACTION.UPDATE)}
        >
          <Xl8 xid="cem001">Restore</Xl8>
        </Button>,
        <Button
          type="button"
          className="m-2 "
          variant="outline-danger"
          key="delete"
          onClick={() => props.actionCallback(ACTION.DELETE)}
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
      <ModalBody>
        <Container fluid>
          <Form
            submitService={
              props.isEdit
                ? body => codeEditor.put.update(type, body)
                : body => codeEditor.post(type, body)
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
              inputtype="text"
              name="iso2"
              required={true}
              alt={<Xl8 xid="0">ISO2:</Xl8>}
              inputval={data.iso2}
              callback={cb}
              spacebetween
            />
            <LabelledInput
              datafield
              labelText={<Xl8 xid="coum004">ISO3:</Xl8>}
              inputtype="text"
              name="iso3"
              required={true}
              alt={<Xl8 xid="0">ISO3:</Xl8>}
              inputval={data.iso3}
              callback={cb}
              spacebetween
            />
            <LabelledInput
              datafield
              labelText={<Xl8 xid="coum005">ISO Numeric:</Xl8>}
              inputtype="text"
              name="isoNumeric"
              required={true}
              alt={<Xl8 xid="0">ISO Numeric:</Xl8>}
              inputval={data.isoNumeric}
              callback={cb}
              spacebetween
            />
            <LabelledInput
              datafield
              labelText={<Xl8 xid="coum006">Name:</Xl8>}
              inputtype="text"
              name="name"
              required={true}
              alt={<Xl8 xid="0">Name:</Xl8>}
              inputval={data.name}
              callback={cb}
              spacebetween
            />
          </Form>
        </Container>
      </ModalBody>
    </Modal>
  );
};

export default CountryModal;
