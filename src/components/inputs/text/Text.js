// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React, { useState } from "react";
import PropTypes from "prop-types";

import "../Inputs.scss";
import InputValidationIcon from "../../icons/InputValidationIcon";

const TextInput = props => {
  const [value, setValue] = useState();

  const onChange = ev => {
    props.callback(ev);
    setValue(ev.target.value);
  };
  return (
    <>
      <input
        {...props}
        className={`form-input ${props.className || ""}`}
        type={props.inputtype}
        value={props.inputval}
        onChange={onChange}
        aria-required={props.required}
      />
      {props.validateInput && (
        <InputValidationIcon validateInput={props.validateInput} value={value} />
      )}
    </>
  );
};

TextInput.propTypes = {
  inputtype: PropTypes.oneOf(["text", "number", "email", "password", "search", "tel"])
    .isRequired,
  name: PropTypes.string.isRequired,
  alt: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  callback: PropTypes.func.isRequired,
  inputval: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  required: PropTypes.oneOf(["required", true, ""]),
  placeHolder: PropTypes.string,
  readOnly: PropTypes.oneOf(["readOnly", true]),
  validateInput: PropTypes.func
};

export default TextInput;
