import React, { useState, useEffect, useRef } from "react";

import { Button, Container } from "react-bootstrap";
import { notification, usersemails } from "../../../services/serviceWrapper";
import Form from "../../../components/form/Form";
import Xl8 from "../../../components/xl8/Xl8";
import LabelledInput from "../../../components/labelledInput/LabelledInput";
import { asArray } from "../../../utils/utils";
import "./Notification.scss";
import Modal, {
  ModalBody,
  ModalHeader,
  ModalTitle
} from "../../../components/modal/Modal";

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

  const launcher = props.icon ? (
    <div onClick={handleShow}>
      <i className="fa fa-bullhorn"></i>
    </div>
  ) : (
    <div className="dropdown-item" onClick={handleShow}>
      <Xl8 xid="not001">Notify</Xl8>
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
        className="max-500-width-container"
      >
        <ModalHeader closeButton>
          <ModalTitle>
            <Xl8 xid="not002">Notify Users</Xl8>
          </ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Container fluid>
            <Form
              title=""
              submitText={<Xl8 xid="not003">Notify</Xl8>}
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
                  labelText={<Xl8 xid="not004">Users in current group:</Xl8>}
                  name="to"
                  alt="nothing"
                  callback={cb}
                />
              </div>

              <LabelledInput
                inputType="email"
                alt="nothing"
                name="externalUsersEmail"
                labelText={<Xl8 xid="not005">External user emails:</Xl8>}
                placeholder="email@example.com"
                datafield
                inputVal=""
                callback={cb}
              />

              <LabelledInput
                inputType="textarea"
                labelText={<Xl8 xid="not006">Notes</Xl8>}
                name="note"
                datafield="note"
                inputVal=""
                callback={cb}
              />
            </Form>
          </Container>
        </ModalBody>
      </Modal>
    </>
  );
};

export default Notification;
