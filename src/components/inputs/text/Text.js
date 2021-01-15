// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React from "react";
import PropTypes from "prop-types";

import "../Inputs.scss";

const TextInput = props => (
  <input
    {...props}
    className={`form-input ${props.className || ""}`}
    type={props.inputtype}
    value={props.inputval}
    onChange={props.callback}
    aria-required={props.required}
  />
);

TextInput.propTypes = {
  inputtype: PropTypes.oneOf(["text", "number", "email", "password", "search", "tel"])
    .isRequired,
  name: PropTypes.string.isRequired,
  alt: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  callback: PropTypes.func.isRequired,
  inputval: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  required: PropTypes.oneOf(["required", true, ""]),
  placeHolder: PropTypes.string,
  readOnly: PropTypes.oneOf(["readOnly", true])
};

export default TextInput;
