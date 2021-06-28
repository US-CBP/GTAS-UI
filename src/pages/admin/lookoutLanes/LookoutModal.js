// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React from "react";
import { Container } from "react-bootstrap";
import Form from "../../../components/form/Form";
import Xl8 from "../../../components/xl8/Xl8";
import LabelledInput from "../../../components/labelledInput/LabelledInput";
import { poe } from "../../../services/serviceWrapper";
import { ACTION, LOOKOUTSTATUS } from "../../../utils/constants";
import Modal, {
  ModalBody,
  ModalHeader,
  ModalTitle
} from "../../../components/modal/Modal";

const LookoutModal = props => {
  const row = props.editRowDetails || {};
  const cb = () => {};
  const statuses = [
    { value: LOOKOUTSTATUS.ACTIVE, label: LOOKOUTSTATUS.ACTIVE },
    { value: LOOKOUTSTATUS.ENROUTE, label: LOOKOUTSTATUS.ENROUTE },
    { value: LOOKOUTSTATUS.ENCOUNTERED, label: LOOKOUTSTATUS.ENCOUNTERED },
    { value: LOOKOUTSTATUS.NEGATIVE, label: LOOKOUTSTATUS.NEGATIVE },
    { value: LOOKOUTSTATUS.POSITIVE, label: LOOKOUTSTATUS.POSITIVE },
    { value: LOOKOUTSTATUS.REFERRED, label: LOOKOUTSTATUS.REFERRED },
    { value: LOOKOUTSTATUS.DIDNOTBOARD, label: LOOKOUTSTATUS.DIDNOTBOARD },
    { value: LOOKOUTSTATUS.INACTIVE, label: LOOKOUTSTATUS.INACTIVE },
    { value: LOOKOUTSTATUS.MISSED, label: LOOKOUTSTATUS.MISSED },
    { value: LOOKOUTSTATUS.UNCATEGORIZED, label: LOOKOUTSTATUS.UNCATEGORIZED }
  ];

  const postSubmit = status => {
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
      <ModalHeader closeButton>
        <ModalTitle>{props.title}</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <Container fluid>
          <Form
            submitService={props.isEdit ? poe.put.updateLane : poe.post.createNewLane}
            callback={postSubmit}
            paramCallback={preSubmit}
            action="add"
            cancellable
            afterProcessed={props.onHide}
          >
            <LabelledInput
              datafield
              labelText={<Xl8 xid="lkoutm003">Display Name:</Xl8>}
              inputtype="text"
              inputval={row.displayName}
              name="displayName"
              required={true}
              alt="nothing"
              callback={cb}
            />
            <LabelledInput
              datafield
              labelText={<Xl8 xid="lkoutm004">Status:</Xl8>}
              inputtype="select"
              name="status"
              inputval={props.isEdit ? row.status : statuses[0].value}
              options={statuses}
              required={true}
              alt="nothing"
              callback={cb}
            />
            <LabelledInput
              datafield
              labelText={<Xl8 xid="lkoutm005">Order Number:</Xl8>}
              inputtype="number"
              name="ord"
              required={true}
              alt="nothing"
              inputval={row.ord}
              callback={cb}
            />
          </Form>
        </Container>
      </ModalBody>
    </Modal>
  );
};

export default LookoutModal;
