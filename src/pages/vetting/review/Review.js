import React, { useState, useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import { paxEventNotesHistory, cases } from "../../../services/serviceWrapper";
import { asArray, localeDate } from "../../../utils/utils";
import Form from "../../../components/form/Form";
import Xl8 from "../../../components/xl8/Xl8";
import LabelledInput from "../../../components/labelledInput/LabelledInput";
import CardWithTable from "../../../components/cardWithTable/CardWithTable";
import Modal, { ModalBody, ModalHeader } from "../../../components/modal/Modal";
import { ROLE } from "../../../utils/constants";
import RoleAuthenticator from "../../../context/roleAuthenticator/RoleAuthenticator";

const ReviewPVL = props => {
  const eventNotesHeader = {
    plainTextNote: "Note",
    noteType: "Note Type",
    createdBy: "Created By",
    createdAt: "Created At"
  };

  const [eventNotes, setEventNotes] = useState([]);
  const [historicalEventNotes, setHistoricalEventNotes] = useState([]);
  const paxId = props.paxId;
  const isMountedRef = useRef(null);
  const noteTypes = asArray(props.noteTypes).map(type => {
    return {
      value: `{"id":"${type.value}", "noteType":"${type.label}"}`,
      label: type.label
    };
  });

  const cb = () => {};

  const updateHitStatus = () => {
    cases.updateStatus(paxId, "REVIEWED").then(() => {
      props.callback(new Date()); //refresh key for the filter
    });
    props.onHide();
  };

  useEffect(() => {
    isMountedRef.current = true;
    if (paxId != undefined) {
      paxEventNotesHistory.get(paxId, false).then(res => {
        if (isMountedRef.current) {
          const notesData = res.paxNotes?.map(note => {
            const type = (note.noteType || []).map(t => {
              return t.noteType;
            });
            return {
              ...note,
              createdAt: localeDate(note.createdAt),
              noteType: type.toString()
            };
          });
          setEventNotes(notesData);
        }
      });
      paxEventNotesHistory.get(paxId, true).then(res => {
        if (isMountedRef.current) {
          const notesData = res.paxNotes
            ?.map(note => {
              const type = (note.noteType || []).map(t => {
                return t.noteType;
              });
              return {
                ...note,
                createdAt: localeDate(note.createdAt),
                noteType: type.toString()
              };
            })
            .slice(0, 10);
          setHistoricalEventNotes(notesData);
        }
      });
    }

    return () => (isMountedRef.current = false); // clean up (cancel  subscriptions)
  }, [paxId]);

  return (
    <RoleAuthenticator roles={[ROLE.ADMIN, ROLE.HITMGR]} alt={<></>}>
      <Modal
        show={props.show}
        onHide={props.onHide}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="max-500-width-container"
      >
        <ModalHeader closeButton>
          <Button variant="outline-danger" size="sm" onClick={updateHitStatus}>
            <Xl8 xid="rev001">Change Status to Review</Xl8>
          </Button>
        </ModalHeader>
        <ModalBody>
          <Form
            title=""
            submitService={paxEventNotesHistory.post}
            callback={cb}
            action="add"
            id="reviewnote"
            afterProcessed={cb}
            recordId={`${paxId}`}
          >
            <LabelledInput
              inputType="select"
              alt="Choose not type"
              name="noteType"
              labelText=""
              placeholder="Choose note type"
              datafield="noteType"
              required="required"
              options={noteTypes}
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
          <CardWithTable
            data={eventNotes}
            headers={eventNotesHeader}
            title={<Xl8 xid="rev002">Event Note History</Xl8>}
          />
          <CardWithTable
            data={historicalEventNotes}
            headers={eventNotesHeader}
            title={<Xl8 xid="rev003">Previous Notes History (Up to 10)</Xl8>}
          />
        </ModalBody>
      </Modal>
    </RoleAuthenticator>
  );
};

export default ReviewPVL;
