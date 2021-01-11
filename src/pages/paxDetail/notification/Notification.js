import React, { useState, useEffect } from "react";

import { Container } from "react-bootstrap";
import { notification, usersemails } from "../../../services/serviceWrapper";
import Form from "../../../components/form/Form";
import Xl8 from "../../../components/xl8/Xl8";
import LabelledInput from "../../../components/labelledInput/LabelledInput";
import { alt, asArray, hasData } from "../../../utils/utils";
import "./Notification.scss";
import Modal, {
  ModalBody,
  ModalHeader,
  ModalTitle
} from "../../../components/modal/Modal";
import ErrorText from "../../../components/errorText/ErrorText";

const Notification = props => {
  const cb = () => {};
  const [show, setShow] = useState(false);
  const [usersEmails, setUsersEmails] = useState(props.usersEmails);
  const [showAlertText, setShowAlertText] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const paxId = props.paxId;

  const paramCallback = params => {
    const fields = params[0];
    const externalUserEmails = alt(fields["externalUsersEmail"])
      .replace(/[, ;]/g, " ")
      .split(" ")
      .filter(Boolean);

    const selectedUserEmails = asArray(fields["to"]).map(email => email.value);
    const allEmails = selectedUserEmails.concat(externalUserEmails);

    const emailData = {
      note: fields["note"] ? fields["note"] : "",
      paxId: paxId,
      to: allEmails
    };
    return [emailData];
  };

  const validateInputs = inputs => {
    const hasValidEmails = hasData(inputs[0]["to"]);

    if (!hasValidEmails) setShowAlertText(true);
    else setShowAlertText(false);
    return hasValidEmails;
  };

  useEffect(() => {
    let isMounted = true;

    if (!props.usersEmails) {
      usersemails.get().then(res => {
        if (isMounted) {
          setUsersEmails(res);
        }
      });
    }
    return () => (isMounted = false); //clean up
  }, []);

  const emialOptions = asArray(usersEmails).map(email => {
    return {
      label: email.username,
      value: email.email
    };
  });

  const launcher = props.icon ? (
    <div onClick={handleShow}>
      <i className="fa fa-bullhorn"></i>
    </div>
  ) : (
    <div className="dropdown-item" onClick={handleShow}>
      <Xl8 xid="not001">Notify Users</Xl8>
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
            {showAlertText && (
              <ErrorText
                message={
                  <Xl8 xid="not007">
                    No user or external email address is provided! Please select users
                    from the current user group or add external user.
                  </Xl8>
                }
              />
            )}
            <Form
              title=""
              submitService={notification.post}
              callback={handleClose}
              action="add"
              id="notificationmodal"
              afterProcessed={handleClose}
              paramCallback={paramCallback}
              validateInputs={validateInputs}
              cancellable
            >
              <LabelledInput
                name="to"
                datafield="to"
                labelText={<Xl8 xid="not004">Users in current group</Xl8>}
                inputtype="multiSelect"
                inputval={[]}
                options={emialOptions}
                callback={cb}
                alt="Users in current group"
              />

              <LabelledInput
                inputtype="text"
                alt="nothing"
                name="externalUsersEmail"
                labelText={<Xl8 xid="not005">External user emails</Xl8>}
                placeholder="email@example.com"
                datafield
                inputval=""
                callback={cb}
              />

              <LabelledInput
                inputtype="textarea"
                labelText={<Xl8 xid="not006">Notes</Xl8>}
                name="note"
                datafield="note"
                inputval=""
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
