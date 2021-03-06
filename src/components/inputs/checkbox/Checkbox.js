// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React, { useState } from "react";
import PropTypes from "prop-types";

/**
 * **Checkbox and Radio input component.**
 */
const CheckboxInput = props => {
  const [selected, setSelected] = useState(props.selected);

  const onChange = () => {
    setSelected(!selected);
    const filterFormUpdate = {
      name: props.name,
      value: !selected
    };
    props.callback({ target: filterFormUpdate });
  };
  const style = (props.className || "undefined").replace("undefined");
  const divstyle = style.replace("checkbox");

  return (
    <div className={divstyle}>
      {/* {` ${props.label}`} */}
      <input
        name={props.name}
        onChange={onChange}
        className={style}
        type={props.inputtype}
        value={props.inputval}
        checked={selected}
        disabled={props.disabled || props.readOnly}
      />
    </div>
  );
};

CheckboxInput.propTypes = {
  inputtype: PropTypes.oneOf(["checkbox", "radio", "toggle"]),
  inputval: PropTypes.any,
  name: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  // options: PropTypes.array.isRequired,
  required: PropTypes.oneOf(["required", true, ""]),
  selected: PropTypes.oneOf(["true", "", undefined, true, false]),
  callback: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  className: PropTypes.string
};
export default CheckboxInput;
