import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
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
  const nextStatus = props.hasOpenHit ? "REVIEWED" : "Re_Opened";

  const changeHitStatusText = props.hasOpenHit ? (
    <Xl8 xid="chs006">Set to REVIEWED</Xl8>
  ) : (
    <Xl8 xid="chs007">Set to RE-OPENED</Xl8>
  );

  const handleShow = () => {
    if (show) return setShow(false);

    setShow(true);
    setStatus(nextStatus);
  };

  const launcher = props.icon ? (
    <div onClick={handleShow}>
      <i className="fa fa-check-square-o" />
    </div>
  ) : (
    <div className="dropdown-item" onClick={handleShow}>
      {changeHitStatusText}
    </div>
  );

  return (
    <RoleAuthenticator roles={[ROLE.ADMIN, ROLE.HITMGR]} alt={<></>}>
      {launcher}

      <Modal show={show} onHide={handleCancel} centered>
        <ModalHeader closeButton>
          <Xl8 xid="chs004">Update Hit Status</Xl8>
        </ModalHeader>
        <ModalBody>
          <Xl8 xid="chs005">Please click confirm to change the status to:</Xl8>
          <br />
          <br />
          {status}
        </ModalBody>
        <ModalFooter>
          <Button variant="outline-dark" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Confirm
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
