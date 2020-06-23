import React, { useState } from "react";
import { Button, Modal, Form as RBForm } from "react-bootstrap";
import { paxEventNotesHistory } from "../../../services/serviceWrapper";
import Form from "../../../components/form/Form";
import LabelledInput from "../../../components/labelledInput/LabelledInput";

const EventNotesModal = props => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const paxId = props.paxId;
  const noteTypeOptions = [{ value: "GENERAL_PASSENGER", label: "GENERAL_PASSENGER" }];

  return (
    <>
      <Button variant="outline-warning" size="sm" onClick={handleShow}>
        Add Even Notes
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        backdrop="static"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Event Notes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            title=""
            submitText="SAVE"
            submitService={paxEventNotesHistory.put}
            callback={handleClose}
            id="evennoteform"
            recordId={props.paxId}
          >
            {/* <LabelledInput
              inputType="text"
              inputVal={paxId}
              alt=""
              name="passengerId"
              labelText=""
              placeholder=""
              datafield="passengerId"
              required="required"
            /> */}
            <LabelledInput
              inputType="select"
              alt="Choose not type"
              name="noteType"
              labelText=""
              placeholder="Choose note type"
              datafield="noteType"
              required="required"
              options={noteTypeOptions}
            />
            <LabelledInput
              inputType="textarea"
              alt="Add note here..."
              name="plainTextNote"
              labelText=""
              placeholder="Add note here..."
              datafield="plainTextNote"
              required="required"
              inputVal=""
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default EventNotesModal;
