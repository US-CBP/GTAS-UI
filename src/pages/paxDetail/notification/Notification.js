import React, { useState, useEffect, useRef } from "react";

import { Button, Modal, Container } from "react-bootstrap";
import { notification, usersemails } from "../../../services/serviceWrapper";
import Form from "../../../components/form/Form";
import LabelledInput from "../../../components/labelledInput/LabelledInput";
import { asArray } from "../../../utils/utils";
import "./Notification.scss";

const Notification = props => {
  const cb = result => {};
  const [show, setShow] = useState(false);
  const [usersEmails, setUsersEmails] = useState(props.usersEmails);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const paxId = props.paxId;

  useEffect(() => {
    let isMounted = true;

    if (!props.usersEmails) {
      usersemails.get().then(res => {
        if (isMounted) {
          const emails = asArray(res).map(userEmail => {
            return {
              label: userEmail.username,
              key: userEmail.email,
              name: userEmail.email,
              type: "checkbox",
              checked: false
            };
          });
          setUsersEmails(emails);
        }
      });
    }
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
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Notify Users</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container fluid>
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
              <div className="notify-checkbox">
                <LabelledInput
                  datafield
                  inputType="checkboxGroup"
                  inputVal={usersEmails}
                  labelText="Users in Current Group:"
                  name="to"
                  alt="nothing"
                  callback={cb}
                />
              </div>

              <LabelledInput
                inputType="email"
                alt="nothing"
                name="externalUsersEmail"
                labelText="External Users Email:"
                placeholder="email@example.com"
                datafield
                inputVal=""
                callback={cb}
              />

              <LabelledInput
                inputType="textarea"
                alt="Add note here..."
                name="note"
                labelText=""
                placeholder="Add note here..."
                datafield="note"
                inputVal=""
                callback={cb}
              />
            </Form>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Notification;
