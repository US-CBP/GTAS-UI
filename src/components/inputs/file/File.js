import React from "react";
import PropTypes from "prop-types";

const FileInput = props => (
  <input
    className="form-input"
    name={props.name}
    type={props.inputtype}
    placeholder={props.placeholder}
    onChange={props.callback}
    required={props.required}
    value={props.inputval}
    alt={props.alt}
    accept={props.options.join(",")}
  />
);

//APB - validation by type. How to structure ??
//APB pass invalid state up to parent

FileInput.propTypes = {
  inputtype: PropTypes.oneOf(["file"]).isRequired,
  name: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
  inputval: PropTypes.any,
  required: PropTypes.string,
  placeHolder: PropTypes.string,
  options: PropTypes.array.isRequired
};
export default FileInput;
