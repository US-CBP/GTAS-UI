import React, { useState } from "react";
import PropTypes from "prop-types";
import { SplitButton, Dropdown, Modal, Button } from "react-bootstrap";
import Xl8 from "../../../components/xl8/Xl8";

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
        title={<Xl8 xid="chs001">Change Status</Xl8>}
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
            {/* <Xl8 xid="chs002">Reviewed</Xl8> */}
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
            {/* <Xl8 xid="chs003">Re-opened</Xl8> */}
            Re-opened
          </Dropdown.Item>
        )}
      </SplitButton>

      <Modal show={show} onHide={handleCancel} centered>
        <Modal.Header>
          <Xl8 xid="chs004">Update Hit Status</Xl8>
        </Modal.Header>
        <Modal.Body>
          <Xl8 xid="chs005">Please confirm to change the status to:</Xl8> {status}
        </Modal.Body>
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
