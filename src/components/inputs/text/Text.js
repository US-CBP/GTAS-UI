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
    type={props.inputType}
    value={props.inputVal}
    onChange={props.callback}
    aria-required={props.required}
  />
);

TextInput.propTypes = {
  inputType: PropTypes.oneOf(["text", "number", "email", "password", "search", "tel"])
    .isRequired,
  name: PropTypes.string.isRequired,
  alt: PropTypes.oneOf([PropTypes.string, PropTypes.object]),
  callback: PropTypes.func.isRequired,
  inputVal: PropTypes.string.isRequired,
  required: PropTypes.oneOf(["required", true, ""]),
  placeHolder: PropTypes.string,
  readOnly: PropTypes.oneOf(["readOnly", true])
};

export default TextInput;
