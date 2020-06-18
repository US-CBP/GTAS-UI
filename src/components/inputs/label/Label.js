import React from "react";
import PropTypes from "prop-types";

import "./Label.css";

const LabelInput = props => {
  const cls = props.className + (props.inline ? " inline" : " label");
  return (
    <label className={cls} name={props.name} alt={props.alt}>
      {props.inputVal}
    </label>
  );
};

LabelInput.propTypes = {
  name: PropTypes.string,
  alt: PropTypes.string.isRequired,
  inputVal: PropTypes.any,
  className: PropTypes.string
};

export default LabelInput;
