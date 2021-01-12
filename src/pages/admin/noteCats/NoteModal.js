import React, { useState } from "react";
import { Container, Alert, Button } from "react-bootstrap";
import Form from "../../../components/form/Form";
import Xl8 from "../../../components/xl8/Xl8";
import { notetypes } from "../../../services/serviceWrapper";
import LabelledInput from "../../../components/labelledInput/LabelledInput";
import { ACTION } from "../../../utils/constants";
import Modal, {
  ModalBody,
  ModalHeader,
  ModalTitle
} from "../../../components/modal/Modal";

const NoteModal = props => {
  const row = props.editRowDetails || {};
  const cb = () => {};

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
            submitService={props.isEdit ? notetypes.put : notetypes.post}
            title=""
            callback={postSubmit}
            paramCallback={preSubmit}
            action="add"
            cancellable
            afterProcessed={props.onHide}
          >
            <LabelledInput
              datafield
              labelText={<Xl8 xid="ntm003">Category</Xl8>}
              inputtype="text"
              inputval={row.noteType}
              name="noteType"
              required={true}
              alt="nothing"
              callback={cb}
            />
          </Form>
        </Container>
      </ModalBody>
    </Modal>
  );
};

export default NoteModal;
