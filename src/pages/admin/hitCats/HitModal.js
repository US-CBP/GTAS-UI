import React from "react";
import { Container } from "react-bootstrap";
import Form from "../../../components/form/Form";
import Xl8 from "../../../components/xl8/Xl8";
import LabelledInput from "../../../components/labelledInput/LabelledInput";
import { hitcatspost } from "../../../services/serviceWrapper";
import { ACTION } from "../../../utils/constants";
import Modal, {
  ModalBody,
  ModalHeader,
  ModalTitle
} from "../../../components/modal/Modal";

const HitModal = props => {
  const row = props.editRowDetails || {};
  const cb = () => {};
  const severityLevels = [
    { value: "Top", label: "Top" },
    { value: "High", label: "High" },
    { value: "Normal", label: "Normal" }
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
              inputtype="text"
              inputval={row.label}
              name="label"
              required={true}
              alt="nothing"
              callback={cb}
            />
            <LabelledInput
              datafield
              labelText={<Xl8 xid="wlm004">Description:</Xl8>}
              inputtype="textarea"
              inputval={row.description}
              name="description"
              required={true}
              alt="nothing"
              callback={cb}
            />
            <LabelledInput
              datafield
              labelText={<Xl8 xid="wlm005">Severity Level:</Xl8>}
              inputtype="select"
              name="severity"
              inputval={props.isEdit ? row.severity : severityLevels[0].value}
              options={severityLevels}
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

export default HitModal;
