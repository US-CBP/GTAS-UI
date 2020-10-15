import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";
import { paxEventNotesHistory, notetypes } from "../../../services/serviceWrapper";
import Form from "../../../components/form/Form";
import LabelledInput from "../../../components/labelledInput/LabelledInput";
import { asArray } from "../../../utils/utils";
import Xl8 from "../../../components/xl8/Xl8";

const EventNotesModal = props => {
  const [show, setShow] = useState(false);
  const [notTypes, setNoteTypes] = useState([]);

  const handleClose = (status, res) => {
    setShow(false);
    props.setEventNoteRefreshKey(Date.now());
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

  return (
    <>
      <Button variant="outline-info" size="sm" onClick={handleShow}>
        <i className="fa fa-pencil"></i> <Xl8 xid="evn001">Notes</Xl8>
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <Xl8 xid="evn002">Add Event Notes</Xl8>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            title=""
            submitText={<Xl8 xid="evn003">Save</Xl8>}
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
        </Modal.Body>
      </Modal>
    </>
  );
};
EventNotesModal.propTypes = {
  setEventNoteRefreshKey: PropTypes.func,
  paxId: PropTypes.string
};
export default EventNotesModal;
