import React, { useState } from "react";
import PropTypes from "prop-types";
import { SplitButton, Dropdown, Button } from "react-bootstrap";
import RoleAuthenticator from "../../../context/roleAuthenticator/RoleAuthenticator";
import Xl8 from "../../../components/xl8/Xl8";
import { ROLE } from "../../../utils/constants";
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader
} from "../../../components/modal/Modal";

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
    <RoleAuthenticator roles={[ROLE.ADMIN, ROLE.HITMGR]} alt={<></>}>
      <SplitButton
        key="paxHitStatus"
        title={<Xl8 xid="chs001">Change Status</Xl8>}
        className="dropdown-item"
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
            Re-opened
          </Dropdown.Item>
        )}
      </SplitButton>

      <Modal show={show} onHide={handleCancel} centered>
        <ModalHeader closeButton>
          <Xl8 xid="chs004">Update Hit Status</Xl8>
        </ModalHeader>
        <ModalBody>
          <Xl8 xid="chs005">Please confirm to change the status to:</Xl8> {status}
        </ModalBody>
        <ModalFooter>
          <Button variant="outline-success" onClick={handleConfirm}>
            Confirm
          </Button>
          <Button variant="outline-danger" onClick={handleCancel}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </RoleAuthenticator>
  );
};

ChangeHitStatus.propTypes = {
  updateStatus: PropTypes.func,
  hasOpenHit: PropTypes.bool
};

export default ChangeHitStatus;
