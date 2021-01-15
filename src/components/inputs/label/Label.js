// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React from "react";
import PropTypes from "prop-types";

import "./Label.css";

const LabelInput = props => {
  const cls = props.className + (props.inline ? " inline" : " label");
  return (
    <label className={cls} name={props.name} alt={props.alt}>
      {props.inputval}
    </label>
  );
};

LabelInput.propTypes = {
  name: PropTypes.string,
  alt: PropTypes.string.isRequired,
  inputval: PropTypes.any,
  className: PropTypes.string
};

export default LabelInput;
