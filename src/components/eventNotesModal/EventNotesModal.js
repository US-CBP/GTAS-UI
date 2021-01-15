// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { paxEventNotesHistory, notetypes } from "../../services/serviceWrapper";
import Form from "../../components/form/Form";
import LabelledInput from "../../components/labelledInput/LabelledInput";
import { asArray, hasData } from "../../utils/utils";
import Xl8 from "../../components/xl8/Xl8";
import Modal, { ModalBody, ModalHeader, ModalTitle } from "../../components/modal/Modal";

const EventNotesModal = props => {
  const [show, setShow] = useState(false);
  const [notTypes, setNoteTypes] = useState([]);

  const handleClose = (status, res) => {
    setShow(false);
    if (hasData(props.callback)) props.callback(status, res);
  };
  const handleShow = () => setShow(true);
  const paxId = props.paxId;

  useEffect(() => {
    notetypes.get().then(types => {
      const nTypes = [];
      asArray(types).forEach(type => {
        if (type.noteType !== "DELETED") {
          nTypes.push({
            value: `{"id":"${type.id}", "noteType":"${type.noteType}"}`,
            label: type.noteType
          });
        }
      });

      setNoteTypes(nTypes);
    });
  }, []);

  const launcher = props.icon ? (
    <div onClick={handleShow}>
      <i className="fa fa-edit"></i>
    </div>
  ) : (
    <div className="dropdown-item" onClick={handleShow}>
      <Xl8 xid="evn001">Add Event Notes</Xl8>
    </div>
  );

  return (
    <>
      {launcher}

      <Modal
        show={show}
        onHide={handleClose}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="max-600-width-container"
      >
        <ModalHeader closeButton>
          <ModalTitle>
            <Xl8 xid="evn002">Add Event Notes</Xl8>
          </ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Form
            title=""
            // submitText={<Xl8 xid="evn003">Save</Xl8>}
            submitService={paxEventNotesHistory.post}
            callback={handleClose}
            action="add"
            id="evennoteform"
            afterProcessed={handleClose}
            recordId={paxId}
            cancellable
          >
            <LabelledInput
              inputType="select"
              alt="Choose not type"
              name="noteType"
              labelText={<Xl8 xid="evn004">Note Type</Xl8>}
              datafield="noteType"
              required="required"
              options={notTypes}
            />
            <LabelledInput
              inputType="textarea"
              labelText={<Xl8 xid="evn001">Notes</Xl8>}
              name="plainTextNote"
              alt={<Xl8 xid="11">Notes</Xl8>}
              datafield="plainTextNote"
              required="required"
              inputVal=""
            />
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};
EventNotesModal.propTypes = {
  callback: PropTypes.func,
  paxId: PropTypes.string
};
export default EventNotesModal;
