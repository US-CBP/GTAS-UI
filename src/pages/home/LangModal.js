// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React, { useState, useEffect } from "react";
import { Modal, Button, Container, Alert } from "react-bootstrap";
import Form from "../../components/form/Form";
import Xl8 from "../../components/xl8/Xl8";
import { translations } from "../../services/serviceWrapper";
import LabelledInput from "../../components/labelledInput/LabelledInput";
import { ACTION } from "../../utils/constants";
import { hasData } from "../../utils/utils";

const LangModal = props => {
  const cb = function(result) {};
  const data = props.elem || {};

  const postSubmit = (status, res) => {
    props.onHide();
    if (status === ACTION.SAVE) window.location.reload();
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
      <Modal.Header closeButton>
        <Modal.Title>Edit Translation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container fluid>
          <Form
            submitService={translations.post}
            callback={postSubmit}
            action="add"
            cancellable
            cancelText="Cancel"
            submitText="Submit"
            afterProcessed={props.onHide}
          >
            <LabelledInput
              datafield
              labelText="Code:"
              inputVal={data.xid}
              inputType="label"
              required={true}
              readOnly
              name="code"
              alt="Translation Code:"
              callback={cb}
              spacebetween
            />
            <LabelledInput
              datafield
              labelText="Language:"
              inputType="label"
              readOnly
              inputVal={window.navigator.language.split("-")[0]}
              name="language"
              alt="Language:"
              callback={cb}
              spacebetween
            />
            <LabelledInput
              labelText="Default Text:"
              inputType="label"
              readOnly
              inputVal={data.orig}
              name="default"
              alt="Default Text:"
              callback={cb}
              spacebetween
            />
            <LabelledInput
              datafield
              labelText="Translation:"
              inputType="textarea"
              inputVal={data.trans}
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
