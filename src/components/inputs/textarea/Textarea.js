import React from "react";
import PropTypes from "prop-types";
import "../Inputs.scss";

const TextareaInput = props => (
  <textarea
    className="form-input textarea"
    name={props.name}
    placeholder={props.placeholder}
    required={props.required}
    alt={props.alt}
    readOnly={props.readOnly}
    onChange={props.callback}
    aria-required={props.required}
    type={props.inputType}
    value={props.inputVal}
  />
);

TextareaInput.propTypes = {
  inputType: PropTypes.oneOf(["textarea"]).isRequired,
  name: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
  inputVal: PropTypes.oneOf([PropTypes.string, PropTypes.object]),
  required: PropTypes.bool,
  placeHolder: PropTypes.string,
  readOnly: PropTypes.string
};

export default TextareaInput;
