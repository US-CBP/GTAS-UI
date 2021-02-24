// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import Form from "../../components/form/Form";
import LabelledInput from "../../components/labelledInput/LabelledInput";
import Xl8 from "../../components/xl8/Xl8";
import { paxEventNotesHistory } from "../../services/serviceWrapper";
// import { notetype } from "../../services/lookupService";
import Modal, { ModalBody, ModalHeader, ModalTitle } from "../../components/modal/Modal";
import { LookupContext } from "../../context/data/LookupContext";
import { LK } from "../../utils/constants";

import { asArray, hasData } from "../../utils/utils";

const EventNotesModal = props => {
  const [show, setShow] = useState(false);
  const [notTypes, setNoteTypes] = useState([]);
  const { getCachedKeyValues } = useContext(LookupContext);

  const handleClose = (status, res) => {
    setShow(false);
    if (hasData(props.callback)) props.callback(status, res);
  };
  const handleShow = () => setShow(true);
  const paxId = props.paxId;

  useEffect(() => {
    getCachedKeyValues(LK.NOTETYPE).then(types => {
      const nTypes = [];
      asArray(types).forEach(type => {
        if (type.noteType !== "DELETED") {
          nTypes.push({
            value: `{"id":"${type.value}", "noteType":"${type.label}"}`,
            label: type.label
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
              inputtype="select"
              alt="Choose not type"
              name="noteType"
              labelText={<Xl8 xid="evn004">Note Type</Xl8>}
              datafield="noteType"
              required="required"
              options={notTypes}
            />
            <LabelledInput
              inputtype="textarea"
              labelText={<Xl8 xid="evn001">Notes</Xl8>}
              name="plainTextNote"
              alt={<Xl8 xid="11">Notes</Xl8>}
              datafield="plainTextNote"
              required="required"
              inputval=""
            />
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};
EventNotesModal.propTypes = {
  callback: PropTypes.func,
  paxId: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};
export default EventNotesModal;
