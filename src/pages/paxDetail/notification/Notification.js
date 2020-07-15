import React, { useState, useEffect, useRef } from "react";

import { Button, Modal } from "react-bootstrap";
import { notification, users } from "../../../services/serviceWrapper";
import Form from "../../../components/form/Form";
import LabelledInput from "../../../components/labelledInput/LabelledInput";
import { asArray } from "../../../utils/utils";

const Notification = props => {
  const [show, setShow] = useState(false);
  const [usersEmails, setUsersEmails] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const paxId = props.paxId;

  useEffect(() => {
    let isMounted = true;

    users.get().then(res => {
      if (isMounted) {
        const emails = asArray(res).map(user => {
          return {
            label: user.userId,
            key: user.email,
            name: user.email,
            type: "checkbox",
            checked: false
          };
        });
        setUsersEmails(emails);
      }
    });

    return () => (isMounted = false); //clean up
  }, []);

  return (
    <>
      <Button variant="outline-info" size="sm" onClick={handleShow}>
        <i className="fa fa-bullhorn"></i> Notify
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        size="md"
        backdrop="static"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Notify Users</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            title=""
            submitText="NOTIFY"
            submitService={notification.post}
            callback={handleClose}
            action="add"
            id="notificationmodal"
            afterProcessed={handleClose}
            recordId={paxId}
            cancellable
          >
            <LabelledInput
              datafield
              inputType="checkboxGroup"
              inputVal={usersEmails}
              labelText="Users in Current Group"
              name="to"
              alt="nothing"
            />
            <LabelledInput
              inputType="email"
              alt="nothing"
              name="externalUsersEmail"
              labelText="External Users Email:"
              placeholder="email@example.com"
              datafield
              inputVal=""
            />

            <LabelledInput
              inputType="textarea"
              alt="Add note here..."
              name="note"
              labelText=""
              placeholder="Add note here..."
              datafield="note"
              inputVal=""
            />
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Notification;
