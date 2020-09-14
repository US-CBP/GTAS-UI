import React, { useState } from "react";
import PropTypes from "prop-types";
import { SplitButton, Dropdown, Modal, Button } from "react-bootstrap";

const ChangeHitStatus = props => {
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState("");

  const handleCancel = () => {
    props.updateStatus(status, false);
    setShow(false);
  };
  const handleConfirm = () => {
    props.updateStatus(status, true);
    setShow(false);
  };
  return (
    <>
      <SplitButton
        key="paxHitStatus"
        title="Change Status"
        variant="outline-info"
        size="sm"
      >
        {props.hasOpenHit && (
          <Dropdown.Item
            key="statusReviewed"
            onClick={() => {
              setShow(true);
              setStatus("REVIEWED");
            }}
          >
            Reviewed
          </Dropdown.Item>
        )}

        {!props.hasOpenHit && (
          <Dropdown.Item
            key="statusReopened"
            onClick={() => {
              setShow(true);
              setStatus("Re_Opened");
            }}
          >
            Re_Opened
          </Dropdown.Item>
        )}
      </SplitButton>

      <Modal show={show} onHide={handleCancel} centered>
        <Modal.Header>Update Hit Status</Modal.Header>
        <Modal.Body>{`Please confirm to change the status to: ${status}`}</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-success" onClick={handleConfirm}>
            Confirm
          </Button>
          <Button variant="outline-danger" onClick={handleCancel}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

ChangeHitStatus.propTypes = {
  updateStatus: PropTypes.func,
  hasOpenHit: PropTypes.bool
};

export default ChangeHitStatus;
