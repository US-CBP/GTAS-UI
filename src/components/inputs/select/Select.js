// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React, { useState } from "react";
import PropTypes from "prop-types";

import "../Inputs.scss";
import MultiSelect from "react-multi-select-component";
import { hasData } from "../../../utils/utils";
import Xl8 from "../../xl8/Xl8";

const SelectInput = props => {
  const [selected, setSelected] = useState(props.selected || "");
  const type = props.inputtype;
  const hasDefaultValue = hasData(props.selected);
  const placeholder = props.placeholder || "Select...";

  const defaultOverrideStrings = {
    allItemsAreSelected: <Xl8 xid="mselect01">All items are selected.</Xl8>,
    clearSearch: <Xl8 xid="mselect02">Clear Search</Xl8>,
    noOptions: <Xl8 xid="mselct03">No options</Xl8>,
    search: "Search",
    selectAll: <Xl8 xid="mslect06">Select All</Xl8>,
    selectSomeItems: <Xl8 xid="mselect05">Select...</Xl8>
  };

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
        overrideStrings={props.overrideStrings || defaultOverrideStrings}
      />
    );
  } else {
    return (
      <select
        type="select"
        name={props.name}
        required={props.required}
        alt={props.alt}
        onChange={onChange}
        className="form-select"
        value={selected}
        disabled={props.readOnly === "readOnly" ? "disabled" : ""}
      >
        {!hasDefaultValue && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {props.options.map(option => {
          return (
            <option key={option.value} value={option.value}>
              {option.label}
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
