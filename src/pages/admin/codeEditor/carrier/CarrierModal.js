// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React from "react";
import { Button, Container } from "react-bootstrap";
import Form from "../../../../components/form/Form";
import Xl8 from "../../../../components/xl8/Xl8";
import LabelledInput from "../../../../components/labelledInput/LabelledInput";
import { codeEditor } from "../../../../services/serviceWrapper";
import { ACTION } from "../../../../utils/constants";
import Modal, {
  ModalBody,
  ModalHeader,
  ModalTitle
} from "../../../../components/modal/Modal";

const CarrierModal = props => {
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
          <Xl8 xid="cem01">Restore</Xl8>
        </Button>,
        <Button
          type="button"
          className="m-2 "
          variant="outline-danger"
          key="delete"
          onClick={() => props.actionCallback(ACTION.DELETE)}
        >
          <Xl8 xid="cem02 ">Delete</Xl8>
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
              props.isEdit ? codeEditor.put.updateCarrier : codeEditor.post.createCarrier
            }
            callback={postSubmit}
            action="add"
            cancellable
            customButtons={customButtons}
            paramCallback={preSubmit}
          >
            <LabelledInput
              datafield
              labelText={<Xl8 xid="iata001">IATA: </Xl8>}
              inputType="text"
              name="iata"
              required={true}
              alt={<Xl8 xid="0">IATA:</Xl8>}
              inputVal={data.iata}
              callback={cb}
              spacebetween
            />
            <LabelledInput
              datafield
              labelText={<Xl8 xid="carm001">Name:</Xl8>}
              inputType="text"
              name="name"
              required={true}
              alt=""
              inputVal={data.name}
              callback={cb}
              spacebetween
            />
          </Form>
        </Container>
      </ModalBody>
    </Modal>
  );
};

export default CarrierModal;
