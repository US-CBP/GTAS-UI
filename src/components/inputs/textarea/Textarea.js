import React from "react";
import PropTypes from "prop-types";
import "../Inputs.scss";

const TextareaInput = props => (
  <textarea
    className="form-input textarea height-auto"
    name={props.name}
    placeholder={props.placeholder}
    required={props.required}
    alt={props.alt}
    readOnly={props.readOnly}
    onChange={props.callback}
    aria-required={props.required}
    type={props.inputtype}
    value={props.inputval}
  />
);

TextareaInput.propTypes = {
  inputtype: PropTypes.oneOf(["textarea"]).isRequired,
  name: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
  inputval: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  required: PropTypes.bool,
  placeHolder: PropTypes.string,
  readOnly: PropTypes.string
};

export default TextareaInput;
