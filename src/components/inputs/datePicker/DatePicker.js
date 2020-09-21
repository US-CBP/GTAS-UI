import React, { useState } from "react";
import PropTypes from "prop-types";
import DatePicker from "react-date-picker";

const ReactDatePicker = props => {
  const [value, setValue] = useState(props.inputVal);
  const onchange = e => {
    setValue(e);
    props.callback(e);
  };
  return (
    <div className="date-picker">
      <DatePicker
        className={`${props.className || ""}`}
        onChange={onchange}
        value={value}
        name={props.name}
        required={props.required}
        alt={props.alt}
        disabled={props.readOnly === "readOnly" ? true : false}
        clearIcon={null}
        calendarIcon={null}
      />
    </div>
  );
};

DatePicker.propTypes = {};

export default ReactDatePicker;
