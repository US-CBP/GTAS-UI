import React, { useEffect, useState } from "react";
import Modal, { ModalHeader, ModalBody, ModalFooter, ModalTitle } from "../modal/Modal";
import Xl8 from "../xl8/Xl8";
import { Button } from "react-bootstrap";
import { TIME } from "../../utils/constants";
import "./TimeoutModal.css";

const TimeoutModal = ({ show, reset, logout }) => {
  const limit = TIME.MINUTE;
  const [secondsLeft, setSecondsLeft] = useState(limit);
  let interval;

  const clearAll = timer => {
    clearTimeout(timer);
    clearInterval(interval);
    setSecondsLeft(limit);
  };

  useEffect(() => {
    if (!show) return;

    let timer = setTimeout(() => {
      logout();
    }, limit);

    startCountdown();
    return () => clearAll(timer);
  }, [show]);

  const startCountdown = () => {
    interval = setInterval(() => {
      setSecondsLeft(secondsLeft => secondsLeft - TIME.SECOND);
    }, TIME.SECOND);
  };

  return (
    <Modal
      show={show}
      onHide={logout}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="max-500-width-container"
    >
      <ModalHeader closeButton>
        <ModalTitle>
          <Xl8 xid="time004">Session Timeout</Xl8>
        </ModalTitle>
      </ModalHeader>
      <ModalBody>
        <Xl8 xid="time003">
          To remain logged in, please click Resume before your session expires
        </Xl8>
        <div className="timeout-seconds" key={secondsLeft}>
          {secondsLeft / TIME.SECOND}
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          onClick={logout}
          className="m-2 outline-dark-outline"
          variant="outline-dark"
        >
          <Xl8 xid="time001">Logout</Xl8>
        </Button>
        <Button onClick={reset} className="m-2 button block info fullwidth">
          <Xl8 xid="time002">Resume</Xl8>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default TimeoutModal;
