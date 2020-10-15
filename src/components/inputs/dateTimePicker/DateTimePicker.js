import React, { useState } from "react";
import PropTypes from "prop-types";
import DateTimePicker from "react-datetime-picker";

const ReactDateTimePicker = props => {
  const [value, setValue] = useState(props.inputVal);
  const onchange = e => {
    setValue(e);
    props.callback(e);
  };
  return (
    <div className="date-picker">
      <DateTimePicker
        className={`${props.className || ""}`}
        onChange={onchange}
        value={value}
        name={props.name}
        required={props.required}
        alt={props.alt}
        disabled={props.readOnly === "readOnly" ? true : false}
        clearIcon={null}
        calendarIcon={null}
        disableClock={true}
        format="MM/dd/yyyy hh:mm aa"
      />
    </div>
  );
};

DateTimePicker.propTypes = {};

export default ReactDateTimePicker;
