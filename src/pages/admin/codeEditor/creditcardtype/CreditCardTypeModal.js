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

const CreditCardTypeModal = props => {
  const cb = function(result) {};
  const data = props.editRowDetails || {};

  const postSubmit = (status = ACTION.CANCEL, results) => {
    props.onHide();

    if (status !== ACTION.CANCEL) props.refresh();
  };

  const preSubmit = fields => {
    let res = { ...fields[0] };
    res.id = data.id || 0;
    res.originId = data.originId || 0;

    return [res];
  };

  let customButtons = [];

  if (props.isEdit) {
    if (data.originId) {
      customButtons.push(
        <Button
          type="button"
          className="m-2 outline-dark-outline"
          variant="outline-dark"
          key="restore"
          onClick={() => props.actionCallback(ACTION.UPDATE)}
        >
          <Xl8 xid="cctm001">Restore</Xl8>
        </Button>
      );
    }
    customButtons.push(
      <Button
        type="button"
        className="m-2"
        variant="outline-danger"
        key="delete"
        onClick={() => props.actionCallback(ACTION.DELETE)}
      >
        <Xl8 xid="cctm002">Delete</Xl8>
      </Button>
    );
  }

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
              props.isEdit ? codeEditor.put.updateCctype : codeEditor.post.createCctype
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
              labelText={<Xl8 xid="cct002">Code:</Xl8>}
              inputType="text"
              max-length="2"
              name="code"
              required={true}
              maxlength="2"
              alt="nothing"
              inputVal={data.code?.toUpperCase()}
              callback={cb}
              spacebetween
            />
            <LabelledInput
              datafield
              labelText={<Xl8 xid="cct003">Description:</Xl8>}
              inputType="text"
              name="description"
              required={true}
              alt="nothing"
              inputVal={data.description}
              callback={cb}
              spacebetween
            />
          </Form>
        </Container>
      </ModalBody>
    </Modal>
  );
};

export default CreditCardTypeModal;
