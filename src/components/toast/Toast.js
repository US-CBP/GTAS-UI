import React from "react";
import { Toast as RBToast } from "react-bootstrap";
import PropTypes from "prop-types";
import "./Toast.scss";
function Toast(props) {
  const minute = 60000;
  const TOAST_DELAY_IN_MILLI = props.delay || minute;
  return (
    <div className="toast-container">
      <RBToast
        onClose={props.onClose}
        show={props.show}
        delay={TOAST_DELAY_IN_MILLI}
        autohide
        className={props.variant}
      >
        <RBToast.Header>
          <b className="mr-auto">{props.header}</b>
        </RBToast.Header>
        <RBToast.Body>{props.body}</RBToast.Body>
      </RBToast>
    </div>
  );
}

Toast.propTypes = {
  onClose: PropTypes.func,
  header: PropTypes.string,
  body: PropTypes.string,
  show: PropTypes.bool,
  delay: PropTypes.number,
  variant: PropTypes.string
};

export default Toast;
