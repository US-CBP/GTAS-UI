import React, { useState } from "react";
import PropTypes from "prop-types";

import "../Inputs.scss";
import MultiSelect from "react-multi-select-component";

const SelectInput = props => {
  const [selected, setSelected] = useState(props.selected);
  const type = props.inputType;

  const onChange = ev => {
    if (type === "multiSelect") {
      setSelected(ev);
    } else {
      setSelected(ev.target.value);
    }
    props.callback(ev);
  };

  if (type === "multiSelect") {
    return (
      <MultiSelect
        labelledBy={props.name}
        options={props.options}
        value={selected}
        onChange={onChange}
        className="form-multi-select"
        disabled={props.readOnly === "readOnly" ? "disabled" : ""}
      />
    );
  } else {
    return (
      <select
        // className={`input-select ${props.className || ""}`}
        type="select"
        name={props.name}
        required={props.required}
        alt={props.alt}
        onChange={onChange}
        className="form-select"
        value={selected}
        disabled={props.readOnly === "readOnly" ? "disabled" : ""}
      >
        <option value="">{props.placeholder}</option>
        {props.options.map(option => {
          return (
            <option key={option.value} value={option.value}>
              {option.label}{" "}
            </option>
          );
        })}
      </select>
    );
  }
};

//APB pass invalid state up to parent
//Validation
//            <option key={idx} value={option} selected={props.selected === option}>{option} </option>

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  selected: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  callback: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  readOnly: PropTypes.string
};

export default SelectInput;
