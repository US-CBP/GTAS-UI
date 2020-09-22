import React, { useState, useEffect } from "react";
import { Modal, Button, Container, Alert } from "react-bootstrap";
import Form from "../../components/form/Form";
import Xid from "../../components/xid/Xid";
// import { watchlistcatspost } from "../../../services/serviceWrapper";
import LabelledInput from "../../components/labelledInput/LabelledInput";
import { ACTION } from "../../utils/constants";
import { hasData } from "../../utils/utils";

const LangModal = props => {
  const cb = function(result) {};
  const [elem, setElem] = useState(props.elem);

  props.elem && props.show && console.log(props.elem);

  const postSubmit = (status, res) => {
    props.onHide();

    if (status !== ACTION.CANCEL) props.refresh();
  };

  // useEffect(() => {
  //   if (hasData(props.elem)) {
  //     console.log(elem.xid.value);
  //     setXid(elem.xid.value);
  //     setOrig(elem.deft.value);
  //   }
  // }, []);

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Translation</Modal.Title>
      </Modal.Header>
      {/* <Alert show={showAlert} variant={variant}>
        {alertContent}
        <hr />
        <Button onClick={() => setShowAlert(false)} variant="outline-success">
          Confirm
        </Button>
      </Alert> */}
      <Modal.Body>
        <Container fluid>
          <Form
            // submitService={watchlistcatspost.post}
            callback={postSubmit}
            action="add"
            submitText="Save"
            cancellable
            afterProcessed={props.onHide}
          >
            <LabelledInput
              datafield
              labelText="ID:"
              inputVal={props.elem.xid}
              inputType="label"
              required={true}
              readOnly
              name="id"
              alt="Translation ID:"
              callback={cb}
              spacebetween
            />
            <LabelledInput
              datafield
              labelText="Default Text:"
              inputType="label"
              readOnly
              inputVal={props.elem.orig}
              name="default"
              required={true}
              alt="Default Text:"
              callback={cb}
              spacebetween
            />
            <LabelledInput
              datafield
              labelText="Translation:"
              inputType="textarea"
              inputVal={props.elem.trans}
              name="translation"
              required={true}
              alt="Translation:"
              callback={cb}
              spacebetween
            />
          </Form>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default LangModal;
